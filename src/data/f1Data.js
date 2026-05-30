const mediaBase = 'https://media.formula1.com/image/upload';

const driverImage = (teamSlug, code) =>
  `${mediaBase}/c_fill%2Cw_720/q_auto/v1740000001/common/f1/2026/${teamSlug}/${code}/2026${teamSlug}${code}right.webp`;

const carImage = (teamSlug) =>
  `${mediaBase}/c_lfill%2Cw_3392/q_auto/v1740000001/common/f1/2026/${teamSlug}/2026${teamSlug}carright.webp`;

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Pilotos', href: '#pilotos' },
  { label: 'Equipos', href: '#equipos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Galería', href: '#galeria' }
];

export const sourceLinks = {
  drivers: 'https://www.formula1.com/en/drivers',
  teams: 'https://www.formula1.com/en/teams',
  results: 'https://www.formula1.com/en/results/2026/races',
  driverStandings: 'https://www.formula1.com/en/results/2026/drivers',
  teamStandings: 'https://www.formula1.com/en/results/2026/team'
};

export const raceResults = [
  { round: 1, grandPrix: 'Australia', date: '08 Mar', winner: 'George Russell', code: 'RUS', team: 'Mercedes', laps: 58, time: '1:23:06.801' },
  { round: 2, grandPrix: 'China', date: '15 Mar', winner: 'Kimi Antonelli', code: 'ANT', team: 'Mercedes', laps: 56, time: '1:33:15.607' },
  { round: 3, grandPrix: 'Japan', date: '29 Mar', winner: 'Kimi Antonelli', code: 'ANT', team: 'Mercedes', laps: 53, time: '1:28:03.403' },
  { round: 4, grandPrix: 'Miami', date: '03 May', winner: 'Kimi Antonelli', code: 'ANT', team: 'Mercedes', laps: 57, time: '1:33:19.273' },
  { round: 5, grandPrix: 'Canada', date: '24 May', winner: 'Kimi Antonelli', code: 'ANT', team: 'Mercedes', laps: 68, time: '1:28:15.758' }
];

