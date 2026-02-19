
import { Activity, CabinInfo, InventoryItem, Therapy } from './types';

export const COMPLEX_INFO: CabinInfo = {
  wifiSSID: "Posada✨",
  wifiPass: "posadadenono",
  checkoutTime: "10:00 AM",
  emergencyPhone: "+54 9 3544 123456",
  managerPhone: "+54 9 3544 654321",
  cleaningService: "A partir de las 11:00 AM"
};

export const BOOKS_CATALOG: InventoryItem[] = [
  { id: 'b1', title: 'Historias de Traslasierra', authorOrType: 'Guido Buffo', available: true },
  { id: 'b2', title: 'Rayuela', authorOrType: 'Julio Cortázar', available: true },
  { id: 'b3', title: 'Guía de Aves de Córdoba', authorOrType: 'Ecoval', available: true },
  { id: 'b4', title: 'El Principito', authorOrType: 'Antoine de Saint-Exupéry', available: true },
  { id: 'b5', title: 'Cuentos de la Selva', authorOrType: 'Horacio Quiroga', available: true },
  { id: 'b6', title: 'El Señor de los Anillos', authorOrType: 'J.R.R. Tolkien', available: false }, // Example of unavailable
];

export const GAMES_CATALOG: InventoryItem[] = [
  { id: 'g1', title: 'Jenga XXL', authorOrType: 'Habilidad', available: true },
  { id: 'g2', title: 'Cartas Españolas', authorOrType: 'Naipes', available: true },
  { id: 'g3', title: 'Uno', authorOrType: 'Cartas', available: true },
  { id: 'g4', title: 'TEG', authorOrType: 'Estrategia', available: true },
  { id: 'g5', title: 'Ajedrez', authorOrType: 'Estrategia', available: true },
  { id: 'g6', title: 'Burako', authorOrType: 'Fichas', available: true },
];

