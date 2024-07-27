'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { useEffect } from 'react'

export default function AuthHandler({ children }: { children: React.ReactNode }) {
    const { user, error, isLoading } = useUser()
    const router = useRouter()
    console.log('user: ', user, error, isLoading)
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/api/auth/login')
        }
    })
    return <Fragment>{children}</Fragment>
}
