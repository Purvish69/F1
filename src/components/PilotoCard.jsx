import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';

function Stat({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ lineHeight: 1 }}>{value}</Typography>
    </Box>
  );
}

function PilotoCard({ pilot, team }) {
  const maxPoints = 131;

  return (
    <Card
      component={motion.article}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .45 }}
      sx={{
        borderColor: `${team.color}66`,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow .24s ease, border-color .24s ease',
        '&:hover': {
          borderColor: `${team.color}CC`,
          boxShadow: `0 24px 70px ${team.color}38`,
          '& .driver-photo': { transform: 'translate3d(0,-8px,0) scale(1.04)' },
          '& .driver-glow': { opacity: 1 }
        }
      }}
    >
      <Box
        sx={{
          background:
            `radial-gradient(circle at 82% 18%, rgba(255,255,255,.24), transparent 9rem), linear-gradient(135deg, ${team.color}D8, ${team.color}66 52%, rgba(7,7,9,.92))`,
          minHeight: 286,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          className="driver-glow"
          sx={{
            bgcolor: `${team.color}66`,
            borderRadius: '50%',
            filter: 'blur(52px)',
            height: 180,
            opacity: .55,
            position: 'absolute',
            right: 36,
            top: 40,
            transition: 'opacity .3s ease',
            width: 180
          }}
        />
        <Box
          sx={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 1px, transparent 1px)',
            backgroundSize: '6px 6px',
            inset: 0,
            opacity: .22,
            position: 'absolute'
          }}
        />
        <Typography
          variant="h1"
          sx={{
            color: 'rgba(255,255,255,.12)',
            fontSize: { xs: 150, sm: 170 },
            lineHeight: .8,
            position: 'absolute',
            right: 14,
            top: 18,
            zIndex: 0
          }}
        >
          {pilot.number}
        </Typography>
        <Box
          component="img"
          className="driver-photo"
          src={pilot.image}
          alt={pilot.name}
          loading="lazy"
          sx={{
            bottom: 0,
            height: { xs: 256, sm: 272 },
            objectFit: 'contain',
            objectPosition: 'top center',
            position: 'absolute',
            right: { xs: -4, sm: 18 },
            transition: 'transform .35s cubic-bezier(.2,.8,.2,1)',
            width: { xs: 190, sm: 210 },
            zIndex: 1
          }}
        />
        <Stack spacing={1} sx={{ left: 18, position: 'absolute', top: 18, zIndex: 2 }}>
          <Chip
            label={`P${pilot.position}`}
            sx={{
              bgcolor: 'rgba(255,255,255,.92)',
              color: '#050505',
              fontWeight: 1000,
              minWidth: 86
            }}
          />
          <Chip
            label={`${pilot.flag} ${pilot.nationality}`}
            sx={{ bgcolor: 'rgba(5,5,5,.32)', borderColor: 'rgba(255,255,255,.34)', color: 'common.white' }}
            variant="outlined"
          />
        </Stack>
      </Box>

      <CardContent sx={{ bgcolor: '#111214', p: 2.4 }}>
        {/* Logica de seccion: la ficha mezcla standings, ritmo de temporada y enlace oficial. */}
        <Typography variant="h4" sx={{ lineHeight: .9, textTransform: 'uppercase' }}>{pilot.name}</Typography>
        <Typography sx={{ color: team.color, fontWeight: 900, mt: .5 }}>{pilot.team}</Typography>
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="h3" sx={{ lineHeight: .8 }}>{pilot.points}</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800 }}>PUNTOS</Typography>
            <LinearProgress
              variant="determinate"
              value={(pilot.points / maxPoints) * 100}
              sx={{ bgcolor: 'rgba(255,255,255,.10)', '& .MuiLinearProgress-bar': { bgcolor: team.color } }}
            />
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={1.5}>
          <Grid item xs={4}><Stat label="Wins" value={pilot.wins} /></Grid>
          <Grid item xs={4}><Stat label="Podios" value={pilot.podiums} /></Grid>
          <Grid item xs={4}><Stat label="Poles" value={pilot.poles} /></Grid>
          <Grid item xs={4}><Stat label="Top 10" value={pilot.top10} /></Grid>
          <Grid item xs={4}><Stat label="Sprint pts" value={pilot.sprintPoints} /></Grid>
          <Grid item xs={4}><Stat label="DNF" value={pilot.dnfs} /></Grid>
        </Grid>
        <Button
          fullWidth
          href={`https://www.formula1.com/en/drivers/${pilot.slug}`}
          target="_blank"
          rel="noreferrer"
          endIcon={<OpenInNewIcon />}
          sx={{ color: 'common.white', mt: 2.5, borderColor: `${team.color}88` }}
          variant="outlined"
        >
          Perfil oficial
        </Button>
      </CardContent>
    </Card>
  );
}

export default PilotoCard;
