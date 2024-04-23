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

  const headHTML = await getMetaData(originalURL);

  const header = headers();
  const userAgent = header.get('user-agent') || '';
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  const IpData = await getIpData(ip);
  const Log: VisitLogDto = {...IpData, createdAt: new Date().toISOString(), userAgent: userAgent, ipAddress: ip};

  const addVisitLog = async (log: VisitLogDto) => {
    console.log('adding visit log...')
    try {
      let URL: string;
      if (process.env.DOCKER_ENV && !process.env.KUBERNETES_SERVICE_HOST) {URL = `http://${process.env.BACKEND}:${process.env.DOTNET_PORT}/api/urls/visit/${trackingId}`}
      else if (process.env.KUBERNETES_SERVICE_HOST !== undefined) {URL = `http://dotnet-clusterip:${process.env.DOTNET_PORT}/api/urls/visit/${trackingId}`}
      else {URL = `http://${process.env.DOMAIN}:${process.env.DOTNET_PORT}/api/urls/visit/${trackingId}`}
      
      const res = await fetch(URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Log)
      })
      res.json();
    } catch (e) {
      console.error('error adding visit log:', e)
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