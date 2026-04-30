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
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuIcon from '@mui/icons-material/Menu'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useThemeMode } from '@/app/clientProviders'

const Header = (props: any) => {
    const isTablet = useMediaQuery('(max-width:768px)')
    const { window } = props

    const [mobileOpen, setMobileOpen] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
    const headerRef = useRef<HTMLElement>(null)

    const { user, isLoading } = useUser()
    const { themeSetting, setThemeSetting } = useThemeMode()

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev)
    }
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () => {
        setMenuAnchorEl(null)
    }
    const handleThemeChange = (event: SelectChangeEvent) => {
        setThemeSetting(event.target.value as 'light' | 'dark' | 'system')
    }

    useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.offsetHeight
            headerRef.current.setAttribute('data-height', height.toString())
        }
    }, [])

    const navItems: string[] = []
    const brandLink = (
        <Link
            href="/"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                color: 'inherit',
                height: '100%',
            }}
        >
            <img
                src="/logo.png"
                alt="URL Tracker"
                style={{ height: '100%', width: 'auto', aspectRatio: '1 / 1' }}
            />
            <Typography variant="h6" component="span">
                URL Tracker
            </Typography>
        </Link>
    )
    const renderAuthSection = (isMobileLayout: boolean) => (
        <Box>
            {user ? (
                <>
                    <IconButton
                        onClick={handleMenuOpen}
                        size="small"
                        aria-haspopup="true"
                        aria-controls={Boolean(menuAnchorEl) ? 'profile-menu' : undefined}
                        aria-expanded={Boolean(menuAnchorEl) ? 'true' : undefined}
                    >
                        <Avatar
                            alt={user.name || 'User'}
                            src={user.picture?.trim() ? user.picture : ''}
                            sx={{ width: 32, height: 32 }}
                        >
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="profile-menu"
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                px: 2,
                                py: 1.5,
                                minWidth: 260,
                            }}
                        >
                            <Avatar
                                alt={user.name || 'User'}
                                src={user.picture?.trim() ? user.picture : ''}
                            >
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </Avatar>
                            <Box>
                                <Typography variant="body2" fontWeight={600}>
                                    {user.name || 'User'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {user.email || ''}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <MenuItem component={Link} href="/account" onClick={handleMenuClose}>
                            Your Account
                        </MenuItem>
                        <MenuItem component={Link} href="/auth/logout" onClick={handleMenuClose}>
                            Log out
                        </MenuItem>

                        <Divider />

                        <Box sx={{ px: 2, py: 1.5 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="theme-mode-select-label">Theme</InputLabel>
                                <Select
                                    labelId="theme-mode-select-label"
                                    value={themeSetting}
                                    label="Theme"
                                    onChange={handleThemeChange}
                                >
                                    <MenuItem value="light">Light</MenuItem>
                                    <MenuItem value="dark">Dark</MenuItem>
                                    <MenuItem value="system">System</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Menu>
                </>
            ) : (
                <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                    <Box
                        className={styles.signInCta}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobileLayout ? 0 : 1.5,
                            cursor: 'pointer',
                        }}
                    >
                        {!isMobileLayout && <Typography variant="body1">Sign in</Typography>}

                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                border: '1px solid rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <PersonAddRoundedIcon fontSize="small" />
                        </Box>
                    </Box>
                </Link>
            )}
        </Box>
    )

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
                    <Toolbar id={styles.toolbar} sx={{ minHeight: '64px !important', height: 64 }}>
                        {isTablet ? (
                            <>
                                <IconButton edge="start" onClick={handleDrawerToggle}>
                                    <MenuIcon />
                                </IconButton>

                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: '100%',
                                    }}
                                >
                                    {brandLink}
                                </Box>

                                {!isLoading && renderAuthSection(true)}
                            </>
                        ) : (
                            <>
                                {/* Desktop title */}
                                <Box sx={{ flexGrow: 1, height: '100%' }}>{brandLink}</Box>

                                {/* Auth Section */}
                                {!isLoading && renderAuthSection(false)}
                            </>
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