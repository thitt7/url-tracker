'use server'

import { redirect } from 'next/navigation';

type createUrlDTO = {
  originalURL: string;
}

async function createUrl(formData: FormData) {

    // for (const [i, v] of formData.entries()) {
    // if (i.substring(0,10) == '$ACTION_ID') {continue;}
    // entry = {...entry, [i]: v}
    // }
    let createUrl: createUrlDTO | undefined;

    for (const [key, value] of formData.entries()) {
      if (key === 'url') {
        createUrl = {originalURL: value as string}
      }
      // console.log(`${key}: ${value}`);
      
    }

    // if (createUrl !== undefined || null)
    createUrl !== undefined || null ? console.log('createURL: ', createUrl) : '';

    // const res = await fetch(`localhost:8001/api/urls`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(createUrl)
    // });
    const res = await fetch(`localhost:8001/api/urls`, {
      // method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(createUrl)
    });
    const response = await res.json()
    console.log('API RES: ', response)

    redirect('/?form=submitted')

  }

export default createUrl;