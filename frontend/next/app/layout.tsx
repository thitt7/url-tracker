import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Box from '@mui/material/Box'
import Header from '@components/layout/header'
import Footer from '@components/layout/footer'
import './styles/globals.scss'
import AuthHandler from './components/authHandler'
import ClientProviders from './clientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'URL Tracker',
    description: 'Generate and track your own custom links!',
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
            <body className={inter.className}>
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