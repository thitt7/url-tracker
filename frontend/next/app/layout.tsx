import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Box from '@mui/material/Box'
import Header from '@components/layout/header'
import Footer from '@components/layout/footer'
import './styles/globals.scss'
import AuthHandler from './components/authHandler'
import ClientProviders from './clientProviders'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
})

const siteDescription = 'Generate, shorten, and track your own custom links!'

function getMetadataBase(): URL {
    const raw = process.env.NEXT_PUBLIC_DOMAIN
    if (raw) {
        const host = raw.replace(/^https?:\/\//, '').replace(/\/$/, '')
        return new URL(`https://${host}`)
    }
    return new URL('http://localhost:4000')
}

export const metadata: Metadata = {
    metadataBase: getMetadataBase(),
    title: 'URL Tracker',
    description: siteDescription,
    openGraph: {
        title: 'URL Tracker',
        description: siteDescription,
        siteName: 'URL Tracker',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'URL Tracker',
        description: siteDescription,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable}`}>
                <ClientProviders>
                    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <Header />
                        <Box component="main" sx={{ flex: 1, width: '100%' }}>
                            <AuthHandler>{children}</AuthHandler>
                        </Box>
                        <Footer />
                    </Box>
                </ClientProviders>
            </body>
        </html>
    )
}