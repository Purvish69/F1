import { pilots } from '../data/f1Data.js';
import PilotoCard from './PilotoCard.jsx';
import styles from './Pilotos.module.css';

function Pilotos() {
  return (
    <section className="section" id="pilotos">
      <div className="container">
        <div className="section-heading">
          <p>GRID COMPLETA</p>
          <h2>PILOTOS</h2>
        </div>

        <div className={styles.grid}>
          {pilots.map((pilot) => (
            <PilotoCard pilot={pilot} key={`${pilot.team}-${pilot.number}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pilotos;
