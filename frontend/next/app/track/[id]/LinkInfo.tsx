'use client'

import React, { useState, useRef, useEffect } from 'react'
import updateUrl from '@/app/lib/updateUrl'
import {
    DataGrid,
    GridColDef,
    GridRowsProp,
    GridCellParams,
    useGridApiRef,
} from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import { UrlDto, UpdateUrlDto } from '@Types/DTO'
import '@styles/globals.scss'

const ROW_IDS = {
    originalURL: 'OriginalURL',
    trackingUrl: 'TrackingUrl',
    trackingId: 'TrackingId',
    createdAt: 'CreatedAt',
} as const

const LinkInfoTable = ({ url, docker }: { url: UrlDto; docker: boolean }) => {
    const apiRef = useGridApiRef()
    const trackingIdRef = useRef(url.trackingId)
    useEffect(() => {
        trackingIdRef.current = url.trackingId
    }, [url.trackingId])
    const [alertStatus, setAlertStatus] = useState<'success' | 'warning' | 'error'>('success')
    const [alertMessage, setAlertMessage] = useState<string>()
    const [open, setOpen] = useState<boolean>(false)
    const [savingRowId, setSavingRowId] = useState<string | null>(null)
    const [rows, setRows] = useState<GridRowsProp>([
        {
            id: ROW_IDS.originalURL,
            name: 'Original URL',
            value: url.originalURL,
        },
        {
            id: ROW_IDS.trackingUrl,
            name: 'Tracking URL',
            value: url.trackingURL,
        },
        {
            id: ROW_IDS.trackingId,
            name: 'Tracking ID',
            value: url.trackingId,
        },
        {
            id: ROW_IDS.createdAt,
            name: 'Created At',
            value: url.createdAt,
        },
    ])

    const showAlert = (message: string, status: 'success' | 'warning' | 'error') => {
        setAlertMessage(message)
        setAlertStatus(status)
        setOpen(true)
    }

    const copyValue = async (value: string) => {
        try {
            await navigator.clipboard.writeText(String(value))
            showAlert('Copied to clipboard', 'success')
        } catch {
            showAlert('Could not copy to clipboard', 'error')
        }
    }

    const startEditValue = (rowId: string) => {
        if (savingRowId) return
        apiRef.current?.startCellEditMode({ id: rowId, field: 'value' })
    }

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
            flex: 1,
            editable: true,
            renderCell: (params) => {
                if (savingRowId === params.row.id) {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                minHeight: 36,
                                pl: 1,
                            }}
                        >
                            <CircularProgress size={22} />
                        </Box>
                    )
                }
                return <span>{params.value as string}</span>
            },
        },
        {
            field: 'actions',
            headerName: '',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            width: 108,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => {
                const rowId = params.row.id as string
                const value = params.row.value as string
                const busy = savingRowId !== null

                if (rowId === ROW_IDS.originalURL) {
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.25 }}>
                            <IconButton
                                size="small"
                                aria-label="Edit original URL"
                                disabled={busy}
                                onClick={() => startEditValue(rowId)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="Copy original URL"
                                disabled={busy}
                                onClick={() => copyValue(value)}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )
                }
                if (rowId === ROW_IDS.trackingUrl) {
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                size="small"
                                aria-label="Copy tracking URL"
                                disabled={busy}
                                onClick={() => copyValue(value)}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )
                }
                if (rowId === ROW_IDS.trackingId) {
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.25 }}>
                            <IconButton
                                size="small"
                                aria-label="Edit tracking ID"
                                disabled={busy}
                                onClick={() => startEditValue(rowId)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="Copy tracking ID"
                                disabled={busy}
                                onClick={() => copyValue(value)}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )
                }
                return null
            },
        },
    ]

    const cellEditFn = (params: GridCellParams) => {
        return params.row.name === 'Original URL' || params.row.name === 'Tracking ID'
    }

    const validateTrackingId = (id: string) => {
        const regex = /^[a-zA-Z0-9_-]+$/
        return regex.test(id)
    }

    const processRowUpdate = async (newRow: any, oldRow: any) => {
        const { id, name, value } = newRow
        const inputEl: HTMLElement | null = document.querySelector(
            `[data-id="${id}"] [data-field="value"]`
        )
        const updatedUrl: UpdateUrlDto =
            id === ROW_IDS.originalURL
                ? { originalURL: value }
                : id === ROW_IDS.trackingId
                  ? { trackingId: value }
                  : {}

        if (!validateTrackingId(value) && id === ROW_IDS.trackingId) {
            showAlert(
                `${name} must contain only letters, numbers, hyphens and underscores`,
                'warning'
            )
            return oldRow
        }

        if (JSON.stringify(oldRow) !== JSON.stringify(newRow)) {
            setSavingRowId(id)
            try {
                const res = await updateUrl(updatedUrl, trackingIdRef.current, docker)

                if (res?.ok) {
                    if (id === ROW_IDS.trackingId) {
                        trackingIdRef.current = value
                        window.history.replaceState(
                            {},
                            '',
                            `${window.location.origin}/track/${value}`
                        )
                        const origin = window.location.origin
                        setRows((prev: any) => {
                            const copy = [...prev]
                            const urlIdx = copy.findIndex((r: any) => r.id === ROW_IDS.trackingUrl)
                            if (urlIdx >= 0) {
                                copy[urlIdx] = {
                                    ...copy[urlIdx],
                                    value: `${origin}/${value}`,
                                }
                            }
                            const rowIdx = copy.findIndex((r: any) => r.id === id)
                            if (rowIdx >= 0) copy[rowIdx] = newRow
                            return copy
                        })
                    } else {
                        setRows((prev: any) => {
                            const copy = [...prev]
                            const rowIdx = copy.findIndex((r: any) => r.id === id)
                            if (rowIdx >= 0) copy[rowIdx] = newRow
                            return copy
                        })
                    }

                    showAlert(`${name} updated successfully!`, 'success')
                    return newRow
                }

                inputEl?.setAttribute('data-error', 'true')
                if (res?.status === 409) {
                    showAlert(`This ${name} already exists`, 'warning')
                } else {
                    showAlert(`Error editing ${name}`, 'warning')
                }
                return oldRow
            } finally {
                setSavingRowId(null)
            }
        }

        return oldRow
    }

    return (
        <div>
            <DataGrid
                apiRef={apiRef}
                rows={rows}
                columns={columns}
                rowSelection={false}
                isCellEditable={cellEditFn}
                hideFooter={true}
                editMode="cell"
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

export default LinkInfoTable
