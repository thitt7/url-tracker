import React from 'react';
import type { Metadata } from "next";
import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { NextRequest, NextResponse, userAgent } from 'next/server'
import getUrl from '@lib/getUrl';
import getMetaData from '@lib/getMetaData';
import getIpData from '@lib/getIpData';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import { VisitLogDto, UrlDto } from '@Types/DTO';

export const metadata: Metadata = {
  title: "",
  description: "",
};

const options: HTMLReactParserOptions = {
  replace(domNode) {
    // console.log('NODE: ', domNode)
    if ((domNode as Element).attribs) {
      // ...
    }
  },
};

const google = "<meta content='Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.' name='description'><meta content='noodp' name='robots'><meta content='text/html; charset=UTF-8' http-equiv='Content-Type'><meta content='/images/branding/googleg/1x/googleg_standard_color_128dp.png' itemprop='image'><title>Google</title>"
const exHTMLString = <p></p>

const OriginalUrl = async ({ params }: { params: { id: string } }) => {
  const {id: trackingId} = params;
  const url: UrlDto = await getUrl(trackingId);
  const {originalURL} = url;

  // console.log('OGURL: ', example)
  const headHTML = await getMetaData(originalURL);

  const header = headers();
  const userAgent = header.get('user-agent') || '';
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  const IpData = await getIpData(ip);
  const Log: VisitLogDto = {...IpData, CreatedAt: new Date().toISOString(), UserAgent: userAgent, IPAddress: ip};
  console.log('LOG: ', Log)

  const addVisitLog = async (log: VisitLogDto) => {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/urls/visit/${trackingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Log)
      });
      console.log('PUT RES: ', await res.json())
  }

  addVisitLog(Log);

  // return <>{parse(fullMeta)}</>
  return <head>{parse(headHTML!, options)}</head>;

  // redirect(originalURL);

}

export default OriginalUrl;