export const MASSAGE_MENU: Therapy[] = [
  {
    id: 'm1',
    title: 'Sesión de Masajes y Relax',
    duration: '50 - 60 min',
    description: 'Disfruta de una experiencia renovadora en la comodidad de nuestro espacio Wellness. Ofrecemos masajes descontracturantes, relajantes, piedras calientes y reflexología. Consultanos para personalizar tu sesión.'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'service-1',
    title: 'Cajero Automático Bancor',
    description: 'Cajero Red Link disponible las 24hs frente a la plaza.',
    fullDescription: 'Ubicado estratégicamente frente a la Plaza San Martín. Es el principal punto de extracción de efectivo en el pueblo. Suele tener mayor demanda los fines de semana por la noche.',
    tips: ['Intentar ir por la mañana para asegurar disponibilidad de billetes.', 'Acepta todas las tarjetas Red Link y Banelco.'],
    openingHours: '24 Horas',
    category: 'services',
    location: 'Plaza de Nono',
    address: 'Sarmiento y San Martín, Nono, Córdoba',
    distance: '5 min',
  },
  {
    id: 'service-2',
    title: 'YPF Nono',
    description: 'Combustible, lubricantes y tienda Full sobre la ruta.',
    fullDescription: 'Estación de servicio completa ubicada sobre la Ruta Provincial 14. Cuenta con tienda Full para café y snacks, baños limpios y servicio de playa las 24hs.',
    tips: ['Ideal para cargar antes de subir a las Altas Cumbres.', 'El café de la tienda tiene buena vista a las sierras.'],
    openingHours: '24 Horas',
    category: 'services',
    location: 'Ruta 14 - Acceso Nono',
    address: 'Ruta Provincial 14 km 100, Nono, Córdoba',
    distance: '10 min',
  },
  {
    id: 'service-3',
    title: 'Supermercado El Hongo',
    description: 'El mercado más completo para tus provisiones diarias.',
    fullDescription: 'Supermercado tradicional de Nono con amplia variedad de productos: carnicería, verdulería, panadería y artículos de limpieza. Ideal para hacer compras grandes para la estadía en la cabaña.',
    tips: ['Tienen pan casero fresco a las 10am.', 'Aceptan tarjetas de débito y crédito.', 'Cuenta con estacionamiento propio.'],
    openingHours: '08:30 AM - 01:00 PM, 05:00 PM - 09:00 PM',
    category: 'services',
    location: 'Av. Los Porteños',
    address: 'Av. Los Porteños 345, Nono, Córdoba',
    distance: '6 min',
  },
  {
    id: '1',
    title: 'Balneario Los Remansos',
    description: 'Pozas profundas de agua cristalina y formaciones rocosas únicas sobre el Río de los Sauces.',
    fullDescription: 'Es uno de los balnearios más bellos de Nono. El río aquí forma ollas naturales ideales para nadar. El entorno de piedras rosadas y agua templada lo hace perfecto para pasar el día entero. Cuenta con proveeduría y asadores en temporada.',
    tips: ['Llevar calzado de agua para las piedras.', 'Ir temprano (antes de las 11am) para conseguir buen lugar.', 'El agua es mansa, ideal para nadar.'],
    openingHours: 'Abierto todo el día (Diurno)',
    category: 'nature',
    location: 'Río de los Sauces',
    address: 'Balneario Los Remansos, Nono, Córdoba',
    distance: '8 min',
    isRecommended: true
  },
  {
    id: '2',
    title: 'Museo Rocsen',
    description: 'Un viaje en el tiempo con más de 60.000 piezas de todas las disciplinas.',
    fullDescription: 'Fundado por Juan Santiago Bouchon, este museo polifacético es Patrimonio de la Humanidad. Su fachada con 49 estatuas es icónica. En su interior encontrarás desde momias y autos antiguos hasta una colección impresionante de minerales y objetos de la vida cotidiana de todas las épocas.',
    tips: ['Calculá al menos 2 horas para el recorrido.', 'La cafetería del museo tiene excelente repostería.', 'Abierto los 365 días del año.'],
    openingHours: '09:00 AM - 07:00 PM',
    category: 'culture',
    location: 'A 5km de Nono',
    address: 'Museo Rocsen, Nono, Córdoba',
    distance: '12 min',
    isRecommended: true
  },
  {
    id: '3',
    title: 'Paso de las Tropas',
    description: 'Paisaje serrano virgen con ollas naturales y cascadas pequeñas.',
    fullDescription: 'Ubicado sobre el río Chico, es un lugar más agreste y tranquilo que el centro. Sus aguas son cristalinas y hay zonas profundas para saltar. El nombre viene de la historia, ya que por aquí pasaban las tropas unitarias y federales.',
    tips: ['El camino de acceso es de tierra, ir despacio.', 'No hay mucha señal de celular, ideal para desconectar.', 'Llevar repelente.'],
    openingHours: 'Abierto todo el día',
    category: 'nature',
    location: 'Río Chico',
    address: 'Paso de las Tropas, Nono, Córdoba',
    distance: '15 min',
  },
  {
    id: '4',
    title: 'Laberinto de Nono',
    description: 'Desafío divertido con vistas panorámicas a las sierras.',
    fullDescription: 'Uno de los laberintos más grandes de la zona, construido con tuyas. Además del laberinto principal, el complejo cuenta con juegos para niños, una confitería con vistas increíbles a los cerros y otros laberintos de colores para los más pequeños.',
    tips: ['Ideal para ir al atardecer y ver la puesta de sol.', 'Apto para todas las edades.', 'Consultar precio de entrada actualizado.'],
    openingHours: '10:00 AM - 08:30 PM',
    category: 'adventure',
    location: 'Las Calles',
    address: 'Laberinto de Nono, Córdoba',
    distance: '10 min',
  },
  {
    id: '5',
    title: 'Feria de Artesanías',
    description: 'El corazón cultural del pueblo alrededor de la plaza.',
    fullDescription: 'La feria de Nono es famosa por la calidad de sus artesanos. No encontrarás reventa, solo productores locales: cerámica negra, tejidos en telar, madera tallada y dulces caseros. Es el paseo nocturno obligado.',
    tips: ['Funciona principalmente por la tarde/noche.', 'Prueba los alfajores de maicena locales.', 'A veces hay música en vivo en la plaza.'],
    openingHours: '18:00 PM - 11:00 PM',
    category: 'culture',
    location: 'Plaza de Nono',
    address: 'Plaza San Martín, Nono, Córdoba',
    distance: '5 min',
  },
  {
    id: '6',
    title: 'La Pulpería de Nono',
    description: 'Sabores tradicionales en un ambiente histórico.',
    fullDescription: 'Un clásico gastronómico. Ofrece platos abundantes y caseros. Sus milanesas son legendarias y las pastas son amasadas en el momento. El ambiente es rústico y cálido, típico de una pulpería serrana.',
    tips: ['Suele llenarse, ir temprano o reservar.', 'Las porciones son para compartir.', 'Pedir el vino de la casa.'],
    openingHours: '12:00 PM - 03:00 PM, 08:00 PM - 12:00 AM',
    category: 'food',
    location: 'Centro',
    address: 'La Pulpería, Nono, Córdoba',
    distance: '6 min',
    isRecommended: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todo' },
  { id: 'nature', label: 'Naturaleza' },
  { id: 'food', label: 'Gastronomía' },
  { id: 'services', label: 'Servicios' },
  { id: 'adventure', label: 'Aventura' },
  { id: 'culture', label: 'Cultura' },
  { id: 'relax', label: 'Relax' },
];
