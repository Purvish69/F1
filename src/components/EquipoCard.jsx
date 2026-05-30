import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';

function InfoPill({ label, value }) {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(0,0,0,.24)',
        border: '1px solid rgba(255,255,255,.16)',
        borderRadius: 1,
        px: 1.2,
        py: .8
      }}
    >
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.66)', fontWeight: 900, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography sx={{ color: 'common.white', fontWeight: 900, lineHeight: 1.1 }}>{value}</Typography>
    </Box>
  );
}

function EquipoCard({ team, driverMap }) {
  const teamDrivers = team.drivers.map((name) => driverMap[name]).filter(Boolean);
  const officialSlugs = {
    astonmartin: 'aston-martin',
    redbullracing: 'red-bull-racing',
    racingbulls: 'racing-bulls'
  };
  const officialSlug = officialSlugs[team.slug] || team.slug;

  return (
    <Card
      component={motion.article}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .45 }}
      sx={{
        background:
          `linear-gradient(135deg, ${team.color}F2, ${team.color}C7 44%, rgba(12,12,16,.94)), radial-gradient(circle at 78% 16%, rgba(255,255,255,.24), transparent 12rem)`,
        borderColor: `${team.color}99`,
        minHeight: 340,
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow .28s ease, border-color .28s ease',
        '&:hover': {
          borderColor: 'rgba(255,255,255,.55)',
          boxShadow: `0 28px 90px ${team.color}36`,
          '& .team-car': { transform: 'translate3d(10px,-6px,0) scale(1.03)' }
        }
      }}
    >
      <Box
        sx={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
          bottom: 0,
          height: '48%',
          left: 0,
          opacity: .28,
          position: 'absolute',
          right: 0
        }}
      />
      <Box sx={{ p: { xs: 2.2, md: 3 }, position: 'relative', zIndex: 1 }}>
        {/* Logica de seccion: tarjeta horizontal con coche protagonista y datos compactos. */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h3" sx={{ color: 'common.white', lineHeight: .9 }}>
              {team.name}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.3 }}>
              {teamDrivers.map((driver) => (
                <Chip
                  key={driver.id}
                  avatar={<Avatar src={driver.image} alt={driver.name} />}
                  label={`${driver.name.split(' ').at(-1).toUpperCase()} · ${driver.points} pts`}
                  sx={{
                    bgcolor: 'rgba(0,0,0,.24)',
                    color: 'common.white',
                    fontWeight: 900
                  }}
                />
              ))}
            </Stack>
          </Box>
          <Stack spacing={1} alignItems="flex-end">
            <Chip label={`P${team.position}`} sx={{ bgcolor: 'rgba(255,255,255,.94)', color: '#050505', fontWeight: 1000, minWidth: 70 }} />
            <Chip label={`${team.points} pts`} sx={{ bgcolor: 'rgba(0,0,0,.28)', color: 'common.white', fontWeight: 900 }} />
          </Stack>
        </Stack>

        <Box
          component="img"
          className="team-car"
          src={team.car}
          alt={`${team.name} 2026 car`}
          loading="lazy"
          sx={{
            display: 'block',
            filter: 'drop-shadow(0 28px 38px rgba(0,0,0,.42))',
            ml: { xs: -2, md: -1 },
            mt: { xs: 3, md: 2 },
            position: 'relative',
            transition: 'transform .36s cubic-bezier(.2,.8,.2,1)',
            width: { xs: '118%', md: '108%' },
            zIndex: 1
          }}
        />

        <Grid container spacing={1.2} sx={{ mt: { xs: 1, md: -1 } }}>
          <Grid item xs={6} sm={3}><InfoPill label="Motor" value={team.engine} /></Grid>
          <Grid item xs={6} sm={3}><InfoPill label="Chasis" value={team.chassis} /></Grid>
          <Grid item xs={6} sm={3}><InfoPill label="Podios" value={team.podiums} /></Grid>
          <Grid item xs={6} sm={3}><InfoPill label="Jefe" value={team.chief} /></Grid>
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" sx={{ mt: 1.6 }}>
          <Typography sx={{ color: 'rgba(255,255,255,.76)', fontWeight: 800 }}>
            {team.base} · {team.fullName}
          </Typography>
          <Button
            href={`https://www.formula1.com/en/teams/${officialSlug}`}
            target="_blank"
            rel="noreferrer"
            endIcon={<OpenInNewIcon />}
            sx={{ bgcolor: 'rgba(0,0,0,.28)', color: 'common.white', whiteSpace: 'nowrap', '&:hover': { bgcolor: 'rgba(0,0,0,.42)' } }}
          >
            Equipo oficial
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

export default EquipoCard;
