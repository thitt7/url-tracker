/* frontend/next/app/[id]/route.ts */

import { NextRequest, NextResponse } from 'next/server';
import getUrl from '@lib/getUrl';
import getIpData from '@lib/getIpData';
import { UrlDto, VisitLogDto } from '@Types/DTO';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { NODE_ENV, BACKEND, DOTNET_PORT, NEXT_PUBLIC_API_URL } = process.env;

    try {
        const { id: trackingId } = await params;

        // Get tracking URL from DB/API
        const url: UrlDto = await getUrl(trackingId);

        // Invalid tracking ID
        if (!url || !url.originalURL) {
            return NextResponse.redirect(
                new URL('/404', request.url)
            );
        }

        const originalURL = url.originalURL;

        // Extract request metadata
        const forwardedFor = request.headers.get('x-forwarded-for');

        const ip =
            forwardedFor?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown';

        const userAgent =
            request.headers.get('user-agent') || 'unknown';


        void (async () => {
            try {
                // Get geo/IP enrichment data
                const ipData = await getIpData(ip);

                const log: VisitLogDto = {
                    ...ipData,
                    ipAddress: ip,
                    userAgent,
                    createdAt: new Date().toISOString(),
                };

                // Determine internal API URL
                let apiURL: string | null = null

                if (NODE_ENV === 'development') {
                    apiURL = `http://${process.env.BACKEND}:${process.env.DOTNET_PORT}/api/urls/visit/${trackingId}`;
                } else {
                    apiURL = `${NEXT_PUBLIC_API_URL}/api/urls/visit/${trackingId}`
                }

                // Send visit log to .NET API
                await fetch(apiURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(log),

                    /**
                     * Prevent fetch response caching
                     */
                    cache: 'no-store',
                });
            } catch (error) {
                console.error(
                    'Background visit logging failed:',
                    error
                );
            }
        })();

        return NextResponse.redirect(originalURL, 302);
    } catch (error) {
        console.error('Redirect route error:', error);

        return NextResponse.json(
            {
                message: 'Internal Server Error',
            },
            {
                status: 500,
            }
        );
    }
}