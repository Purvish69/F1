import styles from './EquipoCard.module.css';

const statLabels = {
  speed: 'Velocidad punta',
  reliability: 'Fiabilidad',
  aero: 'Aerodinámica'
};

function EquipoCard({ team }) {
  return (
    <article className={`${styles.flipCard} team-${team.slug}`} data-reveal>
      {/* Logica de seccion: el hover activa el giro 3D y las barras de rendimiento. */}
      <div className={styles.inner}>
        <div className={`${styles.face} ${styles.front}`}>
          <span className={styles.badge}>2026</span>
          <h3>{team.shortTeam || team.team}</h3>
          <dl>
            <div>
              <dt>Motor</dt>
              <dd>{team.engine}</dd>
            </div>
            <div>
              <dt>Director</dt>
              <dd>{team.principal}</dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd>{team.base}</dd>
            </div>
            <div>
              <dt>Títulos</dt>
              <dd>{team.titles}</dd>
            </div>
          </dl>
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <h3>{team.shortTeam || team.team}</h3>
          <div className={styles.stats}>
            {Object.entries(team.stats).map(([key, value]) => (
              <div className={`${styles.stat} stat-${value}`} key={key}>
                <span>{statLabels[key]}</span>
                <div className={styles.track}>
                  <span className={styles.bar} />
                </div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default EquipoCard;
