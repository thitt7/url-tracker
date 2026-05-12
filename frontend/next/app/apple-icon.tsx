import { ImageResponse } from 'next/og'
import { loadLogoDataUrl } from './lib/loadLogoDataUrl'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
    const logoSrc = await loadLogoDataUrl()
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ffffff',
                }}
            >
                <img src={logoSrc} width={168} height={168} style={{ objectFit: 'contain' }} />
            </div>
        ),
        { ...size },
    )
}
