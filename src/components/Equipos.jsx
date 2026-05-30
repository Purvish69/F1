import { teams } from '../data/f1Data.js';
import EquipoCard from './EquipoCard.jsx';
import styles from './Equipos.module.css';

function Equipos() {
  return (
    <section className="section carbon-section" id="equipos">
      <div className="container">
        <div className="section-heading">
          <p>CONSTRUCTORES</p>
          <h2>EQUIPOS</h2>
        </div>

        <div className={styles.grid}>
          {teams.map((team) => (
            <EquipoCard team={team} key={team.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Equipos;
