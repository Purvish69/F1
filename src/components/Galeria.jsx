import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { getDriverPortrait, getTeamVisual } from '../data/visualMetadata.js';

const mediaBase = 'https://media.formula1.com/image/upload';
const carImage = (teamSlug) =>
  `${mediaBase}/c_lfill%2Cw_3392/q_auto/v1740000001/common/f1/2026/${teamSlug}/2026${teamSlug}carright.webp`;

export const galleryItems = [
  {
    id: 'mercedes-car',
    src: carImage('mercedes'),
    caption: 'Mercedes W17',
    sub: 'Mercedes-AMG PETRONAS Formula One Team',
    type: 'car',
    team: 'Mercedes',
    teamSlug: 'mercedes',
    color: '#00D2BE',
    tag: 'Monoplaza 2026',
    spec: 'Motor Mercedes V6 Turbo Híbrido 350kW'
  },
  {
    id: 'ferrari-car',
    src: carImage('ferrari'),
    caption: 'Ferrari SF-26',
    sub: 'Scuderia Ferrari HP',
    type: 'car',
    team: 'Ferrari',
    teamSlug: 'ferrari',
    color: '#DC0000',
    tag: 'Monoplaza 2026',
    spec: 'Motor Ferrari 066/12 Híbrido 350kW'
  },
  {
    id: 'mclaren-car',
    src: carImage('mclaren'),
    caption: 'McLaren MCL40',
    sub: 'McLaren Formula 1 Team',
    type: 'car',
    team: 'McLaren',
    teamSlug: 'mclaren',
    color: '#FF8000',
    tag: 'Monoplaza 2026',
    spec: 'Motor Mercedes V6 Turbo Híbrido 350kW'
  },
  {
    id: 'redbull-car',
    src: carImage('redbullracing'),
    caption: 'Red Bull RB22',
    sub: 'Oracle Red Bull Racing',
    type: 'car',
    team: 'Red Bull Racing',
    teamSlug: 'redbullracing',
    color: '#1E41FF',
    tag: 'Monoplaza 2026',
    spec: 'Motor Red Bull Ford Powertrains 350kW'
  },
  {
    id: 'antonelli-driver',
    src: getDriverPortrait(12, 'mercedes', 'andant01'),
    caption: 'Kimi Antonelli',
    sub: 'Mercedes-AMG PETRONAS',
    type: 'driver',
    number: '12',
    flag: '🇮🇹',
    team: 'Mercedes',
    teamSlug: 'mercedes',
    color: '#00D2BE',
    tag: 'Piloto Oficial',
    spec: 'Líder Provisional del Campeonato 2026'
  },
  {
    id: 'hamilton-driver',
    src: getDriverPortrait(44, 'ferrari', 'lewham01'),
    caption: 'Lewis Hamilton',
    sub: 'Scuderia Ferrari HP',
    type: 'driver',
    number: '44',
    flag: '🇬🇧',
    team: 'Ferrari',
    teamSlug: 'ferrari',
    color: '#DC0000',
    tag: 'Piloto Oficial',
    spec: '7x Campeón del Mundo de F1'
  },
  {
    id: 'norris-driver',
    src: getDriverPortrait(1, 'mclaren', 'lannor01'),
    caption: 'Lando Norris',
    sub: 'McLaren Formula 1 Team',
    type: 'driver',
    number: '4',
    flag: '🇬🇧',
    team: 'McLaren',
    teamSlug: 'mclaren',
    color: '#FF8000',
    tag: 'Piloto Oficial',
    spec: 'Subcampeón del Mundo de F1'
  },
  {
    id: 'verstappen-driver',
    src: getDriverPortrait(3, 'red_bull', 'maxver01'),
    caption: 'Max Verstappen',
    sub: 'Oracle Red Bull Racing',
    type: 'driver',
    number: '3',
    flag: '🇳🇱',
    team: 'Red Bull Racing',
    teamSlug: 'redbullracing',
    color: '#1E41FF',
    tag: 'Piloto Oficial',
    spec: '4x Campeón del Mundo de F1'
  }
];

