import { useEffect, useState } from 'react';
import { galleryImages } from '../data/f1Data.js';
import Lightbox from './Lightbox.jsx';
import styles from './Galeria.module.css';

function Galeria() {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((index) => (index + 1) % galleryImages.length);
  const previous = () => setActiveIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (activeIndex === null) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="section-heading">
          <p>PADDOCK VISUAL</p>
          <h2>GALERÍA</h2>
        </div>

        <div className={styles.masonry}>
          {galleryImages.map((image, index) => (
            <button
              className={styles.item}
              type="button"
              onClick={() => setActiveIndex(index)}
              data-reveal
              key={`${image.caption}-${image.src}`}
            >
              {/* Logica de seccion: cada imagen abre el visor modal con navegacion. */}
              <img src={image.src} alt={image.caption} />
              <span>{image.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          image={galleryImages[activeIndex]}
          onClose={close}
          onNext={next}
          onPrevious={previous}
        />
      )}
    </section>
  );
}

export default Galeria;
