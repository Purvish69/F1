import { cachedRequest } from '../utils/apiCache.js';

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';
const TTL = { drivers: 10 * 60_000, standings: 5 * 60_000, races: 30 * 60_000, results: 30 * 60_000 };

function unwrap(payload, table) {
  return payload?.MRData?.[table] || payload?.[table] || payload;
}

async function request(path, ttl, force) {
  return cachedRequest(`jolpica:${path}`, ttl, async () => {
    const [resource, search] = path.split('?');
    const response = await fetch(`${BASE_URL}/${resource}.json${search ? `?${search}` : ''}`, { signal: AbortSignal.timeout(12_000) });
    if (!response.ok) throw new Error(`Jolpica respondió ${response.status}`);
    return response.json();
  }, { force });
}

export async function getDrivers(season, options) {
  const data = await request(`${season}/drivers`, TTL.drivers, options?.force);
  return unwrap(data, 'DriverTable').Drivers || [];
}

export async function getConstructors(season, options) {
  const data = await request(`${season}/constructors`, TTL.drivers, options?.force);
  return unwrap(data, 'ConstructorTable').Constructors || [];
}

export async function getRaces(season, options) {
  const data = await request(`${season}/races`, TTL.races, options?.force);
  return unwrap(data, 'RaceTable').Races || [];
}

export async function getResults(season, round, options) {
  const route = round ? `${season}/${round}/results` : `${season}/results?limit=2000`;
  const data = await request(route, TTL.results, options?.force);
  return unwrap(data, 'RaceTable').Races || [];
}

export async function getDriverStandings(season, options) {
  const data = await request(`${season}/driverstandings`, TTL.standings, options?.force);
  return unwrap(data, 'StandingsTable').StandingsLists?.[0]?.DriverStandings || [];
}

export async function getConstructorStandings(season, options) {
  const data = await request(`${season}/constructorstandings`, TTL.standings, options?.force);
  return unwrap(data, 'StandingsTable').StandingsLists?.[0]?.ConstructorStandings || [];
}

export async function getQualifying(season, round, options) {
  const data = await request(`${season}/${round}/qualifying`, TTL.results, options?.force);
  return unwrap(data, 'RaceTable').Races || [];
}

export async function getSprintResults(season, round, options) {
  const data = await request(`${season}/${round}/sprint`, TTL.results, options?.force);
  return unwrap(data, 'RaceTable').Races || [];
}
