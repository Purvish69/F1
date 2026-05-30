import { timeline } from '../data/f1Data.js';
import styles from './Historia.module.css';

function Historia() {
  return (
    <section className="section carbon-section" id="historia">
      <div className="container">
        <div className="section-heading">
          <p>LEGADO</p>
          <h2>HISTORIA</h2>
        </div>

        <div className={styles.timeline}>
          {timeline.map((item, index) => (
            <article
              className={`${styles.milestone} ${index % 2 === 0 ? styles.left : styles.right}`}
              data-reveal
              key={`${item.year}-${item.title}`}
            >
              {/* Logica de seccion: cada tarjeta alterna posicion en escritorio. */}
              <span className={styles.year}>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Historia;
