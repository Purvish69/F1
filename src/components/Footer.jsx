import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SpeedIcon from '@mui/icons-material/Speed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Container, Divider, Grid, Stack, Typography, IconButton } from '@mui/material';
import { navLinks, sourceLinks } from '../data/f1Data.js';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box component="footer" className="f1-modern-footer">
      {/* Top subtle racing glow line */}
      <div className="footer-top-racing-stripe" aria-hidden="true" />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ pt: { xs: 6, md: 8 }, pb: 5 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={5}>
            <div className="footer-brand-block">
              <div className="footer-logo-row">
                <span className="footer-f1-logo">F1</span>
                <span className="footer-year-badge">2026</span>
                <span className="footer-status-pill">
                  <span className="footer-status-dot" />
                  TEMPORADA ACTIVA
                </span>
              </div>
              <Typography className="footer-description">
                Hub interactivo y clasificaciones de la temporada 2026 de Fórmula 1. Datos de telemetría, pilotos, escuderías y calendario en tiempo real con estética de paddock visual.
              </Typography>
              <div className="footer-tech-spec-bar">
                <span className="spec-item">GEN-3 ACTIVE AERO</span>
                <span className="spec-item-dot">·</span>
                <span className="spec-item">350 kW MGU-K</span>
                <span className="spec-item-dot">·</span>
                <span className="spec-item">100% E-FUEL</span>
              </div>
            </div>
          </Grid>

          {/* Navigation Column */}
          <Grid item xs={6} sm={6} md={3}>
            <div className="footer-col-header">
              <span className="col-header-dot" />
              <Typography className="footer-section-title">NAVEGACIÓN</Typography>
            </div>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-nav-link">
                    <span className="nav-arrow-indicator">›</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Grid>

          {/* Official Sources Column */}
          <Grid item xs={6} sm={6} md={4}>
            <div className="footer-col-header">
              <span className="col-header-dot" />
              <Typography className="footer-section-title">FUENTES OFICIALES</Typography>
            </div>
            <ul className="footer-nav-list">
              <li>
                <a href={sourceLinks.drivers} target="_blank" rel="noreferrer" className="footer-nav-link external-link">
                  <span>Pilotos Oficiales FIA</span>
                  <OpenInNewIcon sx={{ fontSize: 13 }} />
                </a>
              </li>
              <li>
                <a href={sourceLinks.teams} target="_blank" rel="noreferrer" className="footer-nav-link external-link">
                  <span>Escuderías F1 2026</span>
                  <OpenInNewIcon sx={{ fontSize: 13 }} />
                </a>
              </li>
              <li>
                <a href={sourceLinks.results} target="_blank" rel="noreferrer" className="footer-nav-link external-link">
                  <span>Resultados y Calendario</span>
                  <OpenInNewIcon sx={{ fontSize: 13 }} />
                </a>
              </li>
              <li>
                <a href={sourceLinks.driverStandings} target="_blank" rel="noreferrer" className="footer-nav-link external-link">
                  <span>Clasificación Mundial Jolpica</span>
                  <OpenInNewIcon sx={{ fontSize: 13 }} />
                </a>
              </li>
            </ul>
          </Grid>
        </Grid>

        {/* Divider */}
        <div className="footer-divider-line" aria-hidden="true" />

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-legal-copy">
            <Typography className="footer-copyright-text">
              © 2026 F1 Hub · Proyecto fan no oficial con fines educativos y de divulgación.
            </Typography>
            <Typography className="footer-disclaimer-text">
              Formula 1, F1, FIA y las marcas asociadas son propiedad de Formula One Licensing B.V.
            </Typography>
          </div>

          {/* Author Badge & Actions */}
          <div className="footer-bottom-actions">
            {/* Very Small Discreet Name Signature */}
            <div className="footer-author-signature">
              <span>Desarrollado con</span>
              <FavoriteIcon sx={{ fontSize: 12, color: '#e8002d', mx: 0.4 }} />
              <span>por</span>
              <strong className="footer-author-name">Purvish</strong>
            </div>

            <a
              href="https://github.com/Purvish69/F1"
              target="_blank"
              rel="noreferrer"
              className="footer-github-btn"
              title="Ver código en GitHub"
            >
              <GitHubIcon sx={{ fontSize: 16 }} />
              <span>GitHub</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="footer-back-to-top"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default Footer;
