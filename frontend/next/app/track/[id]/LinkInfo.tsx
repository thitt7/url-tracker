'use client'

import React, {useState, useEffect} from 'react';
import updateUrl from '@/app/lib/updateUrl';
import { useRouter, usePathname } from 'next/navigation';
import { DataGrid, GridColDef, GridRowsProp, GridCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { UrlDto, UpdateUrlDto } from '@Types/DTO';
import styles from '@styles/tracking.module.scss';
import '@styles/globals.scss'

const LinkInfoTable = ({ url }: { url: UrlDto }) => {
  // const [inputError, setInputError] = useState<boolean>();

  const router = useRouter();
  const pathName = usePathname();

  const [updatedCellData, setCellData] = useState<string>();

    const columns: GridColDef[] = [
        { field: 'name',
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

    const rows: GridRowsProp = [
        {
          id: 'OriginalURL',
          name: "Original URL",
          value: url.originalURL,
        },
        {
          id: 'TrackingUrl',
          name: "Tracking URL",
          value: `${window.location.hostname}/${url.trackingId}`,
          // value: url.trackingURL,
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
      ];

    const cellEditFn = (params: GridCellParams) => {
      return params.row.name === "Original URL" || params.row.name === "Tracking ID";
    }

    const processRowUpdate = async (newRow: any, oldRow: any) => {
      const {id, value} = newRow;
      const inputEl: HTMLElement | null = document.querySelector(`[data-id=${id}] [data-field=value]`);
      const updatedUrl: UpdateUrlDto = {[id]: value};
    
      console.log('old row: ',oldRow);
      console.log('new row: ',newRow);

      if (JSON.stringify(oldRow) !== JSON.stringify(newRow)) { 
        const res = await updateUrl(updatedUrl, url.trackingId);
        console.log('updateURL response: ', res)

        if (res?.ok) {
          if (id === "TrackingId") {router.replace(`/track/${value}`)};
        }
        else {
          inputEl?.setAttribute('data-error', 'true')
          return oldRow;
        }
      }

      return newRow;
     
    };

    const handleCellEditStart = (p: any, e: any) => {
      console.log('cell edit start event...', e)
      console.log('CEDIT OTHER: ', p)
    }

    const handleCellEditStop = (p: any, e: any) => {
      // e.defaultMuiPrevented = true;
      console.log('CELL EDIT STOP EVENT: ', e)
      console.log('OTHER: ', p)
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
                onCellDoubleClick={()=>console.log('clicking...')}
                onCellEditStart={handleCellEditStart}
                // onCellEditStop={handleCellEditStop}
                processRowUpdate={processRowUpdate}
            />
        </div>
    )
}

export default LinkInfoTable;

// return (
    //     <Table className={styles.table} sx={{ minWidth: 650 }} aria-label="Link Information Table">
    //         <TableBody>
    //             <TableRow
    //                 key={'originalurl'}
    //                 sx={{}}
    //             >
    //                 <TableCell scope="row">
    //                     Original URL
    //                     <EditIcon />
    //                 </TableCell>
    //                 <TableCell align="left">{url.originalURL}</TableCell>
    //             </TableRow>
    //             <TableRow
    //                 key={'trackingurl'}
    //                 sx={{}}
    //             >
    //                 <TableCell scope="row">
    //                     Tracking URL
    //                     <ContentCopyIcon />
    //                 </TableCell>
    //                 <TableCell align="left">{url.trackingURL}</TableCell>
    //             </TableRow>
    //             <TableRow
    //                 key={'trackingid'}
    //                 sx={{}}
    //             >
    //                 <TableCell scope="row">
    //                     Tracking ID
    //                     <EditIcon />
    //                 </TableCell>
    //                 <TableCell align="left">{url.trackingId}</TableCell>
    //             </TableRow>
    //             <TableRow
    //                 key={'createdat'}
    //                 sx={{}}
    //             >
    //                 <TableCell scope="row">Created At</TableCell>
    //                 <TableCell align="left">
    //                     {new Date(url.createdAt).toLocaleString()}
    //                 </TableCell>
    //             </TableRow>
    //         </TableBody>
    //     </Table>
    // )