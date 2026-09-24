import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Avatar, Box, Button, Card, Chip, Stack, Typography, useMediaQuery } from '@mui/material';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

function InfoPill({ label, value }) {
  return <Box sx={{ bgcolor: 'rgba(0,0,0,.34)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 1, px: 1.2, py: .8 }}>
    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.85)', fontSize: '.72rem', fontWeight: 900, letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</Typography>
    <Typography sx={{ color: 'common.white', fontSize: '1.05rem', fontWeight: 900, lineHeight: 1.1 }}>{value}</Typography>
  </Box>;
}

function DriverAvatar({ driver, teamColor }) {
  const isFallback = !driver.image || /d_driver_fallback_image\.png(?:$|[?#])/.test(driver.image);
  const [imageFailed, setImageFailed] = useState(isFallback);
  const initials = driver.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  return <Avatar src={imageFailed ? undefined : driver.image} alt={driver.name} imgProps={{ loading: 'lazy', onError: () => setImageFailed(true) }} sx={{ bgcolor: teamColor, color: 'common.white', fontSize: 12, fontWeight: 900, height: 34, width: 34, '& img': { objectFit: 'cover', objectPosition: '50% 12%' } }}>{initials}</Avatar>;
}

function EquipoCard({ team, driverMap, leaderPoints }) {
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const touchDevice = useMediaQuery('(hover: none), (pointer: coarse)');
  const tiltDisabled = reducedMotion || touchDevice;
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const springConfig = { stiffness: 220, damping: 24, mass: .45 };
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-6, 6]), springConfig);
  const rotateX = useSpring(useTransform(pointerY, [0, 100], [6, -6]), springConfig);
  const carX = useSpring(useTransform(pointerX, [0, 100], [-6, 6]), springConfig);
  const carY = useSpring(useTransform(pointerY, [0, 100], [-4, 4]), springConfig);
  const [sweep, setSweep] = useState(0);
  const teamDrivers = team.drivers.map((name) => driverMap[name]).filter(Boolean);
  const officialSlugs = { astonmartin: 'aston-martin', redbullracing: 'red-bull-racing', racingbulls: 'racing-bulls' };
  const officialSlug = officialSlugs[team.slug] || team.slug;
  const validDetail = (value) => value && value !== '—';
  const difference = Number.isFinite(leaderPoints) && Number.isFinite(team.points) ? Math.max(leaderPoints - team.points, 0) : null;
  const pointRatio = Number.isFinite(leaderPoints) && leaderPoints > 0 ? Math.min((team.points / leaderPoints) * 100, 100) : 0;

  const updatePointer = (event) => {
    if (tiltDisabled || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    pointerX.set(x);
    pointerY.set(y);
    cardRef.current.style.setProperty('--spotlight-x', `${x}%`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}%`);
  };
  const resetPointer = () => {
    pointerX.set(50);
    pointerY.set(50);
    cardRef.current?.style.setProperty('--spotlight-x', '50%');
    cardRef.current?.style.setProperty('--spotlight-y', '38%');
  };

  return <Card
    component={motion.article}
    ref={cardRef}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: reducedMotion ? 0 : .45 }}
    onPointerMove={updatePointer}
    onPointerLeave={resetPointer}
    onPointerEnter={() => !tiltDisabled && setSweep((value) => value + 1)}
    style={tiltDisabled ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
    sx={{
      '--spotlight-x': '50%',
      '--spotlight-y': '38%',
      background: `linear-gradient(135deg, ${team.color}30, rgba(255,255,255,.075) 42%, rgba(8,8,11,.78)), radial-gradient(circle at 80% 8%, ${team.color}42, transparent 14rem)`,
      backdropFilter: 'blur(18px) saturate(150%)',
      borderColor: `${team.color}62`,
      boxShadow: 'inset 0 1px rgba(255,255,255,.28), inset 0 -1px rgba(255,255,255,.06), 0 20px 60px rgba(0,0,0,.26)',
      minHeight: 385,
      overflow: 'visible',
      position: 'relative',
      transformStyle: 'preserve-3d',
      '&::before': { background: `radial-gradient(circle 150px at var(--spotlight-x) var(--spotlight-y), ${team.color}66, transparent 72%)`, content: '""', inset: 0, opacity: tiltDisabled ? 0 : 1, pointerEvents: 'none', position: 'absolute', transition: 'opacity .2s ease' },
      '&::after': { background: `linear-gradient(90deg, transparent, rgba(255,255,255,.72), ${team.color}aa, rgba(255,255,255,.72), transparent)`, content: '""', height: '1px', left: '6%', position: 'absolute', right: '6%', top: 0 }
    }}
  >
    <Box sx={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.20) 1px, transparent 1px)', backgroundSize: '6px 6px', bottom: 0, height: '48%', left: 0, opacity: .2, position: 'absolute', right: 0 }} />
    <Box sx={{ p: { xs: 2.2, md: 3 }, position: 'relative', transform: 'translateZ(1px)', zIndex: 1 }}>
      <Box sx={{ alignItems: 'start', display: 'grid', gap: 1.5, gridTemplateColumns: 'minmax(0, 1fr) auto' }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h3" sx={{ color: 'common.white', letterSpacing: '.015em', lineHeight: .9, textShadow: '0 3px 16px rgba(0,0,0,.34)' }}>{team.name}</Typography>
        </Box>
        <Box sx={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column', minWidth: 74, textAlign: 'right' }}>
          <Box sx={{ bgcolor: team.color, borderRadius: 99, color: 'common.white', fontSize: '.68rem', fontWeight: 1000, letterSpacing: '.08em', lineHeight: 1, mb: .5, px: .75, py: .45 }}>P{team.position}</Box>
          <Typography sx={{ color: 'common.white', fontFamily: 'var(--font-display)', fontSize: '2.6rem', lineHeight: .72 }}>{team.points}</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,.70)', fontSize: '.67rem', fontWeight: 900, letterSpacing: '.1em', mt: .45 }}>PTS</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 1.5, md: 1.25 }, overflow: 'visible', position: 'relative', zIndex: 1 }}>
        <Box sx={{ inset: 0, overflow: 'hidden', pointerEvents: 'none', position: 'absolute', zIndex: 2 }}><motion.div key={sweep} initial={{ opacity: 0, x: '-130%' }} animate={sweep ? { opacity: [0, .7, 0], x: '145%' } : { opacity: 0 }} transition={{ duration: .48, ease: 'easeOut' }} style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.72), transparent)', height: '100%', pointerEvents: 'none', position: 'absolute', top: 0, transform: 'skewX(-22deg)', width: '35%' }} /></Box>
        <motion.img src={team.car} alt={`${team.name} 2026 car`} loading="lazy" style={{ display: 'block', filter: 'drop-shadow(0 25px 30px rgba(0,0,0,.48))', height: 'auto', position: 'relative', translateX: tiltDisabled ? 0 : carX, translateY: tiltDisabled ? 0 : carY, width: '100%', zIndex: 1 }} />
      </Box>

      {Number.isFinite(leaderPoints) && <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '.72rem', fontWeight: 800, letterSpacing: '.04em', mt: -.4, textAlign: 'right' }}>{team.points} / {leaderPoints} pts del líder</Typography>}
      <Box sx={{ bgcolor: 'rgba(0,0,0,.25)', borderRadius: 99, height: 4, mt: .6, overflow: 'hidden' }}><motion.div initial={{ width: 0 }} whileInView={{ width: `${pointRatio}%` }} viewport={{ once: true }} transition={{ duration: .65 }} style={{ background: team.color, boxShadow: `0 0 12px ${team.color}`, height: '100%' }} /></Box>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.75 }}>
        {teamDrivers.map((driver) => <Chip key={driver.id} avatar={<DriverAvatar driver={driver} teamColor={team.color} />} label={<><Box component="span" sx={{ fontSize: '.82rem', fontWeight: 900 }}>{driver.name.split(' ').at(-1).toUpperCase()}</Box><Box component="span" sx={{ color: 'rgba(255,255,255,.72)', fontSize: '.74rem', fontWeight: 600 }}> · {driver.points} pts</Box></>} sx={{ bgcolor: 'rgba(0,0,0,.30)', color: 'common.white', maxWidth: '100%', '& .MuiChip-label': { alignItems: 'center', display: 'flex', minWidth: 0 } }} />)}
      </Stack>
      <Box sx={{ alignItems: { xs: 'stretch', sm: 'center' }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.4, justifyContent: 'space-between', mt: 1.6 }}>
        <Box sx={{ display: 'grid', flex: 1, gap: 1.2, gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))' }, width: 'auto' }}>
          <InfoPill label="Victorias" value={team.wins} />
          {difference !== null && <InfoPill label="Dif. líder" value={difference === 0 ? 'Líder' : `${difference} pts`} />}
          {validDetail(team.engine) && <InfoPill label="Motor" value={team.engine} />}
          {validDetail(team.chassis) && <InfoPill label="Chasis" value={team.chassis} />}
        </Box>
        <Button href={`https://www.formula1.com/en/teams/${officialSlug}`} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />} sx={{ alignSelf: { xs: 'flex-end', sm: 'center' }, bgcolor: 'rgba(0,0,0,.28)', color: 'common.white', whiteSpace: 'nowrap', '&:hover': { bgcolor: 'rgba(0,0,0,.42)' } }}>Equipo oficial</Button>
      </Box>
    </Box>
  </Card>;
}

export default EquipoCard;