export const drivers = [
  { id: 'andant01', slug: 'kimi-antonelli', name: 'Kimi Antonelli', short: 'ANT', number: 12, team: 'Mercedes', teamSlug: 'mercedes', nationality: 'Italy', flag: '🇮🇹', position: 1, points: 131, races: 5, gpPoints: 118, wins: 4, podiums: 5, poles: 3, top10: 5, fastestLaps: 0, dnfs: 0, sprintPoints: 13, careerPoints: 281, championships: 0, image: driverImage('mercedes', 'andant01') },
  { id: 'georus01', slug: 'george-russell', name: 'George Russell', short: 'RUS', number: 63, team: 'Mercedes', teamSlug: 'mercedes', nationality: 'Great Britain', flag: '🇬🇧', position: 2, points: 88, races: 5, gpPoints: 67, wins: 1, podiums: 2, poles: 2, top10: 4, fastestLaps: 0, dnfs: 1, sprintPoints: 21, careerPoints: 1049, championships: 0, image: driverImage('mercedes', 'georus01') },
  { id: 'chalec01', slug: 'charles-leclerc', name: 'Charles Leclerc', short: 'LEC', number: 16, team: 'Ferrari', teamSlug: 'ferrari', nationality: 'Monaco', flag: '🇲🇨', position: 3, points: 75, races: 5, gpPoints: 65, wins: 0, podiums: 3, poles: 0, top10: 5, fastestLaps: 1, dnfs: 0, sprintPoints: 10, careerPoints: 1581, championships: 0, image: driverImage('ferrari', 'chalec01') },
  { id: 'lewham01', slug: 'lewis-hamilton', name: 'Lewis Hamilton', short: 'HAM', number: 44, team: 'Ferrari', teamSlug: 'ferrari', nationality: 'Great Britain', flag: '🇬🇧', position: 4, points: 72, races: 5, gpPoints: 61, wins: 0, podiums: 2, poles: 0, top10: 5, fastestLaps: 0, dnfs: 0, sprintPoints: 11, careerPoints: 5060.5, championships: 7, image: driverImage('ferrari', 'lewham01') },
  { id: 'lannor01', slug: 'lando-norris', name: 'Lando Norris', short: 'NOR', number: 4, team: 'McLaren', teamSlug: 'mclaren', nationality: 'Great Britain', flag: '🇬🇧', position: 5, points: 58, races: 5, gpPoints: 49, wins: 0, podiums: 2, poles: 0, top10: 5, fastestLaps: 1, dnfs: 0, sprintPoints: 9, careerPoints: 1165, championships: 0, image: driverImage('mclaren', 'lannor01') },
  { id: 'oscpia01', slug: 'oscar-piastri', name: 'Oscar Piastri', short: 'PIA', number: 81, team: 'McLaren', teamSlug: 'mclaren', nationality: 'Australia', flag: '🇦🇺', position: 6, points: 48, races: 5, gpPoints: 40, wins: 0, podiums: 1, poles: 0, top10: 5, fastestLaps: 0, dnfs: 0, sprintPoints: 8, careerPoints: 814, championships: 0, image: driverImage('mclaren', 'oscpia01') },
  { id: 'maxver01', slug: 'max-verstappen', name: 'Max Verstappen', short: 'VER', number: 3, team: 'Red Bull Racing', teamSlug: 'redbullracing', nationality: 'Netherlands', flag: '🇳🇱', position: 7, points: 43, races: 5, gpPoints: 37, wins: 0, podiums: 1, poles: 0, top10: 4, fastestLaps: 1, dnfs: 1, sprintPoints: 6, careerPoints: 3487.5, championships: 4, image: driverImage('redbullracing', 'maxver01') },
  { id: 'piegas01', slug: 'pierre-gasly', name: 'Pierre Gasly', short: 'GAS', number: 10, team: 'Alpine', teamSlug: 'alpine', nationality: 'France', flag: '🇫🇷', position: 8, points: 20, races: 5, gpPoints: 17, wins: 0, podiums: 0, poles: 0, top10: 3, fastestLaps: 0, dnfs: 0, sprintPoints: 3, careerPoints: 476, championships: 0, image: driverImage('alpine', 'piegas01') },
  { id: 'olibea01', slug: 'oliver-bearman', name: 'Oliver Bearman', short: 'BEA', number: 87, team: 'Haas F1 Team', teamSlug: 'haas', nationality: 'Great Britain', flag: '🇬🇧', position: 9, points: 18, races: 5, gpPoints: 15, wins: 0, podiums: 0, poles: 0, top10: 3, fastestLaps: 0, dnfs: 0, sprintPoints: 3, careerPoints: 59, championships: 0, image: driverImage('haas', 'olibea01') },
  { id: 'lialaw01', slug: 'liam-lawson', name: 'Liam Lawson', short: 'LAW', number: 30, team: 'Racing Bulls', teamSlug: 'racingbulls', nationality: 'New Zealand', flag: '🇳🇿', position: 10, points: 16, races: 5, gpPoints: 12, wins: 0, podiums: 0, poles: 0, top10: 3, fastestLaps: 0, dnfs: 0, sprintPoints: 4, careerPoints: 50, championships: 0, image: driverImage('racingbulls', 'lialaw01') },
  { id: 'fracol01', slug: 'franco-colapinto', name: 'Franco Colapinto', short: 'COL', number: 43, team: 'Alpine', teamSlug: 'alpine', nationality: 'Argentina', flag: '🇦🇷', position: 11, points: 15, races: 5, gpPoints: 13, wins: 0, podiums: 0, poles: 0, top10: 2, fastestLaps: 0, dnfs: 0, sprintPoints: 2, careerPoints: 31, championships: 0, image: driverImage('alpine', 'fracol01') },
  { id: 'isahad01', slug: 'isack-hadjar', name: 'Isack Hadjar', short: 'HAD', number: 6, team: 'Red Bull Racing', teamSlug: 'redbullracing', nationality: 'France', flag: '🇫🇷', position: 12, points: 14, races: 5, gpPoints: 12, wins: 0, podiums: 0, poles: 0, top10: 2, fastestLaps: 0, dnfs: 0, sprintPoints: 2, careerPoints: 81, championships: 0, image: driverImage('redbullracing', 'isahad01') },
  { id: 'carsai01', slug: 'carlos-sainz', name: 'Carlos Sainz', short: 'SAI', number: 55, team: 'Williams', teamSlug: 'williams', nationality: 'Spain', flag: '🇪🇸', position: 13, points: 6, races: 5, gpPoints: 5, wins: 0, podiums: 0, poles: 0, top10: 1, fastestLaps: 0, dnfs: 0, sprintPoints: 1, careerPoints: 1303.5, championships: 0, image: driverImage('williams', 'carsai01') },
  { id: 'arvlin01', slug: 'arvid-lindblad', name: 'Arvid Lindblad', short: 'LIN', number: 21, team: 'Racing Bulls', teamSlug: 'racingbulls', nationality: 'Great Britain', flag: '🇬🇧', position: 14, points: 5, races: 5, gpPoints: 4, wins: 0, podiums: 0, poles: 0, top10: 1, fastestLaps: 0, dnfs: 0, sprintPoints: 1, careerPoints: 5, championships: 0, image: driverImage('racingbulls', 'arvlin01') },
  { id: 'gabbor01', slug: 'gabriel-bortoleto', name: 'Gabriel Bortoleto', short: 'BOR', number: 5, team: 'Audi', teamSlug: 'audi', nationality: 'Brazil', flag: '🇧🇷', position: 15, points: 2, races: 5, gpPoints: 2, wins: 0, podiums: 0, poles: 0, top10: 1, fastestLaps: 0, dnfs: 0, sprintPoints: 0, careerPoints: 8, championships: 0, image: driverImage('audi', 'gabbor01') },
  { id: 'estoco01', slug: 'esteban-ocon', name: 'Esteban Ocon', short: 'OCO', number: 31, team: 'Haas F1 Team', teamSlug: 'haas', nationality: 'France', flag: '🇫🇷', position: 16, points: 1, races: 5, gpPoints: 1, wins: 0, podiums: 0, poles: 0, top10: 1, fastestLaps: 0, dnfs: 0, sprintPoints: 0, careerPoints: 475, championships: 0, image: driverImage('haas', 'estoco01') },
  { id: 'alealb01', slug: 'alexander-albon', name: 'Alexander Albon', short: 'ALB', number: 23, team: 'Williams', teamSlug: 'williams', nationality: 'Thailand', flag: '🇹🇭', position: 17, points: 1, races: 5, gpPoints: 1, wins: 0, podiums: 0, poles: 0, top10: 1, fastestLaps: 0, dnfs: 0, sprintPoints: 0, careerPoints: 263, championships: 0, image: driverImage('williams', 'alealb01') },
  { id: 'nichul01', slug: 'nico-hulkenberg', name: 'Nico Hulkenberg', short: 'HUL', number: 27, team: 'Audi', teamSlug: 'audi', nationality: 'Germany', flag: '🇩🇪', position: 18, points: 0, races: 5, gpPoints: 0, wins: 0, podiums: 0, poles: 0, top10: 0, fastestLaps: 0, dnfs: 1, sprintPoints: 0, careerPoints: 622, championships: 0, image: driverImage('audi', 'nichul01') },
  { id: 'valbot01', slug: 'valtteri-bottas', name: 'Valtteri Bottas', short: 'BOT', number: 77, team: 'Cadillac', teamSlug: 'cadillac', nationality: 'Finland', flag: '🇫🇮', position: 19, points: 0, races: 5, gpPoints: 0, wins: 0, podiums: 0, poles: 0, top10: 0, fastestLaps: 0, dnfs: 0, sprintPoints: 0, careerPoints: 1797, championships: 0, image: driverImage('cadillac', 'valbot01') },
  { id: 'serper01', slug: 'sergio-perez', name: 'Sergio Perez', short: 'PER', number: 11, team: 'Cadillac', teamSlug: 'cadillac', nationality: 'Mexico', flag: '🇲🇽', position: 20, points: 0, races: 5, gpPoints: 0, wins: 0, podiums: 0, poles: 0, top10: 0, fastestLaps: 0, dnfs: 1, sprintPoints: 0, careerPoints: 1638, championships: 0, image: driverImage('cadillac', 'serper01') },
  { id: 'lanstr01', slug: 'lance-stroll', name: 'Lance Stroll', short: 'STR', number: 18, team: 'Aston Martin', teamSlug: 'astonmartin', nationality: 'Canada', flag: '🇨🇦', position: 21, points: 0, races: 5, gpPoints: 0, wins: 0, podiums: 0, poles: 0, top10: 0, fastestLaps: 0, dnfs: 0, sprintPoints: 0, careerPoints: 302, championships: 0, image: driverImage('astonmartin', 'lanstr01') },
  { id: 'feralo01', slug: 'fernando-alonso', name: 'Fernando Alonso', short: 'ALO', number: 14, team: 'Aston Martin', teamSlug: 'astonmartin', nationality: 'Spain', flag: '🇪🇸', position: 22, points: 0, races: 5, gpPoints: 0, wins: 0, podiums: 0, poles: 0, top10: 0, fastestLaps: 0, dnfs: 1, sprintPoints: 0, careerPoints: 2337, championships: 2, image: driverImage('astonmartin', 'feralo01') }
];

