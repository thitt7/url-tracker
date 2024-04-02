export const dynamic = 'force-dynamic';

import React from 'react';
import { redirect, notFound } from 'next/navigation';
import LinkInfoTable from './LinkInfo';
import VisitLogTable from './VisitLogTable';
import getUrl from '@lib/getUrl';
import styles from '@styles/tracking.module.scss';

const IS_DOCKER = process.env.DOCKER_ENV === 'true';

const TrackingPage = async ({ params }: { params: { id: string } }) => {
  const { id: trackingId } = params;
  const url = await getUrl(trackingId);
  console.log('URL: ', url)

  { if (url === null) notFound(); }
  return (
    <div className={styles.container}>
      <h1>Track Your Link</h1>
      <div className={styles.link}>
        <h2>Your Link Information</h2>
        <LinkInfoTable url={url} docker={IS_DOCKER}/>
      </div>
      <div className={styles.logs}>
        <h2>Visit Logs</h2>
      </div>
      <VisitLogTable logs={url.visitLogs}/>
    </div>
  )
}

export default TrackingPage;