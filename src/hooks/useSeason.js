import { useCallback } from 'react';
import { getSeasonRaces } from '../api/jolpica.js';
import { useAsyncResource } from './useAsyncResource.js';

export function useSeason(season = '2026') {
  const load = useCallback((options) => getSeasonRaces(season, options), [season]);
  return useAsyncResource(load, [load]);
}