function Galeria() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'car' | 'driver'
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return galleryItems;
    return galleryItems.filter((item) => item.type === activeTab);
  }, [activeTab]);

  const activeImage = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
  }, [selectedIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [selectedIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <Box
      component="section"
      id="galeria"
      sx={{
        background:
          'radial-gradient(circle at 80% 10%, rgba(232,0,45,.10), transparent 28rem), radial-gradient(circle at 20% 85%, rgba(0,210,190,.07), transparent 32rem), #060609',
        py: { xs: 8, md: 12 },
        position: 'relative'
      }}
    >
      <Container maxWidth="xl">
        {/* Header & Filter Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: 2.5,
            mb: 4.5
          }}
        >
          <Stack spacing={1}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>
              MEDIA OFICIAL FIA
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>
              Galería
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 680 }}>
              Coches y pilotos reales de la temporada 2026, presentados en alta definición con telemetría visual de cada escudería.
            </Typography>
          </Stack>

          {/* Interactive Category Filter Pills */}
          <div className="gallery-filter-pill-bar" role="tablist" aria-label="Filtrar galería">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`gallery-tab-pill ${activeTab === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <ViewModuleIcon sx={{ fontSize: 16 }} />
              <span>Todos</span>
              <span className="pill-counter">{galleryItems.length}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'car'}
              className={`gallery-tab-pill ${activeTab === 'car' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('car')}
            >
              <DirectionsCarIcon sx={{ fontSize: 16 }} />
              <span>Monoplazas</span>
              <span className="pill-counter">4</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'driver'}
              className={`gallery-tab-pill ${activeTab === 'driver' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('driver')}
            >
              <PersonIcon sx={{ fontSize: 16 }} />
              <span>Pilotos</span>
              <span className="pill-counter">4</span>
            </button>
          </div>
        </Box>

        {/* Gallery Grid */}
        <div className="gallery-modern-grid">
          {filteredItems.map((item, index) => {
            const isCar = item.type === 'car';
            return (
              <div
                key={item.id}
                className={`gallery-card-item ${isCar ? 'is-car-card' : 'is-driver-card'}`}
                style={{ '--item-accent': item.color }}
                onClick={() => setSelectedIndex(index)}
              >
                {/* Background Ambient Glow & Grid Lines */}
                <div className="gallery-card-glow" aria-hidden="true" />
                <div className="gallery-card-mesh" aria-hidden="true" />

                {/* Top HUD Info Header */}
                <div className="gallery-card-top-bar">
                  <div className="card-top-tag">
                    <span className="card-team-dot" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                    <span className="card-team-name">{item.team}</span>
                  </div>

                  {isCar ? (
                    <span className="card-chassis-badge">{item.caption.split(' ')[1] || '2026'}</span>
                  ) : (
                    <div className="card-driver-badges">
                      <span className="card-driver-flag">{item.flag}</span>
                      <span className="card-driver-num">#{item.number}</span>
                    </div>
                  )}
                </div>

                {/* Media Image Stage */}
                <div className="gallery-media-stage">
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className={isCar ? 'gallery-car-img' : 'gallery-driver-img'}
                  />
                  <div className="gallery-zoom-overlay">
                    <span className="zoom-btn-circle">
                      <ZoomInIcon sx={{ fontSize: 20 }} />
                    </span>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="gallery-card-footer">
                  <div className="card-footer-info">
                    <Typography className="card-footer-title">{item.caption}</Typography>
                    <span className="card-footer-sub">{item.sub}</span>
                  </div>
                  <div className="card-footer-action">
                    <span className="card-inspect-pill">HD 🔍</span>
                  </div>
                </div>

                {/* Bottom Color Accent Strip */}
                <div className="gallery-bottom-accent-strip" style={{ background: item.color }} />
              </div>
            );
          })}
        </div>
      </Container>

      {/* Lightbox Modal with Full-Resolution Preview & Carousel Controls */}
      <Dialog
        open={Boolean(activeImage)}
        onClose={() => setSelectedIndex(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          className: 'gallery-lightbox-modal',
          sx: {
            background: 'rgba(7, 7, 12, 0.94) !important',
            backdropFilter: 'blur(36px) saturate(200%)',
            border: `1px solid ${activeImage?.color || 'rgba(255,255,255,0.18)'}`,
            borderRadius: '24px',
            boxShadow: `0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px ${activeImage?.color || '#E8002D'}33`,
            overflow: 'hidden',
            p: 0,
            m: { xs: 1, sm: 2 }
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
          {/* Close Button */}
          <IconButton
            aria-label="Cerrar vista de galería"
            onClick={() => setSelectedIndex(null)}
            className="lightbox-close-btn"
          >
            <CloseIcon />
          </IconButton>

          {/* Carousel Previous / Next Arrows */}
          <IconButton
            aria-label="Imagen anterior"
            onClick={handlePrev}
            className="lightbox-nav-btn prev-btn"
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            aria-label="Siguiente imagen"
            onClick={handleNext}
            className="lightbox-nav-btn next-btn"
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {activeImage && (
            <div className="lightbox-content-box">
              {/* Image Preview Canvas */}
              <div className="lightbox-img-wrapper">
                <img
                  src={activeImage.src}
                  alt={activeImage.caption}
                  className={activeImage.type === 'car' ? 'lightbox-car-img' : 'lightbox-driver-img'}
                />
              </div>

              {/* Bottom Metadata Panel */}
              <div className="lightbox-meta-panel" style={{ '--modal-accent': activeImage.color }}>
                <div className="lightbox-meta-left">
                  <div className="lightbox-tags-row">
                    <span className="lightbox-tag-pill" style={{ background: `${activeImage.color}26`, borderColor: activeImage.color, color: '#fff' }}>
                      <span className="tag-dot" style={{ background: activeImage.color }} />
                      {activeImage.team}
                    </span>
                    <span className="lightbox-type-pill">{activeImage.tag}</span>
                    {activeImage.number && <span className="lightbox-num-pill">DORSAL #{activeImage.number}</span>}
                  </div>
                  <Typography variant="h3" className="lightbox-title">{activeImage.caption}</Typography>
                  <Typography className="lightbox-sub">{activeImage.sub}</Typography>
                  <Typography className="lightbox-spec">{activeImage.spec}</Typography>
                </div>

                <div className="lightbox-meta-right">
                  <span className="lightbox-counter-pill">
                    {selectedIndex + 1} / {filteredItems.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Galeria;
