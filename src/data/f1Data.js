export const navLinks = [
  { label: 'Historia', href: '#historia' },
  { label: 'Pilotos', href: '#pilotos' },
  { label: 'Equipos', href: '#equipos' },
  { label: 'Galería', href: '#galeria' }
];

export const timeline = [
  {
    year: '1950',
    title: 'Primer Gran Premio del Mundo',
    description: 'Silverstone recibe el inicio del Campeonato Mundial moderno en Gran Bretaña.'
  },
  {
    year: '1958',
    title: 'Nace el Campeonato de Constructores',
    description: 'Las escuderías se convierten en protagonistas de una batalla técnica permanente.'
  },
  {
    year: '1976',
    title: 'Lauda vs Hunt',
    description: 'Una batalla épica entre precisión, riesgo y una rivalidad que definió una era.'
  },
  {
    year: '1984',
    title: 'La era turbo',
    description: 'Senna, Prost y McLaren dominan una década brutal de potencia y control.'
  },
  {
    year: '1994',
    title: 'Imola marca al deporte',
    description: 'La trágica pérdida de Ayrton Senna cambia para siempre la seguridad en F1.'
  },
  {
    year: '2000',
    title: 'Dinastía Ferrari',
    description: 'Michael Schumacher inicia una secuencia histórica de títulos con Maranello.'
  },
  {
    year: '2008',
    title: 'Último giro en Brasil',
    description: 'Lewis Hamilton conquista el campeonato en una definición imposible de olvidar.'
  },
  {
    year: '2014',
    title: 'Era híbrida',
    description: 'Mercedes redefine la Fórmula 1 con eficiencia eléctrica y dominio absoluto.'
  },
  {
    year: '2021',
    title: 'Abu Dabi',
    description: 'La noche más polémica del deporte abre una nueva rivalidad moderna.'
  },
  {
    year: '2023',
    title: 'Verstappen récord',
    description: 'Max Verstappen firma 19 victorias en una sola temporada de control total.'
  },
  {
    year: '2026',
    title: 'Nueva era',
    description: 'Motores 50/50 eléctrico-combustión, 12 equipos, Audi y Cadillac debutan.'
  }
];

