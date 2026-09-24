import { useCallback } from 'react';
import * as openF1 from '../api/openf1.js';
import { useAsyncResource } from './useAsyncResource.js';

const asNumber = (value) => String(value || '');
const highResolution = (url) => url?.replace('/1col/', '/12col/') || url;

export function useDriverPhotos(drivers, season = '2026') {
  const load = useCallback(async () => {
    if (!drivers.length) return {};

    const sessions = await openF1.getSessions({ year: season, session_name: 'Race' });
    const latestCompletedRace = sessions
      .filter((session) => new Date(session.date_end) <= new Date())
      .sort((a, b) => new Date(b.date_end) - new Date(a.date_end))[0];
    if (!latestCompletedRace) return {};

    const sessionDrivers = await openF1.getDrivers(latestCompletedRace.session_key);
    const photos = Object.fromEntries(sessionDrivers
      .filter((driver) => driver.headshot_url)
      .map((driver) => [asNumber(driver.driver_number), highResolution(driver.headshot_url)]));

    const missing = drivers.filter((driver) => !photos[asNumber(driver.number)] && driver.number !== '—');
    const history = await Promise.all(missing.map((driver) => openF1.getDriverHistory(driver.number)));
    history.forEach((entries, index) => {
      const photo = highResolution(entries.find((entry) => entry.headshot_url)?.headshot_url);
      if (photo) photos[asNumber(missing[index].number)] = photo;
    });
    return photos;
  }, [drivers, season]);

  return useAsyncResource(load, [load]);
}
