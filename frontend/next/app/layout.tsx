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

export const metadata: Metadata = {
    title: 'URL Tracker',
    description: 'Generate, shorten, and track your own custom links!',
    icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/logo.png',
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