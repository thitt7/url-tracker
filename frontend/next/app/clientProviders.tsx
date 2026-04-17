'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './styles/theme'

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider theme={getTheme('light')}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}