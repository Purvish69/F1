import { cachedRequest } from '../utils/apiCache.js';

const BASE_URL = 'https://api.openf1.org/v1';
const HISTORICAL_TTL = 30 * 60_000;

function query(params = {}) {
  return new URLSearchParams(Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')).toString();
}

async function request(endpoint, params, options) {
  const search = query(params);
  const key = `openf1:${endpoint}?${search}`;
  return cachedRequest(key, HISTORICAL_TTL, async () => {
    const response = await fetch(`${BASE_URL}/${endpoint}${search ? `?${search}` : ''}`, { signal: AbortSignal.timeout(12_000) });
    if (!response.ok) throw new Error(`OpenF1 respondió ${response.status}`);
    return response.json();
  }, options);
}

export const getMeetings = (params, options) => request('meetings', params, options);
export const getSessions = (params, options) => request('sessions', params, options);
export const getDrivers = (sessionKey, options) => request('drivers', { session_key: sessionKey }, options);
export const getDriverHistory = (driverNumber, options) => request('drivers', { driver_number: driverNumber }, options);
export const getLaps = (sessionKey, driverNumber, options) => request('laps', { session_key: sessionKey, driver_number: driverNumber }, options);
export const getCarData = (sessionKey, driverNumber, options) => request('car_data', { session_key: sessionKey, driver_number: driverNumber }, options);
export const getPosition = (sessionKey, driverNumber, options) => request('position', { session_key: sessionKey, driver_number: driverNumber }, options);
export const getIntervals = (sessionKey, options) => request('intervals', { session_key: sessionKey }, options);
export const getStints = (sessionKey, driverNumber, options) => request('stints', { session_key: sessionKey, driver_number: driverNumber }, options);
export const getPitStops = (sessionKey, options) => request('pit', { session_key: sessionKey }, options);
export const getWeather = (sessionKey, options) => request('weather', { session_key: sessionKey }, options);
export const getRaceControl = (sessionKey, options) => request('race_control', { session_key: sessionKey }, options);
