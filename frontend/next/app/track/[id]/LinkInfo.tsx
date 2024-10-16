'use client'

import React, { useState, useEffect } from 'react';
import updateUrl from '@/app/lib/updateUrl';
import { useRouter, usePathname } from 'next/navigation';
import { DataGrid, GridColDef, GridRowsProp, GridCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { UrlDto, UpdateUrlDto } from '@Types/DTO';
import styles from '@styles/tracking.module.scss';

const LinkInfoTable = ({ url, docker }: { url: UrlDto, docker: boolean }) => {
  const router = useRouter();
  const pathName = usePathname();
  
  // const [inputError, setInputError] = useState<boolean>();
  const [alertStatus, setAlertStatus] = useState<'success' | 'warning' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<GridRowsProp>([
    {
      id: 'OriginalURL',
      name: "Original URL",
      value: url.originalURL,
    },
    {
      id: 'TrackingUrl',
      name: "Tracking URL",
      // value: `${window.location.hostname}/${url.trackingId}`,
      value: url.trackingURL,
    },
    {
      id: 'TrackingId',
      name: "Tracking ID",
      value: url.trackingId,
    },
    {
      id: 'CreatedAt',
      name: "Created At",
      value: url.createdAt,
    },
  ]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'name',
      hideSortIcons: true,
      minWidth: 0,
      maxWidth: 0,
    },
    {
      field: 'value',
      headerName: 'value',
      hideSortIcons: true,
      minWidth: 0,
      maxWidth: 0,
      editable: true
    },
  ];

  const cellEditFn = (params: GridCellParams) => {
    return params.row.name === "Original URL" || params.row.name === "Tracking ID";
  }

  const validateTrackingId = (id: string) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(id);
  }

  function asyncDelay(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
}

  const processRowUpdate = async (newRow: any, oldRow: any) => {
    const { id, name, value } = newRow;
    const inputEl: HTMLElement | null = document.querySelector(`[data-id=${id}] [data-field=value]`);
    const updatedUrl: UpdateUrlDto = { [id]: value };

    if (!validateTrackingId(value) && id === "TrackingId") {
      setAlertMessage(`${name} must contain only letters, numbers, hyphens and underscores`);
      setAlertStatus('warning');
      setOpen(true);
      return oldRow;
    }

    if (JSON.stringify(oldRow) !== JSON.stringify(newRow)) {
      const res = await updateUrl(updatedUrl, url.trackingId, docker);
      console.log('url tracking id: ', url.trackingId)
      console.log('updateURL response: ', res)

      if (res?.ok) {
        if (id === "TrackingId") {
          window.history.replaceState({}, '', `${window.location.origin}/track/${value}`);

          console.log('changing tracking url table state')
          setRows((e: any) => {
            let copy = [...e];
            const index = rows.findIndex((e: any) => {return e.id === 'TrackingUrl'})
            // copy[index] = newRow;
            copy[index]['value'] = `https://url-tracker.com/${value}`;
            return copy;
          })
        }

        else if (id === "OriginalURL") {}

        setRows((e: any) => {
          let copy = [...e];
          const index = rows.findIndex((e: any) => {return e.id === id})
          copy[index] = newRow;
          return copy;
        })

        setAlertMessage(`${name} updated successfully!`);
        setAlertStatus('success');
        setOpen(true)
        return newRow;
      }
      else {
        inputEl?.setAttribute('data-error', 'true');
        if (res?.status === 409) {setAlertMessage(`This ${name} already exists`)}
        else {setAlertMessage(`Error editing ${name}`)};
        setAlertStatus('warning');
        setOpen(true)

        return oldRow;
      }

    }

    else { return oldRow; }

  };

  const handleCellEditStart = (p: any, e: any) => {
    // console.log('cell edit start event...', e)
    // console.log('CEDIT OTHER: ', p)
  }

  const handleCellEditStop = (p: any, e: any) => {
    // e.defaultMuiPrevented = true;
    // console.log('CELL EDIT STOP EVENT: ', e)
    // console.log('OTHER: ', p)
  }
  

  return (
    <div style={{}}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowSelection={false}
        isCellEditable={cellEditFn}
        hideFooter={true}
        editMode='cell'
        // onCellDoubleClick={() => console.log('clicking...')}
        onCellEditStart={handleCellEditStart}
        // onCellEditStop={handleCellEditStop}
        processRowUpdate={processRowUpdate}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={alertStatus}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default LinkInfoTable;