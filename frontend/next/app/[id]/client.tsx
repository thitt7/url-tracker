'use client';

import React, { useState, useEffect } from 'react';
import Redirect from './redirect';
import getIpData from '@lib/getIpData';
import getIP from '@lib/getIP';
import { VisitLogDto, UrlDto } from '@Types/DTO';

const Client = ({ Url }: { Url: UrlDto }) => {

    useEffect(() => {

        (async () => {

            console.log('running useEffect fn..')
            const { trackingId } = Url;
            const ip = await getIP();
            const IpData = await getIpData(ip);
            const userAgent = navigator.userAgent;
            console.log('userAgent in client component: ', userAgent)

            // try {
            //     const { trackingId } = Url;
            //     const ip = await getIP();
            //     // const IpData = await getIpData(ip);
            //     const userAgent = navigator.userAgent;
            //     console.log('userAgent in client component: ', userAgent)

            //     // const Log: VisitLogDto = { ...IpData, createdAt: new Date().toISOString(), userAgent: userAgent, ipAddress: ip };
            //     // console.log('LOG: ', Log)

            //     // const addVisitLog = async (log: VisitLogDto) => {
            //     //     console.log('adding visit log...')
            //     //     try {
            //     //         let URL = `https://api.${process.env.DOMAIN}/api/urls/visit/${trackingId}`;

            //     //         const res = await fetch(URL, {
            //     //             method: 'PUT',
            //     //             headers: { 'Content-Type': 'application/json' },
            //     //             body: JSON.stringify(Log)
            //     //         })
            //     //         res.json();
            //     //     } catch (e) {
            //     //         console.error('error adding visit log:', e)
            //     //     }
            //     // }

            //     // addVisitLog(Log);
            // } catch (error) {
            //     console.error('Error fetching ip data:', error);
            // }
        })();

        return () => { }
    }, [])


    return (
        <>
            <Redirect originalUrl={Url.originalURL} />
        </>
    )
}

export default Client;