import styles from './Hero.module.css';

function Hero() {
  const speedLines = Array.from({ length: 10 }, (_, index) => index);

  return (
    <section className={styles.hero} id="top">
      <div className={styles.overlay} />
      <div className={styles.speedField} aria-hidden="true">
        {speedLines.map((line) => (
          <span className={`${styles.speedLine} ${styles[`line${line + 1}`]}`} key={line} />
        ))}
      </div>

      <div className={styles.content}>
        <p className={`${styles.kicker} ${styles.loadOne}`}>THE PINNACLE OF</p>
        <h1 className={`${styles.title} ${styles.loadTwo}`}>MOTORSPORT</h1>
        <p className={`${styles.season} ${styles.loadThree}`}>TEMPORADA 2026</p>
        <p className={`${styles.subtitle} ${styles.loadFour}`}>12 equipos · 24 pilotos · Una sola corona</p>
        <a className={`${styles.cta} ${styles.loadFive}`} href="#historia">
          EXPLORAR AHORA
        </a>
      </div>

      <a className={styles.scrollIndicator} href="#historia" aria-label="Bajar a historia">
        <span />
      </a>
    </section>
  );
}

export default Hero;
