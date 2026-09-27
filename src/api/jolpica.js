import { cachedRequest } from '../utils/apiCache.js';

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';
// Bump this whenever the shape/logic of a cached response changes, so any
// stale entry left in sessionStorage from a previous version is ignored
// instead of being served forever until its TTL expires naturally.
const CACHE_VERSION = 'v2';
const TTL = { drivers: 10 * 60_000, standings: 5 * 60_000, races: 30 * 60_000, results: 5 * 60_000 };
const SEASON_RACES_TTL = 60 * 60_000;

function unwrap(payload, table) {
  return payload?.MRData?.[table] || payload?.[table] || payload;
}

function cacheKey(key) {
  return `${CACHE_VERSION}:${key}`;
}

async function request(path, ttl, force) {
  return cachedRequest(cacheKey(`jolpica:${path}`), ttl, async () => {
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
  if (round) {
    const data = await request(`${season}/${round}/results`, TTL.results, options?.force);
    return unwrap(data, 'RaceTable').Races || [];
  }

  return cachedRequest(cacheKey(`jolpica:${season}:all-results`), TTL.results, async () => {
    let offset = 0;
    const limit = 100;
    const allRaceBlocks = [];

    while (true) {
      const route = `${season}/results?limit=${limit}&offset=${offset}`;
      const data = await request(route, TTL.results, options?.force);
      const mr = data?.MRData;
      const races = mr?.RaceTable?.Races || [];
      allRaceBlocks.push(...races);

      const total = Number(mr?.total || 0);
      offset += limit;
      if (offset >= total || races.length === 0) break;
    }

    const raceMap = new Map();
    for (const race of allRaceBlocks) {
      const key = String(race.round);
      if (!raceMap.has(key)) {
        raceMap.set(key, {
          ...race,
          Results: [...(race.Results || [])]
        });
      } else {
        const existing = raceMap.get(key);
        const existingDriverIds = new Set(existing.Results.map((r) => r.Driver.driverId));
        for (const res of race.Results || []) {
          if (!existingDriverIds.has(res.Driver.driverId)) {
            existing.Results.push(res);
            existingDriverIds.add(res.Driver.driverId);
          }
        }
      }
    }

    return Array.from(raceMap.values());
  }, { force: options?.force });
}

export async function getSeasonRaces(season, options) {
  return cachedRequest(cacheKey(`jolpica:${season}:season-races`), TTL.results, async () => {
    const [schedule, results] = await Promise.all([
      getRaces(season, options),
      getResults(season, undefined, options)
    ]);
    const resultsByRound = Object.fromEntries(results.map((race) => [String(race.round), race]));

    return schedule.map((race) => {
      const completedRace = resultsByRound[String(race.round)];
      const raceResults = completedRace?.Results || [];
      const winner = raceResults[0];
      const fastestLap = raceResults.find((r) => r.FastestLap?.rank === '1');

      const podium = raceResults.slice(0, 3).map((res) => ({
        pos: Number(res.position),
        name: `${res.Driver.givenName} ${res.Driver.familyName}`,
        code: res.Driver.code || res.Driver.familyName.slice(0, 3).toUpperCase(),
        number: res.Driver.permanentNumber || res.number,
        driverId: res.Driver.driverId,
        team: res.Constructor.name,
        teamSlug: res.Constructor.constructorId,
        points: Number(res.points),
        time: res.Time?.time || res.status
      }));

      const top10 = raceResults.slice(0, 10).map((res) => ({
        pos: Number(res.position),
        name: `${res.Driver.givenName} ${res.Driver.familyName}`,
        code: res.Driver.code || res.Driver.familyName.slice(0, 3).toUpperCase(),
        number: res.Driver.permanentNumber || res.number,
        driverId: res.Driver.driverId,
        team: res.Constructor.name,
        teamSlug: res.Constructor.constructorId,
        points: Number(res.points),
        time: res.Time?.time || res.status,
        grid: res.grid,
        laps: res.laps,
        fastestLap: res.FastestLap?.Time?.time
      }));

      return {
        round: Number(race.round),
        grandPrix: race.raceName,
        date: race.date,
        time: race.time || '',
        circuit: {
          id: race.Circuit?.circuitId,
          name: race.Circuit?.circuitName,
          locality: race.Circuit?.Location?.locality,
          country: race.Circuit?.Location?.country
        },
        hasResults: Boolean(winner),
        winner: winner ? `${winner.Driver.givenName} ${winner.Driver.familyName}` : '—',
        winnerNumber: winner?.Driver.permanentNumber || winner?.number,
        winnerDriverId: winner?.Driver.driverId,
        code: winner?.Driver.code || (winner ? winner.Driver.familyName.slice(0, 3).toUpperCase() : '—'),
        team: winner?.Constructor.name || '—',
        teamSlug: winner?.Constructor.constructorId || 'unknown',
        laps: winner?.laps || '—',
        raceTime: winner?.Time?.time || '—',
        fastestLap: fastestLap ? {
          driver: `${fastestLap.Driver.givenName} ${fastestLap.Driver.familyName}`,
          time: fastestLap.FastestLap.Time.time,
          lap: fastestLap.FastestLap.lap
        } : null,
        podium,
        top10
      };
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, { force: options?.force });
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