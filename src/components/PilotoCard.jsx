import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Card, Typography, useMediaQuery } from '@mui/material';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const slugExceptions = { antonelli: 'kimi-antonelli' };
const officialDriverSlug = (name) => {
  const slug = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return slugExceptions[slug] || slug;
};

function Stat({ label, value }) {
  return <Box sx={{ borderLeft: '1px solid rgba(255,255,255,.16)', minWidth: 0, pl: 1.1 }}><Typography sx={{ color: 'rgba(255,255,255,.76)', fontSize: '.67rem', fontWeight: 900, letterSpacing: '.06em', textTransform: 'uppercase' }}>{label}</Typography><Typography sx={{ color: 'common.white', fontFamily: 'var(--font-display)', fontSize: '1.35rem', lineHeight: .95 }}>{value}</Typography></Box>;
}

function PilotoCard({ pilot, team, maxPoints = pilot.points || 1, index = 0 }) {
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const touchDevice = useMediaQuery('(hover: none), (pointer: coarse)');
  const tiltDisabled = reducedMotion || touchDevice;
  const genericPortrait = !pilot.image || /d_driver_fallback_image\.png(?:$|[?#])/.test(pilot.image);
  const [hasPhoto, setHasPhoto] = useState(!genericPortrait);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const springConfig = { stiffness: 220, damping: 24, mass: .45 };
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-5, 5]), springConfig);
  const rotateX = useSpring(useTransform(pointerY, [0, 100], [5, -5]), springConfig);
  const photoX = useSpring(useTransform(pointerX, [0, 100], [-5, 5]), springConfig);
  const photoY = useSpring(useTransform(pointerY, [0, 100], [-4, 4]), springConfig);
  const nameParts = pilot.name.trim().split(/\s+/);
  const surname = nameParts.at(-1) || pilot.name;
  const givenName = nameParts.slice(0, -1).join(' ') || pilot.name;
  const initials = nameParts.map((part) => part[0]).join('').slice(0, 2);
  const pointRatio = Math.min((pilot.points / maxPoints) * 100, 100);
  const driverSlug = officialDriverSlug(pilot.name);
  const surnameSize = surname.length > 9 ? 'clamp(2.15rem, 7vw, 3.05rem)' : 'clamp(2.5rem, 8vw, 3.6rem)';

  const updatePointer = (event) => {
    if (tiltDisabled || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    pointerX.set(x); pointerY.set(y);
    cardRef.current.style.setProperty('--spotlight-x', `${x}%`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}%`);
  };
  const resetPointer = () => {
    pointerX.set(50); pointerY.set(50);
    cardRef.current?.style.setProperty('--spotlight-x', '50%');
    cardRef.current?.style.setProperty('--spotlight-y', '35%');
  };

  return <Card component={motion.article} ref={cardRef} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: reducedMotion ? 0 : Math.min(index * .035, .4), duration: reducedMotion ? 0 : .42 }} onPointerMove={updatePointer} onPointerLeave={resetPointer} style={tiltDisabled ? undefined : { rotateX, rotateY, transformPerspective: 1000 }} sx={{
    '--spotlight-x': '50%', '--spotlight-y': '35%', backdropFilter: 'blur(14px) saturate(145%)', background: `linear-gradient(145deg, ${team.color}40, rgba(255,255,255,.09) 38%, rgba(8,8,10,.80) 82%)`, border: `1px solid ${team.color}66`, boxShadow: 'inset 0 1px rgba(255,255,255,.28), inset 0 -1px rgba(255,255,255,.06), 0 20px 56px rgba(0,0,0,.24)', height: '100%', minHeight: 560, overflow: 'hidden', position: 'relative', transformStyle: 'preserve-3d', '&::before': { background: `radial-gradient(circle 180px at var(--spotlight-x) var(--spotlight-y), ${team.color}70, transparent 72%)`, content: '""', inset: 0, opacity: tiltDisabled ? 0 : 1, pointerEvents: 'none', position: 'absolute' }, '&::after': { background: `linear-gradient(90deg, transparent, rgba(255,255,255,.68), ${team.color}aa, rgba(255,255,255,.68), transparent)`, content: '""', height: '1px', left: '7%', position: 'absolute', right: '7%', top: 0 }
  }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.7, height: '100%', minHeight: 560, p: 2.35, position: 'relative', transform: 'translateZ(2px)', zIndex: 2 }}>
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}><Box sx={{ bgcolor: team.color, borderRadius: 99, color: 'common.white', fontSize: '.7rem', fontWeight: 1000, letterSpacing: '.08em', px: .8, py: .45 }}>P{pilot.position}</Box><Typography sx={{ color: 'rgba(255,255,255,.84)', fontSize: '.72rem', fontWeight: 800, letterSpacing: '.05em', maxWidth: '72%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pilot.flag} {pilot.nationality}</Typography></Box>

      <Box sx={{ height: { xs: 270, sm: 292 }, isolation: 'isolate', overflow: 'hidden', position: 'relative' }}>
        <Box sx={{ background: `radial-gradient(ellipse at 58% 45%, ${team.color}85, transparent 67%)`, inset: '-18% -12% -8%', opacity: .86, position: 'absolute', zIndex: 0 }} />
        <Typography aria-hidden="true" sx={{ color: 'transparent', fontFamily: 'var(--font-display)', fontSize: '12rem', lineHeight: .8, position: 'absolute', right: -8, top: 26, WebkitTextStroke: '1px rgba(255,255,255,.19)', zIndex: 0 }}>{pilot.number}</Typography>
        {hasPhoto ? <motion.img src={pilot.image} alt={pilot.name} loading="lazy" onError={() => setHasPhoto(false)} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .38, delay: reducedMotion ? 0 : Math.min(index * .035, .4) }} style={{ bottom: 0, height: '100%', objectFit: 'cover', objectPosition: 'top center', position: 'absolute', right: 0, translateX: tiltDisabled ? 0 : photoX, translateY: tiltDisabled ? 0 : photoY, translateZ: tiltDisabled ? 0 : 24, WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)', width: '100%', zIndex: 1 }} /> : <Box aria-label={`Retrato no disponible de ${pilot.name}`} sx={{ alignItems: 'center', bottom: 0, display: 'flex', inset: 0, justifyContent: 'center', position: 'absolute', zIndex: 1 }}><Box sx={{ alignItems: 'center', backgroundColor: team.color, border: '3px solid rgba(255,255,255,.35)', borderRadius: '50%', boxShadow: `0 12px 30px ${team.color}77`, display: 'flex', height: 148, justifyContent: 'center', width: 148 }}><Typography sx={{ color: 'common.white', fontFamily: 'var(--font-display)', fontSize: '4.7rem', letterSpacing: '.02em', lineHeight: 1 }}>{initials}</Typography></Box></Box>}
      </Box>

      <Box sx={{ position: 'relative', zIndex: 3 }}><Typography sx={{ color: 'rgba(255,255,255,.80)', fontSize: '.82rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>{givenName}</Typography><Typography variant="h3" sx={{ color: 'common.white', fontSize: surnameSize, letterSpacing: '.01em', lineHeight: .8, overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 4px 18px rgba(0,0,0,.42)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{surname}</Typography></Box>

      <Box sx={{ backdropFilter: 'blur(8px)', background: 'rgba(4,4,6,.42)', border: '1px solid rgba(255,255,255,.12)', mt: 'auto', p: 1.45 }}>
        <Typography sx={{ color: team.color, fontSize: '.82rem', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' }}>{pilot.team}</Typography>
        <Typography sx={{ color: 'common.white', fontFamily: 'var(--font-display)', fontSize: '3rem', lineHeight: .78, mt: .75 }}>{pilot.points}<Box component="span" sx={{ color: 'rgba(255,255,255,.72)', fontFamily: 'var(--font-body)', fontSize: '.68rem', fontWeight: 900, letterSpacing: '.1em', ml: .5 }}>PTS</Box></Typography>
        <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '.7rem', fontWeight: 800, letterSpacing: '.04em', mt: .7 }}>{pilot.points} / {maxPoints} pts del líder</Typography>
        <Box sx={{ bgcolor: 'rgba(0,0,0,.28)', borderRadius: 99, height: 4, mt: .65, overflow: 'hidden' }}><motion.div initial={{ width: 0 }} whileInView={{ width: `${pointRatio}%` }} viewport={{ once: true }} transition={{ duration: .6, delay: reducedMotion ? 0 : Math.min(index * .02, .4) }} style={{ background: team.color, boxShadow: `0 0 12px ${team.color}`, height: '100%' }} /></Box>
        <Box sx={{ display: 'grid', gap: 1.2, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', mt: 1.8 }}><Stat label="Victorias" value={pilot.wins} /><Stat label="Dorsal" value={pilot.number} /><Stat label="Código" value={pilot.short} /></Box>
        <Button fullWidth href={`https://www.formula1.com/en/drivers/${driverSlug}`} target="_blank" rel="noreferrer" aria-label={`Abrir perfil oficial de ${pilot.name}`} endIcon={<OpenInNewIcon />} sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.20)', color: 'common.white', mt: 1.8, '&:hover': { bgcolor: 'rgba(255,255,255,.13)', borderColor: `${team.color}bb` } }}>Perfil oficial</Button>
      </Box>
    </Box>
  </Card>;
}

export default PilotoCard;
