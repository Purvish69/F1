const mediaBase = 'https://media.formula1.com/image/upload';

const teamSlug = { 'red_bull': 'redbullracing', 'rb': 'racingbulls', 'aston_martin': 'astonmartin', 'sauber': 'audi' };
const teamColors = { mercedes: '#00D2BE', ferrari: '#DC0000', mclaren: '#FF8000', red_bull: '#1E41FF', rb: '#6692FF', alpine: '#0090FF', haas: '#B6BABD', williams: '#005AFF', aston_martin: '#006F62', sauber: '#BB0A21', cadillac: '#CC0033' };

// OpenF1 supplies these Formula 1 CDN portrait paths. They use the 12-column driver portrait variant (3392px) instead of the 1-column d driver portrait
// variant (1336px) because the API's 1-column variant is only 93px wide, which is too small for our needs. The 12-column variant is 3392px wide, which is much more suitable for our use case.
const driverPortraits = {
  '1': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/12col/image.png',
  '3': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/12col/image.png',
  '5': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp',
  '6': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp',
  '10': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/12col/image.png',
  '11': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp',
  '12': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/ANDANT01_Kimi_Antonelli/andant01.png.transform/12col/image.png',
  '14': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/12col/image.png',
  '16': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/12col/image.png',
  '18': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/12col/image.png',
  '22': 'https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/12col/image.png',
  '23': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp',
  '27': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/audi/nichul01/2026audinichul01right.webp',
  '30': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01right.webp',
  '31': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/12col/image.png',
  '41': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp',
  '43': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/12col/image.png',
  '44': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/12col/image.png',
  '55': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp',
  '63': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/12col/image.png',
  '77': 'https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/cadillac/valbot01/2026cadillacvalbot01right.webp',
  '81': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/12col/image.png',
  '87': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/12col/image.png'
};

export function getTeamVisual(constructorId) {
  const slug = teamSlug[constructorId] || constructorId;
  return {
    color: teamColors[constructorId] || '#E8002D',
    car: `${mediaBase}/c_lfill%2Cw_3392/q_auto/v1740000001/common/f1/2026/${slug}/2026${slug}carright.webp`,
    fullName: '', base: 'Información no disponible en Jolpica', engine: '—', chassis: '—', chief: '—', drivers: []
  };
}

export function getDriverVisual(teamId, driverId) {
  const slug = teamSlug[teamId] || teamId;
  return `${mediaBase}/c_fill%2Cw_720/q_auto/v1740000001/common/f1/2026/${slug}/${driverId}/2026${slug}${driverId}right.webp`;
}

export function getDriverPortrait(driverNumber, teamId, driverId) {
  const number = String(driverNumber);
  return Object.hasOwn(driverPortraits, number) ? driverPortraits[number] : getDriverVisual(teamId, driverId);
}
