export const dynamic = 'force-dynamic';

import React from 'react';
import type { Metadata } from "next";
import { headers } from 'next/headers';
import { NextRequest, NextResponse, userAgent } from 'next/server';
import Client from './client';
import getUrl from '@lib/getUrl';
import getMetaData from '@lib/getMetaData';
import getIP from '@lib/getIP';
import getIpData from '@lib/getIpData';
// import Redirect from './redirect';
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

const OriginalUrl = async ({ params }: { params: Promise<{ id: string }> }) => {
  const {id: trackingId} = await params;
  const url: UrlDto = await getUrl(trackingId);
  const {originalURL} = url;

  // const getClientIP = () => {

  // }

  const headHTML = await getMetaData(originalURL);

  const header = headers();
  // const userAgent = header.get('user-agent') || '';
  // const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  // const ip = await getIP();
  // const IpData = await getIpData(ip);

  return (
    <>
      <head>{parse(headHTML!)}</head>
      {/* <Redirect originalUrl={originalURL}/> */}
      <Client Url={url}/>
    </>
  )

}

export default OriginalUrl;