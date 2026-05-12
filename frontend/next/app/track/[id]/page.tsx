export const dynamic = 'force-dynamic';

import React from 'react';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinkInfoTable from './LinkInfo';
import VisitLogTable from './VisitLogTable';
import getUrl from '@lib/getUrl';
import styles from '@styles/tracking.module.scss';

const TrackingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id: trackingId } = await params;
    const url = await getUrl(trackingId);
    console.log('URL: ', url);

    if (url === null) {
        notFound();
    }

    return (
        <Container
            className={styles.container}
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                py: 3,
            }}
        >
            <Box
                className={styles.pageHero}
                sx={{
                    maxWidth: '48rem',
                    py: 1.5,
                }}
            >
                <Typography variant="h2" component="h1">
                    Track Your Link
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    Review your shortened link details, edit the destination or tracking ID when needed,
                    and browse recent visits with IP and location hints.
                </Typography>
            </Box>

            <section className={styles.link} aria-labelledby="link-info-heading">
                <Typography variant="h4" component="h2" id="link-info-heading" sx={{ mb: 1 }}>
                    Your Link Information
                </Typography>
                <LinkInfoTable url={url} />
            </section>

            <section className={styles.logs} aria-labelledby="visit-logs-heading">
                <Typography variant="h4" component="h2" id="visit-logs-heading" sx={{ mb: 1 }}>
                    Visit Logs
                </Typography>
                <VisitLogTable logs={url.visitLogs} />
            </section>
        </Container>
    );
};

export default TrackingPage;