export const teams = [
  { slug: 'mercedes', name: 'Mercedes', fullName: 'Mercedes-AMG PETRONAS Formula One Team', color: '#00D2BE', secondary: '#111827', position: 1, points: 219, wins: 5, podiums: 7, poles: 5, top10: 9, dnfs: 1, sprintPoints: 34, engine: 'Mercedes', chassis: 'W17', base: 'Brackley, United Kingdom', chief: 'Toto Wolff', technical: 'James Allison', reserve: 'Fred Vesti', firstEntry: 1970, championships: 8, car: carImage('mercedes'), drivers: ['George Russell', 'Kimi Antonelli'] },
  { slug: 'ferrari', name: 'Ferrari', fullName: 'Scuderia Ferrari HP', color: '#DC0000', secondary: '#FFD700', position: 2, points: 147, wins: 0, podiums: 5, poles: 0, top10: 10, dnfs: 0, sprintPoints: 21, engine: 'Ferrari', chassis: 'SF-26', base: 'Maranello, Italy', chief: 'Frédéric Vasseur', technical: 'Loïc Serra', reserve: 'Antonio Giovinazzi', firstEntry: 1950, championships: 16, car: carImage('ferrari'), drivers: ['Charles Leclerc', 'Lewis Hamilton'] },
  { slug: 'mclaren', name: 'McLaren', fullName: 'McLaren Formula 1 Team', color: '#FF8000', secondary: '#0090D0', position: 3, points: 106, wins: 0, podiums: 3, poles: 0, top10: 10, dnfs: 0, sprintPoints: 17, engine: 'Mercedes', chassis: 'MCL40', base: 'Woking, United Kingdom', chief: 'Andrea Stella', technical: 'Peter Prodromou', reserve: 'Pato O’Ward', firstEntry: 1966, championships: 9, car: carImage('mclaren'), drivers: ['Lando Norris', 'Oscar Piastri'] },
  { slug: 'redbullracing', name: 'Red Bull Racing', fullName: 'Oracle Red Bull Racing', color: '#1E41FF', secondary: '#FCD700', position: 4, points: 57, wins: 0, podiums: 1, poles: 0, top10: 6, dnfs: 2, sprintPoints: 8, engine: 'Ford', chassis: 'RB22', base: 'Milton Keynes, United Kingdom', chief: 'Christian Horner', technical: 'Pierre Waché', reserve: 'Ayumu Iwasa', firstEntry: 2005, championships: 6, car: carImage('redbullracing'), drivers: ['Max Verstappen', 'Isack Hadjar'] },
  { slug: 'alpine', name: 'Alpine', fullName: 'BWT Alpine Formula One Team', color: '#0090FF', secondary: '#FF87BC', position: 5, points: 35, wins: 0, podiums: 0, poles: 0, top10: 5, dnfs: 0, sprintPoints: 5, engine: 'Renault', chassis: 'A526', base: 'Enstone, United Kingdom', chief: 'Oliver Oakes', technical: 'David Sanchez', reserve: 'Paul Aron', firstEntry: 1986, championships: 2, car: carImage('alpine'), drivers: ['Pierre Gasly', 'Franco Colapinto'] },
  { slug: 'racingbulls', name: 'Racing Bulls', fullName: 'Visa Cash App Racing Bulls F1 Team', color: '#6692FF', secondary: '#FFFFFF', position: 6, points: 21, wins: 0, podiums: 0, poles: 0, top10: 4, dnfs: 0, sprintPoints: 5, engine: 'Honda RBPT', chassis: 'VCARB 03', base: 'Faenza, Italy', chief: 'Laurent Mekies', technical: 'Jody Egginton', reserve: 'Iwasa / Crawford', firstEntry: 1985, championships: 0, car: carImage('racingbulls'), drivers: ['Liam Lawson', 'Arvid Lindblad'] },
  { slug: 'haas', name: 'Haas F1 Team', fullName: 'MoneyGram Haas F1 Team', color: '#B6BABD', secondary: '#E8002D', position: 7, points: 19, wins: 0, podiums: 0, poles: 0, top10: 4, dnfs: 0, sprintPoints: 3, engine: 'Ferrari', chassis: 'VF-26', base: 'Kannapolis, United States', chief: 'Ayao Komatsu', technical: 'Andrea De Zordo', reserve: 'Pietro Fittipaldi', firstEntry: 2016, championships: 0, car: carImage('haas'), drivers: ['Esteban Ocon', 'Oliver Bearman'] },
  { slug: 'williams', name: 'Williams', fullName: 'Atlassian Williams Racing', color: '#005AFF', secondary: '#FFFFFF', position: 8, points: 7, wins: 0, podiums: 0, poles: 0, top10: 2, dnfs: 0, sprintPoints: 1, engine: 'Mercedes', chassis: 'FW48', base: 'Grove, United Kingdom', chief: 'James Vowles', technical: 'Pat Fry', reserve: 'Luke Browning', firstEntry: 1978, championships: 9, car: carImage('williams'), drivers: ['Carlos Sainz', 'Alexander Albon'] },
  { slug: 'audi', name: 'Audi', fullName: 'Audi F1 Team', color: '#BB0A21', secondary: '#C0C0C0', position: 9, points: 2, wins: 0, podiums: 0, poles: 0, top10: 1, dnfs: 1, sprintPoints: 0, engine: 'Audi', chassis: 'R26', base: 'Hinwil, Switzerland', chief: 'Mattia Binotto', technical: 'James Key', reserve: 'Theo Pourchaire', firstEntry: 2026, championships: 0, car: carImage('audi'), drivers: ['Nico Hulkenberg', 'Gabriel Bortoleto'] },
  { slug: 'cadillac', name: 'Cadillac', fullName: 'Cadillac Formula 1 Team', color: '#CC0033', secondary: '#D7D2C7', position: 10, points: 0, wins: 0, podiums: 0, poles: 0, top10: 0, dnfs: 1, sprintPoints: 0, engine: 'Ferrari', chassis: 'MAC-26', base: 'Concord, United States', chief: 'Graeme Lowdon', technical: 'Pat Symonds', reserve: 'TBC', firstEntry: 2026, championships: 0, car: carImage('cadillac'), drivers: ['Sergio Perez', 'Valtteri Bottas'] },
  { slug: 'astonmartin', name: 'Aston Martin', fullName: 'Aston Martin Aramco Formula One Team', color: '#006F62', secondary: '#CEDC00', position: 11, points: 0, wins: 0, podiums: 0, poles: 0, top10: 0, dnfs: 1, sprintPoints: 0, engine: 'Honda', chassis: 'AMR26', base: 'Silverstone, United Kingdom', chief: 'Andy Cowell', technical: 'Adrian Newey', reserve: 'Felipe Drugovich', firstEntry: 2018, championships: 0, car: carImage('astonmartin'), drivers: ['Fernando Alonso', 'Lance Stroll'] }
];

export const seasonKpis = [
  { label: 'Carreras disputadas', value: '5', detail: 'Calendario 2026 activo' },
  { label: 'Líder pilotos', value: 'Antonelli', detail: '131 puntos' },
  { label: 'Líder equipos', value: 'Mercedes', detail: '219 puntos' },
  { label: 'Último ganador', value: 'Antonelli', detail: 'GP de Canadá' }
];

export const galleryImages = [
  { src: carImage('mercedes'), caption: 'Mercedes W17' },
  { src: carImage('ferrari'), caption: 'Ferrari SF-26' },
  { src: carImage('mclaren'), caption: 'McLaren MCL40' },
  { src: carImage('redbullracing'), caption: 'Red Bull RB22' },
  { src: driverImage('mercedes', 'andant01'), caption: 'Kimi Antonelli' },
  { src: driverImage('ferrari', 'lewham01'), caption: 'Lewis Hamilton' },
  { src: driverImage('mclaren', 'lannor01'), caption: 'Lando Norris' },
  { src: driverImage('redbullracing', 'maxver01'), caption: 'Max Verstappen' }
];
