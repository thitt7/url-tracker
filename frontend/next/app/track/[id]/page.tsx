import React from 'react';
import { redirect, notFound } from 'next/navigation';
import LinkInfoTable from './LinkInfo';
import getUrl from '@lib/getUrl';
import styles from '@styles/tracking.module.scss';

const TrackingPage = async ({ params }: { params: { id: string } }) => {
  const { id: trackingId } = params;
  const url = await getUrl(trackingId);
  console.log('tracking page!!', url)

  { if (url === null) notFound(); }
  return (
    <div className={styles.container}>
      <h1>Track Your Link</h1>
      <div className={styles.link}>
        <h2>Your Link Information</h2>
        <div className={styles.table}>
          <LinkInfoTable url={url} />
        </div>
      </div>
      <div className={styles.logs}>
        <h2>Visit Logs</h2>
      </div>
      <div>ID URL: {url.originalURL}</div>
    </div>
  )
}

export default TrackingPage;