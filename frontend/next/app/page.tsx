import CreateUrlForm from './components/home/createUrl'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function Home() {

    return (
        <main>
            <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}
                    >
                        Create Trackable Links That Are Easy to Share
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 760, mx: 'auto' }}
                    >
                        Shorten long URLs, keep your links clean, and monitor engagement in one
                        simple workflow. URL Tracker helps you publish faster and understand how
                        your audience interacts with every link you send.
                    </Typography>
                </Box>

                <Card sx={{ maxWidth: 720, mx: 'auto' }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Start a New Tracking Link
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                            Paste your destination URL below and generate a trackable link in
                            seconds.
                        </Typography>
                        <CreateUrlForm />
                    </CardContent>
                </Card>
            </Container>
        </main>
    )
}
