import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Fixed app logo at `public/logo.png` (also served as `/logo.png`). */
const LOGO_PNG = join(process.cwd(), 'public', 'logo.png')

export const LOGO_PNG_SIZE = { width: 1024, height: 1024 }

export async function readLogoPng(): Promise<Buffer> {
    return readFile(LOGO_PNG)
}

/** Base64 data URL for `next/og` ImageResponse `<img src>`. */
export async function readLogoPngDataUrl(): Promise<string> {
    const data = await readFile(LOGO_PNG, 'base64')
    return `data:image/png;base64,${data}`
}
