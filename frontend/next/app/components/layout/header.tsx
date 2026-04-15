'use client'

import Link from 'next/link'
import styles from '@styles/header.module.scss'

import React, { useState, useRef, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import MenuIcon from '@mui/icons-material/Menu'

import { useUser } from '@auth0/nextjs-auth0/client'

const Header = (props: any) => {
    const isTablet = useMediaQuery('(max-width:768px)')
    const { window } = props

    const [mobileOpen, setMobileOpen] = useState(false)
    const headerRef = useRef<HTMLElement>(null)

    const { user, isLoading } = useUser()

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev)
    }

    useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.offsetHeight
            headerRef.current.setAttribute('data-height', height.toString())
        }
    }, [])

    const navItems: string[] = []

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map((item) => (
                    <Link href={`/${item.toLowerCase()}`} key={item}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <header ref={headerRef}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <AppBar component="nav" color="inherit" id={styles.appBar}>
                    <Toolbar id={styles.toolbar}>
                        {/* Mobile */}
                        {isTablet && (
                            <>
                                <Link href={`/`}>
                                    <img src="/logo-header.png" alt="URL Tracker" />
                                </Link>

                                <IconButton
                                    edge="end"
                                    onClick={handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </>
                        )}

                        {/* Desktop title */}
                        <Typography
                            variant="h6"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link href={`/`}>URL Tracker</Link>
                        </Typography>

                        {/* Auth UI */}
                        {!isLoading && (
                            user ? (
                                <Box
                                    sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                                    className={styles.navItems}
                                >
                                    {user.name && user.picture && (
                                        <Avatar alt={user.name} src={user.picture} />
                                    )}

                                    <Link href={`/auth/logout`}>
                                        <Button sx={{ color: '#fff' }}>Log out</Button>
                                    </Link>
                                </Box>
                            ) : (
                                <Box
                                    sx={{ display: 'flex', gap: 2 }}
                                    className={styles.navItems}
                                >
                                    <Link href={`/auth/login`}>
                                        <Button sx={{ color: '#fff' }}>Register</Button>
                                    </Link>

                                    <Link href={`/auth/login`}>
                                        <Button sx={{ color: '#fff' }}>Log in</Button>
                                    </Link>
                                </Box>
                            )
                        )}
                    </Toolbar>
                </AppBar>

                {/* Drawer */}
                <Box component="nav">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="bottom"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: '100%',
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
        </header>
    )
}

export default Header