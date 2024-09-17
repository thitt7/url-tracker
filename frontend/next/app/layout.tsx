import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@components/layout/header'
import './styles/globals.scss'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import AuthHandler from './components/authHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'URL Tracker',
    description: 'Generate and track your own custom links',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <UserProvider>
                <body className={inter.className}>
                    <Header />
                    <AuthHandler>{children}</AuthHandler>
                </body>
            </UserProvider>
        </html>
    )
}
