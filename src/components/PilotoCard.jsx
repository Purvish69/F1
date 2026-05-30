import styles from './PilotoCard.module.css';

function PilotoCard({ pilot }) {
  const avatarName = encodeURIComponent(pilot.name);
  const avatarColor = pilot.color.replace('#', '');
  const avatarUrl = `https://ui-avatars.com/api/?name=${avatarName}&background=${avatarColor}&color=fff&size=200`;

  return (
    <article className={`${styles.card} team-${pilot.slug}`} data-reveal>
      {/* Logica de seccion: la clase del equipo alimenta colores CSS compartidos. */}
      <span className={styles.number}>{pilot.number}</span>
      <img className={styles.avatar} src={avatarUrl} alt={pilot.name} />
      <div className={styles.copy}>
        <h3>{pilot.name}</h3>
        <p className={styles.team}>{pilot.team}</p>
        <p className={styles.country}>
          <span>{pilot.flag}</span>
          {pilot.country}
        </p>
      </div>
      <span className={styles.more}>VER MÁS →</span>
    </article>
  );
}

export default PilotoCard;
