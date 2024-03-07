'use client'

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';

const Redirect = ({originalUrl}: {originalUrl: string}) => {
    let url = originalUrl;
    if (!url.startsWith('http:') && !url.startsWith('https:')) { url = 'https://' + url; }

    useEffect(() => {
        redirect(url);
    }, []);

    return null;
}

export default Redirect;