const destinations = [
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729, tz: "America/Sao_Paulo" },
  { id: "paris", name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, tz: "Europe/Paris" },
  { id: "london", name: "London", country: "UK", lat: 51.5072, lon: -0.1276, tz: "Europe/London" },
  { id: "dublin", name: "Dublin", country: "Ireland", lat: 53.3498, lon: -6.2603, tz: "Europe/Dublin" },
  { id: "rome", name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, tz: "Europe/Rome" },
  { id: "barcelona", name: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734, tz: "Europe/Madrid" },
  { id: "nyc", name: "New York", country: "USA", lat: 40.7128, lon: -74.0060, tz: "America/New_York" }
];

const placesByCity = {
  paris: {
    rainy: ["Louvre Museum", "Musée d'Orsay", "A cozy café in Saint-Germain"],
    dry: ["Eiffel Tower area", "Luxembourg Garden", "Montmartre walk"]
  },

  rio: {
    rainy: ["Museu do Amanhã", "CCBB Rio", "Confeitaria Colombo"],
    dry: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana / Ipanema"]
  },

  london: {
    rainy: ["British Museum", "National Gallery", "Borough Market"],
    dry: ["Hyde Park", "Notting Hill walk", "South Bank walk"]
  },

  dublin: {
    rainy: ["Trinity College Library", "EPIC Museum", "A local pub lunch"],
    dry: ["St Stephen’s Green", "Temple Bar walk", "Howth cliff walk"]
  },

  rome: {
    rainy: ["Vatican Museums", "Galleria Borghese", "Trattoria dinner"],
    dry: ["Colosseum", "Roman Forum", "Piazza Navona walk"]
  },

  barcelona: {
    rainy: ["Picasso Museum", "La Boqueria", "A café in El Born"],
    dry: ["Park Güell", "Gothic Quarter", "Barceloneta walk"]
  },

  nyc: {
    rainy: ["The Met", "MoMA", "Chelsea Market"],
    dry: ["Central Park", "Brooklyn Bridge", "High Line"]
  }
};