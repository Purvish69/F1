import { useState } from 'react';
import CollectionsIcon from '@mui/icons-material/Collections';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { galleryImages } from '../data/f1Data.js';

function Galeria() {
  const [activeImage, setActiveImage] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;

  return (
    <Box
      component="section"
      id="galeria"
      sx={{
        background:
          'radial-gradient(circle at 80% 10%, rgba(255,215,0,.10), transparent 24rem), linear-gradient(180deg, transparent, rgba(255,255,255,.03))',
        py: { xs: 8, md: 12 }
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>
            Media oficial
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>
            Galería
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 760 }}>
            Coches y pilotos reales de la temporada 2026, presentados como un paddock visual.
          </Typography>
        </Stack>

        <ImageList variant="masonry" cols={columns} gap={18}>
          {galleryImages.map((item) => (
            <ImageListItem key={item.caption}>
              <Card sx={{ overflow: 'hidden' }}>
                <CardActionArea onClick={() => setActiveImage(item)}>
                  <CardMedia
                    component="img"
                    image={item.src}
                    alt={item.caption}
                    loading="lazy"
                    sx={{
                      bgcolor: 'rgba(255,255,255,.04)',
                      height: item.caption.includes('Mercedes') || item.caption.includes('Ferrari') || item.caption.includes('McLaren') || item.caption.includes('Red Bull') ? 220 : 420,
                      objectFit: 'contain',
                      p: 2,
                      transition: 'transform .35s ease',
                      '&:hover': { transform: 'scale(1.04)' }
                    }}
                  />
                  <Stack direction="row" alignItems="center" spacing={1.2} sx={{ p: 2 }}>
                    <CollectionsIcon color="primary" />
                    <Typography sx={{ fontWeight: 900 }}>{item.caption}</Typography>
                  </Stack>
                </CardActionArea>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Container>

      <Dialog open={Boolean(activeImage)} onClose={() => setActiveImage(null)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ bgcolor: '#050505', p: 0, position: 'relative' }}>
          <IconButton
            aria-label="Cerrar galeria"
            onClick={() => setActiveImage(null)}
            sx={{ bgcolor: 'rgba(0,0,0,.55)', color: 'common.white', position: 'absolute', right: 12, top: 12, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          {activeImage && (
            <Box sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
              <Box
                component="img"
                src={activeImage.src}
                alt={activeImage.caption}
                sx={{ maxHeight: '78vh', objectFit: 'contain', width: '100%' }}
              />
              <Typography variant="h4" sx={{ mt: 2 }}>{activeImage.caption}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Galeria;
