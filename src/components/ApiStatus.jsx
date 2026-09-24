import { Alert, Box, Button, Skeleton, Stack, Typography } from '@mui/material';

export function LoadingState({ label, cards = 3 }) {
  return <Box aria-live="polite"><Typography sx={{ color: 'text.secondary', mb: 2 }}>{label}</Typography><Stack spacing={1.5}>{Array.from({ length: cards }, (_, index) => <Skeleton key={index} variant="rounded" height={72} />)}</Stack></Box>;
}

export function ErrorState({ error, onRetry }) {
  return <Alert severity="error" action={<Button color="inherit" size="small" onClick={onRetry}>Reintentar</Button>}>No se han podido cargar los datos. {error?.message}</Alert>;
}
