'use server'

import { redirect } from 'next/navigation';

type createUrlDTO = {
  originalURL: string;
}

async function createUrl(formData: FormData) {

    let createUrl: createUrlDTO | undefined;

    for (const [key, value] of formData.entries()) {
      if (key === 'url') {
        createUrl = {originalURL: value as string}
      }
      
    }

    createUrl !== undefined || null ? console.log('createURL: ', createUrl) : '';

    const res = await fetch(`http:localhost:8001/api/urls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createUrl)
    });
    
    const response = await res.json()
    console.log('API RES: ', response)

    redirect(`/track/${response.trackingId}`)

  }

export default createUrl;