import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { navLinks, sourceLinks } from '../data/f1Data.js';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#030303', borderTop: '1px solid rgba(255,255,255,.10)', pt: 6, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h2" sx={{ lineHeight: .85 }}>F1 2026</Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 520, mt: 2 }}>
              Fan site no oficial rediseñado como dashboard premium con datos, pilotos, equipos y resultados referenciados desde Formula 1.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ color: 'secondary.main', fontWeight: 900, mb: 1.5 }}>Navegación</Typography>
            <Stack alignItems="flex-start">
              {navLinks.map((link) => (
                <Button key={link.href} href={link.href} sx={{ color: 'text.secondary', justifyContent: 'flex-start', px: 0 }}>
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography sx={{ color: 'secondary.main', fontWeight: 900, mb: 1.5 }}>Fuentes oficiales</Typography>
            <Stack alignItems="flex-start">
              <Button href={sourceLinks.drivers} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />} sx={{ color: 'text.secondary', px: 0 }}>
                Pilotos F1
              </Button>
              <Button href={sourceLinks.teams} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />} sx={{ color: 'text.secondary', px: 0 }}>
                Equipos F1
              </Button>
              <Button href={sourceLinks.results} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />} sx={{ color: 'text.secondary', px: 0 }}>
                Resultados 2026
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>
            © 2026 F1 Fan Site · Proyecto no oficial · No afiliado a Formula One Group
          </Typography>
          <Button href="https://github.com/Purvish69/F1" target="_blank" rel="noreferrer" startIcon={<GitHubIcon />} variant="outlined">
            GitHub
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
