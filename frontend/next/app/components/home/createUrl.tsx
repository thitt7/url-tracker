'use client';

import React, {useState} from 'react';
import { redirect } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Button, Checkbox } from '@mui/material';
import {createUrlDto} from '@Types/DTO'

const CreateUrlForm = () => {

  const [formData, setformData] = useState<createUrlDto>();
  const [helperText, setHelperText] = useState('*You must enter your email and at least one preference');
  const [isVerified, setIsVerified] = useState(true);
  const [isUrl, setIsUrl] = useState(false);

  const disabledProp = {disabled: isUrl && isVerified ? false : true};

  function isValidURL(url: string) {
    const urlRegex = /^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(:\d{1,5})?([\/\w.-]*)*\/?$/i;

    return urlRegex.test(url);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidURL(event.target.value)) {
        setformData({ originalURL: event.target.value });
        setIsUrl(true)
    }
    else {setIsUrl(false)};

  };

  async function createUrl(formData: FormData) {
    let createUrl: createUrlDto | undefined;
    let URL: string;

    // if (docker) {URL = `http://dotnet:${process.env.NEXT_PUBLIC_API_PORT}/api/urls`}
    // else {URL = `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/urls`}
    URL = `https://api.url-tracker.com/api/urls`;

    for (const [key, value] of formData.entries()) {
      if (key === 'url') {
        createUrl = {originalURL: value as string}
      }
    }

    createUrl !== undefined || null ? console.log('createURL: ', createUrl) : '';

    const res = await fetch(URL, {
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

  // const setVerified = (verified: boolean): void => { setIsVerified(verified) }

  return (
    <form action={createUrl}>
      {/* <Recaptcha setVerified={setVerified}/> */}

      <TextField
        onChange={handleChange}
        name='url'
        autoFocus
        margin="dense"
        id="url"
        label="Enter a URL"
        // type="email"
        fullWidth
        variant="outlined"
      />
        
      <Button 
        variant="contained"
        type="submit"
        {...disabledProp}>
          Create URL
      </Button>
    </form>
  )
}

export default CreateUrlForm;