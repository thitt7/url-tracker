import React from 'react';
import { redirect, notFound } from 'next/navigation';
import getUrl from '@lib/getUrl';

const TrackingPage = async ({ params }: { params: { id: string } }) => {
  const {id: trackingId} = params;
  const url = await getUrl(trackingId);
  console.log('tracking page!!', url)

  { if (url === null) notFound(); }
  return (
    <div>ID URL: {url.originalURL}</div>
  )
}

export default TrackingPage;