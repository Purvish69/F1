import { useCallback, useEffect, useState } from 'react';
import { getSeasonRaces } from '../api/jolpica.js';
import { useAsyncResource } from './useAsyncResource.js';

export function useSeason(season = '2026', { autoRefreshInterval = 60_000 } = {}) {
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  
  const load = useCallback(async (options) => {
    const data = await getSeasonRaces(season, options);
    setLastUpdated(new Date());
    return data;
  }, [season]);

  const resource = useAsyncResource(load, [load]);

  // Periodic automatic sync with official API
  useEffect(() => {
    if (!autoRefreshInterval) return;
    const interval = setInterval(() => {
      resource.refresh(true);
    }, autoRefreshInterval);
    return () => clearInterval(interval);
  }, [autoRefreshInterval, resource.refresh]);

  return { ...resource, lastUpdated };
}
