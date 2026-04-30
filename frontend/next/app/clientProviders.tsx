'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { getTheme } from './styles/theme'

type ThemeSetting = 'light' | 'dark' | 'system'

type ThemeModeContextValue = {
    themeSetting: ThemeSetting
    setThemeSetting: (value: ThemeSetting) => void
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined)

export const useThemeMode = () => {
    const context = useContext(ThemeModeContext)
    if (!context) {
        throw new Error('useThemeMode must be used within ClientProviders')
    }

    return context
}

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode
}) {
    const [themeSetting, setThemeSetting] = useState<ThemeSetting>('light')
    const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolvedMode = themeSetting === 'system' ? (prefersDark ? 'dark' : 'light') : themeSetting
    const theme = useMemo(() => getTheme(resolvedMode), [resolvedMode])

    return (
        <ThemeModeContext.Provider value={{ themeSetting, setThemeSetting }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    )
}