import { LOGO_PNG_SIZE, readLogoPng } from './lib/logoPng'

export const size = LOGO_PNG_SIZE
export const contentType = 'image/png'

/** Same source file as tab icon; original encoding keeps transparency for touch icons. */
export default async function AppleIcon() {
    const body = await readLogoPng()
    return new Response(new Blob([new Uint8Array(body)], { type: 'image/png' }), {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}