export const teams = [
  {
    slug: 'ferrari',
    team: 'Ferrari',
    pilot1: 'Charles Leclerc',
    num1: 16,
    flag1: '🇲🇨',
    country1: 'Mónaco',
    pilot2: 'Lewis Hamilton',
    num2: 44,
    flag2: '🇬🇧',
    country2: 'Reino Unido',
    color: '#DC0000',
    accent: '#FFF200',
    engine: 'Ferrari V6',
    principal: 'Frédéric Vasseur',
    base: 'Maranello Italia',
    titles: '16',
    stats: { speed: 94, reliability: 88, aero: 91 }
  },
  {
    slug: 'mclaren',
    team: 'McLaren',
    pilot1: 'Lando Norris',
    num1: 4,
    flag1: '🇬🇧',
    country1: 'Reino Unido',
    pilot2: 'Oscar Piastri',
    num2: 81,
    flag2: '🇦🇺',
    country2: 'Australia',
    color: '#FF8000',
    accent: '#0090D0',
    engine: 'Mercedes V6',
    principal: 'Andrea Stella',
    base: 'Woking Reino Unido',
    titles: '8',
    stats: { speed: 92, reliability: 90, aero: 95 }
  },
  {
    slug: 'mercedes',
    team: 'Mercedes',
    pilot1: 'George Russell',
    num1: 63,
    flag1: '🇬🇧',
    country1: 'Reino Unido',
    pilot2: 'Kimi Antonelli',
    num2: 12,
    flag2: '🇮🇹',
    country2: 'Italia',
    color: '#00D2BE',
    accent: '#C0C0C0',
    engine: 'Mercedes V6',
    principal: 'Toto Wolff',
    base: 'Brackley Reino Unido',
    titles: '9',
    stats: { speed: 90, reliability: 92, aero: 89 }
  },
  {
    slug: 'red-bull',
    team: 'Red Bull Racing',
    shortTeam: 'Red Bull',
    pilot1: 'Max Verstappen',
    num1: 1,
    flag1: '🇳🇱',
    country1: 'Países Bajos',
    pilot2: 'Isack Hadjar',
    num2: 6,
    flag2: '🇫🇷',
    country2: 'Francia',
    color: '#1E41FF',
    accent: '#CC1E4A',
    engine: 'Ford V6',
    principal: 'Christian Horner',
    base: 'Milton Keynes RU',
    titles: '6',
    stats: { speed: 96, reliability: 86, aero: 94 }
  },
  {
    slug: 'aston-martin',
    team: 'Aston Martin',
    pilot1: 'Fernando Alonso',
    num1: 14,
    flag1: '🇪🇸',
    country1: 'España',
    pilot2: 'Lance Stroll',
    num2: 18,
    flag2: '🇨🇦',
    country2: 'Canadá',
    color: '#006F62',
    accent: '#CEDC00',
    engine: 'Honda V6',
    principal: 'Andy Cowell',
    base: 'Silverstone RU',
    titles: '0',
    stats: { speed: 87, reliability: 84, aero: 90 }
  },
  {
    slug: 'williams',
    team: 'Williams',
    pilot1: 'Carlos Sainz',
    num1: 55,
    flag1: '🇪🇸',
    country1: 'España',
    pilot2: 'Alex Albon',
    num2: 23,
    flag2: '🇹🇭',
    country2: 'Tailandia',
    color: '#005AFF',
    accent: '#FFFFFF',
    engine: 'Mercedes V6',
    principal: 'James Vowles',
    base: 'Grove Reino Unido',
    titles: '7',
    stats: { speed: 88, reliability: 82, aero: 86 }
  },
  {
    slug: 'alpine',
    team: 'Alpine',
    pilot1: 'Pierre Gasly',
    num1: 10,
    flag1: '🇫🇷',
    country1: 'Francia',
    pilot2: 'Franco Colapinto',
    num2: 43,
    flag2: '🇦🇷',
    country2: 'Argentina',
    color: '#0090FF',
    accent: '#FF0000',
    engine: 'Renault V6',
    principal: 'Oliver Oakes',
    base: 'Enstone Reino Unido',
    titles: '2',
    stats: { speed: 85, reliability: 80, aero: 84 }
  },
  {
    slug: 'audi',
    team: 'Audi',
    pilot1: 'Nico Hülkenberg',
    num1: 27,
    flag1: '🇩🇪',
    country1: 'Alemania',
    pilot2: 'Gabriel Bortoleto',
    num2: 5,
    flag2: '🇧🇷',
    country2: 'Brasil',
    color: '#BB0A21',
    accent: '#C0C0C0',
    engine: 'Audi V6',
    principal: 'Mattia Binotto',
    base: 'Hinwil Suiza',
    titles: '0 (debut)',
    stats: { speed: 89, reliability: 78, aero: 83 }
  },
  {
    slug: 'haas',
    team: 'Haas',
    pilot1: 'Esteban Ocon',
    num1: 31,
    flag1: '🇫🇷',
    country1: 'Francia',
    pilot2: 'Oliver Bearman',
    num2: 87,
    flag2: '🇬🇧',
    country2: 'Reino Unido',
    color: '#B6BABD',
    accent: '#E8002D',
    engine: 'Ferrari V6',
    principal: 'Ayao Komatsu',
    base: 'Kannapolis EEUU',
    titles: '0',
    stats: { speed: 82, reliability: 79, aero: 76 }
  },
  {
    slug: 'racing-bulls',
    team: 'Racing Bulls (RB)',
    shortTeam: 'Racing Bulls',
    pilot1: 'Liam Lawson',
    num1: 30,
    flag1: '🇳🇿',
    country1: 'Nueva Zelanda',
    pilot2: 'Arvid Lindblad',
    num2: 21,
    flag2: '🇬🇧',
    country2: 'Reino Unido',
    color: '#1E41FF',
    accent: '#FFFFFF',
    engine: 'Honda V6',
    principal: 'Laurent Mekies',
    base: 'Faenza Italia',
    titles: '0',
    stats: { speed: 84, reliability: 77, aero: 81 }
  },
  {
    slug: 'cadillac',
    team: 'Cadillac',
    pilot1: 'Sergio Pérez',
    num1: 11,
    flag1: '🇲🇽',
    country1: 'México',
    pilot2: 'Valtteri Bottas',
    num2: 77,
    flag2: '🇫🇮',
    country2: 'Finlandia',
    color: '#CC0033',
    accent: '#FFFFFF',
    engine: 'GM V6',
    principal: 'Graeme Lowdon',
    base: 'Concord EEUU',
    titles: '0 (debut)',
    stats: { speed: 86, reliability: 75, aero: 79 }
  }
];

export const pilots = teams.flatMap((team) => [
  {
    name: team.pilot1,
    number: team.num1,
    flag: team.flag1,
    country: team.country1,
    team: team.team,
    slug: team.slug,
    color: team.color
  },
  {
    name: team.pilot2,
    number: team.num2,
    flag: team.flag2,
    country: team.country2,
    team: team.team,
    slug: team.slug,
    color: team.color
  }
]);

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1541773367361-3f84baa8e4e7?w=1200&q=80',
    caption: 'Carga aerodinámica'
  },
  {
    src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80',
    caption: 'Recta principal'
  },
  {
    src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80',
    caption: 'Máquina nocturna'
  },
  {
    src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    caption: 'Garaje bajo presión'
  },
  {
    src: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200&q=80',
    caption: 'Velocidad urbana'
  },
  {
    src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
    caption: 'Línea roja'
  },
  {
    src: 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=1200&q=80',
    caption: 'Asfalto caliente'
  },
  {
    src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80',
    caption: 'Ritual de salida'
  },
  {
    src: 'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?w=1200&q=80',
    caption: 'Reflejo de paddock'
  },
  {
    src: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200&q=80',
    caption: 'Circuito infinito'
  },
  {
    src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80',
    caption: 'Ataque de curva'
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    caption: 'Podio en la mira'
  }
];
