import { useEffect, useState } from 'react';
import { navLinks } from '../data/f1Data.js';
import styles from './Navbar.module.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#historia');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveLink(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-34% 0px -56% 0px', threshold: [0.1, 0.4, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeDrawer = () => setIsOpen(false);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <a className={styles.wordmark} href="#top" aria-label="Ir al inicio">
        F1 2026
      </a>

      <nav className={styles.links} aria-label="Navegacion principal">
        {navLinks.map((link, index) => (
          <a
            className={`${styles.link} ${activeLink === link.href ? styles.active : ''}`}
            href={link.href}
            key={link.href}
          >
            <span className={styles.linkLabel}>{link.label}</span>
            <span className={styles.delay}>{index + 1}</span>
          </a>
        ))}
      </nav>

      <button
        className={`${styles.menuButton} ${isOpen ? styles.menuOpen : ''}`}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            className={activeLink === link.href ? styles.drawerActive : ''}
            href={link.href}
            key={link.href}
            onClick={closeDrawer}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}

export default Navbar;
