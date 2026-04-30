'use client'

import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const footerColumns = [
    {
        title: 'Company',
        links: [
            { label: 'About', href: '#' },
            { label: 'Contact', href: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Sitemap', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
        ],
    },
]

const Footer = () => {
    return (
        <Box component="footer" sx={{ mt: 8, py: 5, backgroundColor: 'grey.100', width: '100%' }}>
            <Container maxWidth="lg" sx={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        rowGap: 3,
                        columnGap: 6,
                    }}
                >
                    {footerColumns.map((column) => (
                        <Box key={column.title} sx={{ minWidth: 180 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
                                {column.title}
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                {column.links.map((link) => (
                                    <Box key={link.label} component="li" sx={{ mb: 0.75 }}>
                                        <Link
                                            href={link.href}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ '&:hover': { color: 'text.primary' } }}
                                            >
                                                {link.label}
                                            </Typography>
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        mt: 4,
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        {`© ${new Date().getFullYear()} URL Tracker`}
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
