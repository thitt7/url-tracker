'use client'

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { VisitLogDto } from '@Types/DTO';
import styles from '@styles/tracking.module.scss';

const VisitLogTable = ({ logs }: { logs: VisitLogDto[] }) => {
    return (
        <Table className={styles.logs} stickyHeader={true} aria-label="Visit Log Table">
            <TableHead>
                <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>User Agent</TableCell>
                    <TableCell>ISP</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    logs?.map((log) => {
                        const { createdAt, ipAddress, userAgent, isp, city, region, country, continent } = log;
                        return (
                            <TableRow
                                key={log.createdAt}
                                sx={{}}
                            >
                                <TableCell>{createdAt}</TableCell>
                                <TableCell>{ipAddress}</TableCell>
                                <TableCell>
                                    {city && region && `${city}, ${region}`}
                                    {country && <br />}{country}
                                    {continent && <br />}{continent}
                                </TableCell>
                                <TableCell>{userAgent}</TableCell>
                                <TableCell>{isp ? isp : <></>}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default VisitLogTable;