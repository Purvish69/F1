import { navLinks } from '../data/f1Data.js';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.flagStrip} />
      <div className={`container ${styles.grid}`}>
        <div>
          <h3>Navegación</h3>
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <h3>Temporada 2026</h3>
          <p>11 constructores confirmados en esta experiencia visual, con debut de Audi y Cadillac.</p>
        </div>
        <div>
          <h3>Créditos</h3>
          <p>Imágenes de Unsplash y avatares generados para un proyecto fan no oficial.</p>
        </div>
      </div>
      <div className={styles.wordmark}>F1 2026</div>
      <p className={styles.legal}>© 2026 F1 Fan Site · Proyecto no oficial · No afiliado a Formula One Group</p>
    </footer>
  );
}

export default Footer;
