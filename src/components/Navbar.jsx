import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CollectionsIcon from '@mui/icons-material/Collections';
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
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/f1Data.js';
import { ShinyText } from './ReactBits.jsx';

const mobileLinkMeta = {
  '#inicio': { icon: <SpeedIcon sx={{ fontSize: 20 }} />, subtitle: 'Telemetría y top circuitos' },
  '#pilotos': { icon: <PersonIcon sx={{ fontSize: 20 }} />, subtitle: 'Parrilla oficial y estadísticas 2026' },
  '#equipos': { icon: <DirectionsCarIcon sx={{ fontSize: 20 }} />, subtitle: 'Monoplazas, chasis y motores' },
  '#resultados': { icon: <EmojiEventsIcon sx={{ fontSize: 20 }} />, subtitle: 'Calendario, GP y mundial' },
  '#galeria': { icon: <CollectionsIcon sx={{ fontSize: 20 }} />, subtitle: 'Imágenes HD y galería visual' }
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = navLinks.map(l => l.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={`f1-glass-navbar ${scrolled ? 'is-scrolled' : ''}`}
      sx={{
        bgcolor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1640px', px: { xs: 2, sm: 3, md: 4 } }}>
        <div className={`nav-glass-shell ${scrolled ? 'shell-scrolled' : ''}`}>
          <Toolbar disableGutters className="nav-toolbar">
            {/* Logo Brand with High-Tech Glow */}
            <a href="#inicio" className="nav-brand-link" onClick={() => setActiveSection('#inicio')}>
              <div className="nav-logo-badge">
                <span className="f1-logo-main">F1</span>
                <span className="f1-logo-slash" />
                <span className="f1-logo-year">2026</span>
              </div>
              <div className="nav-brand-status">
              </div>
            </a>

            {/* Desktop Navigation Links with Glass Animated Pill */}
            <div className="nav-links-desktop" onMouseLeave={() => setHoveredNav(null)}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                const isHovered = hoveredNav === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link-btn ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => setHoveredNav(link.href)}
                    onClick={() => setActiveSection(link.href)}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="hoverNavIndicator"
                        className="nav-hover-pill"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action HUD Badge */}
            <div className="nav-right-actions">
              <a href="#top-equipos" className="nav-live-cta">
                <span className="live-dot" />
                <span className="live-text">MONOPLAZAS 2026</span>
                <span className="live-pill-tag">GEN-3</span>
              </a>

              {/* Mobile Menu Trigger Button */}
              <IconButton
                aria-label="Abrir menú"
                onClick={() => setOpen(true)}
                className="nav-mobile-trigger"
                sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              >
                <MenuIcon sx={{ color: '#fff' }} />
              </IconButton>
            </div>
          </Toolbar>
        </div>
      </Container>

      {/* Mobile Glass Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          className: 'nav-mobile-drawer-paper'
        }}
      >
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <div className="nav-logo-badge">
              <span className="f1-logo-main">F1</span>
              <span className="f1-logo-slash" />
              <span className="f1-logo-year">2026</span>
            </div>
            <span className="mobile-live-badge"><span className="hud-pulse-dot" /> FIA PADDOCK</span>
            <IconButton aria-label="Cerrar menú" onClick={() => setOpen(false)} className="mobile-close-btn">
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </div>

          <div className="mobile-drawer-nav">
            {navLinks.map((link, idx) => {
              const meta = mobileLinkMeta[link.href] || { icon: <SpeedIcon sx={{ fontSize: 20 }} />, subtitle: '' };
              const isActive = activeSection === link.href;

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setOpen(false);
                    setActiveSection(link.href);
                  }}
                  className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="mobile-nav-icon-badge" style={{ color: isActive ? '#e8002d' : 'rgba(255,255,255,0.7)' }}>
                    {meta.icon}
                  </div>

                  <div className="mobile-nav-text-col">
                    <div className="mobile-nav-title-row">
                      <span className="mobile-nav-num">0{idx + 1}</span>
                      <span className="mobile-nav-label">{link.label}</span>
                    </div>
                    {meta.subtitle && <span className="mobile-nav-sub">{meta.subtitle}</span>}
                  </div>

                  <span className="mobile-nav-arrow">→</span>
                </motion.a>
              );
            })}
          </div>

          <div className="mobile-drawer-footer">
            <a
              href="#top-equipos"
              className="mobile-drawer-cta-btn"
              onClick={() => setOpen(false)}
            >
              <span className="hud-pulse-dot" />
              <span>EXPLORAR MONOPLAZAS 2026</span>
            </a>

            <div className="mobile-drawer-spec">
              <SpeedIcon sx={{ fontSize: 16, color: '#e8002d' }} />
              <span>FIA FORMULA 1 WORLD CHAMPIONSHIP 2026</span>
            </div>
          </div>
        </div>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
