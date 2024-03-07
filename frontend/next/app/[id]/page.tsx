import React from 'react';
import type { Metadata } from "next";
import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { NextRequest, NextResponse, userAgent } from 'next/server'
import getUrl from '@lib/getUrl';
import getMetaData from '@lib/getMetaData';
import getIpData from '@lib/getIpData';
import Redirect from './redirect';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { VisitLogDto, UrlDto } from '@Types/DTO';

export const metadata: Metadata = {
  title: "",
  description: "",
};

// const options: HTMLReactParserOptions = {
//   replace(domNode) {
//     if ((domNode as Element).attribs) {}
//   },
// };

const OriginalUrl = async ({ params }: { params: { id: string } }) => {
  const {id: trackingId} = params;
  const url: UrlDto = await getUrl(trackingId);
  const {originalURL} = url;
  console.log('URL: ', url)

  // console.log('OGURL: ', example)
  const headHTML = await getMetaData(originalURL);

  const header = headers();
  const userAgent = header.get('user-agent') || '';
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  const IpData = await getIpData(ip);
  const Log: VisitLogDto = {...IpData, CreatedAt: new Date().toISOString(), UserAgent: userAgent, IPAddress: ip};
  console.log('LOG: ', Log)

  const addVisitLog = async (log: VisitLogDto) => {
    console.log('adding visit log...')
    try {
      const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/urls/visit/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Log)
      })
      res.json();
    } catch (e) {
      console.error(e)
    }
  }

  addVisitLog(Log);

  return (
    <>
      <head>{parse(headHTML!)}</head>
      <Redirect originalUrl={originalURL}/>
    </>
  )

}

export default OriginalUrl;