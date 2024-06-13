'use server'
 
import { redirect } from 'next/navigation'
 
export async function Redirect(url: string) {
    if (!url.startsWith('http:') && !url.startsWith('https:')) { url = 'https://' + url; }
    redirect(url);
}