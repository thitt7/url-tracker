import { ImageResponse } from 'next/og'
import { loadLogoDataUrl } from './lib/loadLogoDataUrl'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
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
                <img src={logoSrc} width={28} height={28} style={{ objectFit: 'contain' }} />
            </div>
        ),
        { ...size },
    )
}
