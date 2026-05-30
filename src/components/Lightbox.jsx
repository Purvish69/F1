import styles from './Lightbox.module.css';

function Lightbox({ image, onClose, onNext, onPrevious }) {
  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={image.caption}>
      <button className={`${styles.control} ${styles.close}`} type="button" onClick={onClose} aria-label="Cerrar">
        ×
      </button>
      <button className={`${styles.control} ${styles.previous}`} type="button" onClick={onPrevious} aria-label="Anterior">
        ‹
      </button>
      <figure>
        <img src={image.src} alt={image.caption} />
        <figcaption>{image.caption}</figcaption>
      </figure>
      <button className={`${styles.control} ${styles.next}`} type="button" onClick={onNext} aria-label="Siguiente">
        ›
      </button>
    </div>
  );
}

export default Lightbox;
