'use client';

// import createUrl from './actions';
// import Recaptcha from '../components/recaptcha';
import React, {useState} from 'react';
import { redirect } from 'next/navigation';
import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Checkbox } from '@mui/material';

type createUrlDTO = {
  originalURL: string;
}

const CreateUrlForm = () => {

  const [formData, setformData] = useState<createUrlDTO>();
  const [helperText, setHelperText] = useState('*You must enter your email and at least one preference');
  const [isVerified, setIsVerified] = useState(true);
  const [isUrl, setIsUrl] = useState(false);

  // const { email, alerts, news, events } = formData;
  // const error = !(([alerts, news, events].filter((v) => v).length > 0) && email);
  const disabledProp = {disabled: isUrl && isVerified ? false : true};

  function isValidURL(url: string) {
    var urlRegex = /^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(:\d{1,5})?([\/\w.-]*)*\/?$/i;
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
    console.log('inside createUrl...')

    let createUrl: createUrlDTO | undefined;

    for (const [key, value] of formData.entries()) {
      if (key === 'url') {
        createUrl = {originalURL: value as string}
      }
      
    }

    createUrl !== undefined || null ? console.log('createURL: ', createUrl) : '';

    // const res = await fetch(`http:localhost:8001/api/urls`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(createUrl)
    // });

    const res = await fetch('http://localhost:8001/api/urls');
    // const response = await res.json()
    console.log('API RES: ', res)

    // const res = await fetch('http://localhost:8001/api/urls');
    // const response = await res.json();
    // console.log('API RES: ', response);


    // redirect(`/track/${response.trackingId}`)

  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log('EVENT: ', event)
    // if (formData) {
    //   await createUrl(formData);
    // }
  };

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