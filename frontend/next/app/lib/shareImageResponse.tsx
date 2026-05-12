import { ImageResponse } from 'next/og'
import { loadLogoDataUrl } from './loadLogoDataUrl'

const OG_SIZE = { width: 1200, height: 630 }

export async function shareImageResponse() {
    const logoSrc = await loadLogoDataUrl()
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 56,
                    background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 45%, #42a5f5 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 48,
                    color: 'white',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                <img
                    src={logoSrc}
                    height={280}
                    width={280}
                    style={{ objectFit: 'contain', borderRadius: 24 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}>
                    <div style={{ fontSize: 72, fontWeight: 700 }}>URL Tracker</div>
                    <div style={{ fontSize: 34, opacity: 0.93, lineHeight: 1.25 }}>
                        Generate, shorten, and track your own custom links
                    </div>
                </div>
            </div>
        ),
        { ...OG_SIZE },
    )
}
