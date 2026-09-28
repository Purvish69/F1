import { useCallback } from 'react';
import * as jolpica from '../api/jolpica.js';
import { useAsyncResource } from './useAsyncResource.js';

const flagFor = (nationality) => {
  const flags = { Australian: '🇦🇺', Austrian: '🇦🇹', British: '🇬🇧', Canadian: '🇨🇦', Dutch: '🇳🇱', Finnish: '🇫🇮', French: '🇫🇷', German: '🇩🇪', Italian: '🇮🇹', Japanese: '🇯🇵', Mexican: '🇲🇽', Monegasque: '🇲🇨', New_Zealander: '🇳🇿', Spanish: '🇪🇸', Thai: '🇹🇭', Brazilian: '🇧🇷', Argentine: '🇦🇷' };
  return flags[nationality] || '🏁';
};

export function useChampionship(season = '2026') {
  const load = useCallback(async (options) => {
    const [drivers, constructors, races, driverStandings, constructorStandings] = await Promise.all([
      jolpica.getDrivers(season, options), jolpica.getConstructors(season, options), jolpica.getRaces(season, options),
      jolpica.getDriverStandings(season, options), jolpica.getConstructorStandings(season, options)
    ]);
    const driverById = Object.fromEntries(drivers.map((driver) => [driver.driverId, driver]));
    const constructorById = Object.fromEntries(constructors.map((constructor) => [constructor.constructorId, constructor]));
    const normalizedDrivers = driverStandings.map((standing) => {
        const driver = driverById[standing.Driver.driverId] || standing.Driver;
        const constructor = standing.Constructors?.[0];
        return { id: driver.driverId, slug: driver.driverId, name: `${driver.givenName} ${driver.familyName}`, short: driver.code || driver.driverId.slice(0, 3).toUpperCase(), number: driver.permanentNumber || '—', nationality: driver.nationality, flag: flagFor(driver.nationality), position: Number(standing.position), points: Number(standing.points), wins: Number(standing.wins || 0), team: constructor?.name || 'Sin equipo', teamSlug: constructor?.constructorId || 'unknown' };
      });
    const pointsFor = (...names) => normalizedDrivers.filter((driver) => names.includes(driver.name)).reduce((total, driver) => total + driver.points, 0);
    const teamPointOverrides = {
      red_bull: pointsFor('Max Verstappen', 'Isack Hadjar'),
      rb: pointsFor('Liam Lawson', 'Arvid Lindblad')
    };

    return {
      drivers: normalizedDrivers,
      teams: constructorStandings.map((standing) => {
        const constructor = constructorById[standing.Constructor.constructorId] || standing.Constructor;
        return { slug: constructor.constructorId, name: constructor.name, position: Number(standing.position), points: teamPointOverrides[constructor.constructorId] ?? Number(standing.points), wins: Number(standing.wins || 0) };
      }),
      races
    };
  }, [season]);
  return useAsyncResource(load, [load]);
}

export function useResults(season = '2026') {
  const load = useCallback((options) => jolpica.getResults(season, undefined, options), [season]);
  return useAsyncResource(load, [load]);
}
