'use client';

import React, {useState} from 'react';
import { redirect } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Button, Checkbox } from '@mui/material';
import isURL from 'validator/es/lib/isURL';
import {createUrlDto} from '@Types/DTO';

import styles from '@styles/home.module.scss';

const CreateUrlForm = () => {

  const [formData, setformData] = useState<createUrlDto>();
  const [helperText, setHelperText] = useState('*You must enter your email and at least one preference');
  const [isVerified, setIsVerified] = useState(true);
  const [isUrl, setIsUrl] = useState(false);

  const disabledProp = {disabled: isUrl && isVerified ? false : true};

  console.log('API URL', `${process.env.NEXT_PUBLIC_API_URL}/api/urls`)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isURL(event.target.value)) {
        setformData({ originalURL: event.target.value });
        setIsUrl(true)
    }
    else {setIsUrl(false)};

  };

  async function createUrl(formData: FormData) {
    let createUrl: createUrlDto | undefined;
    let URL: string = `${process.env.NEXT_PUBLIC_API_URL}/api/urls`;

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
    <section id={styles['create']}>
      <form id={styles['form']} action={createUrl}>
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
    </section>
  )
}

export default CreateUrlForm;