import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Reads `public/logo.png` (URL `/logo.png`) for use in `next/og` ImageResponse. */
export async function loadLogoDataUrl(): Promise<string> {
    const data = await readFile(join(process.cwd(), 'public', 'logo.png'), 'base64')
    return `data:image/png;base64,${data}`
}
