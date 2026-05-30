import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Historia from './components/Historia.jsx';
import Pilotos from './components/Pilotos.jsx';
import Equipos from './components/Equipos.jsx';
import Galeria from './components/Galeria.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateCursor = (event) => {
      if (!cursorRef.current) return;
      cursorRef.current.animate(
        { transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0)` },
        { duration: 90, fill: 'forwards', easing: 'ease-out' }
      );
    };

    window.addEventListener('pointermove', updateCursor);
    return () => window.removeEventListener('pointermove', updateCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Historia />
        <Pilotos />
        <Equipos />
        <Galeria />
      </main>
      <Footer />
    </>
  );
}

export default App;
