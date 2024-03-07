'use client'

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { UrlDto } from '@Types/DTO';

const LinkInfoTable = ({url}: {url: UrlDto}) => {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="Link Information Table">
            <TableBody>
                <TableRow
                    key={'originalurl'}
                    sx={{}}
                >
                    <TableCell scope="row"> Original URL </TableCell>
                    <TableCell align="left">{url.originalURL}</TableCell>
                </TableRow>
                <TableRow
                    key={'trackingurl'}
                    sx={{}}
                >
                    <TableCell scope="row"> Tracking URL </TableCell>
                    <TableCell align="left">{url.trackingURL}</TableCell>
                </TableRow>
                <TableRow
                    key={'trackingid'}
                    sx={{}}
                >
                    <TableCell scope="row"> Tracking ID </TableCell>
                    <TableCell align="left">{url.trackingId}</TableCell>
                </TableRow>
                <TableRow
                    key={'createdat'}
                    sx={{}}
                >
                    <TableCell scope="row"> Created At </TableCell>
                    <TableCell align="left">{url.createdAt}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default LinkInfoTable;