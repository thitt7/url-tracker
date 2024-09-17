'use client'

import Link from 'next/link'
import styles from '@styles/header.module.scss'

import React, { useEffect, useState, useRef } from 'react'
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

import { useUser } from '@auth0/nextjs-auth0/client'

const Header = (props: any) => {
    const isMobile = useMediaQuery('(max-width:480px)')
    const isTablet = useMediaQuery('(max-width:768px)')
    const isDesktop = useMediaQuery('(min-width:768px)')

    const { window } = props
    const [mobileOpen, setMobileOpen] = useState(false)
    const headerRef = useRef<HTMLElement>(null)
    const navItems: any[] = []

    const { user, error, isLoading } = useUser()

    const handleDrawerToggle = (e: React.MouseEvent) => {
        setMobileOpen((prevState: any) => !prevState)
    }

    useEffect(() => {
        headerRef.current!.setAttribute('data-height', document.querySelector('header')?.offsetHeight.toString()!)
    })

    useEffect(() => {
        if (user) {
        }
    }, [user])

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map((item: any) => (
                    <Link href={`/${item.toLowerCase()}`} key={item}>
                        <ListItem key={item} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item} sx={{ fontSize: '1.5rem' }} />
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
            <Box className="nav" sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" color="inherit" id={styles.appBar}>
                    <Toolbar id={styles['toolbar']}>
                        {isTablet ? (
                            <>
                                <Link href={`/`}>
                                    <img src="/logo-header.png" alt="URL Tracker" />
                                </Link>
                                <IconButton
                                    disableRipple
                                    aria-label="open drawer"
                                    onClick={handleDrawerToggle}
                                ></IconButton>
                            </>
                        ) : (
                            <></>
                        )}
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link href={`/`}>URL Tracker</Link>
                        </Typography>
                        {(!isLoading && !user) ?? (
                            <Box
                                sx={{ display: { xs: 'none', sm: 'block', display: 'flex' } }}
                                className={styles.navItems}
                            >
                                <Link href={`auth/login`}>
                                    <Button sx={{ color: '#fff' }}>Register</Button>
                                </Link>
                                <Link href={`auth/login`}>
                                    <Button sx={{ color: '#fff' }}>Log in</Button>
                                </Link>
                            </Box>
                        )}
                        {!isLoading && user ? (
                            <Box
                                sx={{ display: { xs: 'none', sm: 'block', display: 'flex' } }}
                                className={styles.navItems}
                            >
                                {user.name && user.picture && <Avatar alt={user.name} src={user.picture} />}
                                <Link href={`/auth/logout`}>
                                    <Button sx={{ color: '#fff' }}>Log out</Button>
                                </Link>
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        className="hamburger-drawer"
                        container={container}
                        variant="temporary"
                        anchor="bottom"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            // top: `${headerHeight}px`,
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
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
