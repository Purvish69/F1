import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { navLinks } from '../data/f1Data.js';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navButton = (link) => (
    <Button
      key={link.href}
      href={link.href}
      onClick={() => setOpen(false)}
      color="inherit"
      sx={{
        border: '1px solid transparent',
        color: 'rgba(255,255,255,.82)',
        fontWeight: 800,
        letterSpacing: '.08em',
        px: 1.2,
        transition: 'background .22s ease, color .22s ease, border-color .22s ease, transform .22s ease',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,.06)',
          borderColor: 'rgba(255,255,255,.12)',
          color: 'common.white',
          transform: 'translateY(-1px)'
        }
      }}
    >
      {link.label}
    </Button>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderBottom: scrolled ? '1px solid rgba(232,0,45,.55)' : '1px solid rgba(255,255,255,.06)',
        bgcolor: scrolled ? 'rgba(5,5,5,.58)' : 'rgba(5,5,5,.24)',
        backdropFilter: 'blur(22px) saturate(130%)',
        boxShadow: scrolled ? '0 18px 60px rgba(0,0,0,.28)' : 'none',
        transition: 'background .28s ease, border-color .28s ease, box-shadow .28s ease'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: scrolled ? 68 : 82 } }}>
          <Typography
            component="a"
            href="#inicio"
            variant="h4"
            sx={{
              color: 'common.white',
              flexGrow: 1,
              lineHeight: .9,
              textDecoration: 'none',
              '&::after': {
                background: 'linear-gradient(90deg, #E8002D, rgba(255,255,255,.92))',
                content: '""',
                display: 'block',
                height: 3,
                mt: .5,
                transform: 'skewX(-22deg)',
                width: 72
              }
            }}
          >
            F1 2026
          </Typography>

          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map(navButton)}
          </Stack>

          <IconButton
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
            sx={{ color: 'common.white', display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#070707',
            backgroundImage: 'linear-gradient(145deg, rgba(232,0,45,.18), transparent)',
            p: 3,
            width: 'min(86vw, 360px)'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton aria-label="Cerrar menu" onClick={() => setOpen(false)} sx={{ color: 'common.white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack spacing={1.2} sx={{ mt: 5 }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              sx={{ color: 'common.white', fontSize: 28, justifyContent: 'flex-start' }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
