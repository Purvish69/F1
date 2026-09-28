import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
                <span className="nav-status-pulse" />
                <span className="nav-status-txt">SEASON HUB</span>
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
            <IconButton aria-label="Cerrar menú" onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="mobile-drawer-nav">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setOpen(false);
                  setActiveSection(link.href);
                }}
                className={`mobile-nav-item ${activeSection === link.href ? 'is-active' : ''}`}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <span className="mobile-nav-num">0{idx + 1}</span>
                <span className="mobile-nav-label">{link.label}</span>
                <span className="mobile-nav-arrow">→</span>
              </motion.a>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-spec">
              <SpeedIcon sx={{ fontSize: 18, color: '#e8002d' }} />
              <span>FIA Formula 1 World Championship 2026</span>
            </div>
          </div>
        </div>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
