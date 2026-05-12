import { LOGO_PNG_SIZE, readLogoPng } from './lib/logoPng'

export const size = LOGO_PNG_SIZE
export const contentType = 'image/png'

/** Serves the logo PNG as-is so alpha is not flattened by ImageResponse / Satori. */
export default async function Icon() {
    const body = await readLogoPng()
    return new Response(new Blob([new Uint8Array(body)], { type: 'image/png' }), {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}
