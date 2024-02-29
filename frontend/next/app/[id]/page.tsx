import React from 'react';
import { redirect, notFound } from 'next/navigation';
import getUrl from '@lib/getUrl';
import getMetaData from '../lib/getMetaData';

type visitLogDto = {
  CreatedAt : Date;
  UserAgent ?: string;
  IPAddress ?: string;
  Continent ?: string;
  Country ?: string;
  Region ?: string;
  City ?: string;
  ISP ?: string;
  Coordinates ?: string;
  Org ?: string;
}

const OriginalUrl = async ({ params }: { params: { id: string } }) => {
  const {id: trackingId} = params;
  const url = await getUrl(trackingId);
  console.log('URL OBJ: ', url)
  const {originalURL} = url;

  const head = await getMetaData(originalURL);
  // console.log('HEAD: ', head);

  // redirect(originalURL);
  
  return <head dangerouslySetInnerHTML={{__html: head as string}}/>
}

const addVisitLog = (log: visitLogDto) => {
  
}

export default OriginalUrl;