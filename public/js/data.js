// This is a list of available destinations used throughout the application, with each object representing a city, containing the following factors 
// id: a unique identifier used for selection and logic
// name: the city name displayed in the user interface
// country: the destination’s country
// lat / lon: geographical coordinates used to retrieve weather data from the API
// tz: the time zone used for accurate time-based calculations

// This data is mainly used in the script.js file to be used to fill the drop-down menu, and also in result.js to fetch weather data for the selected destination
const destinations = [
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729, tz: "America/Sao_Paulo" },
  { id: "paris", name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, tz: "Europe/Paris" },
  { id: "london", name: "London", country: "UK", lat: 51.5072, lon: -0.1276, tz: "Europe/London" },
  { id: "dublin", name: "Dublin", country: "Ireland", lat: 53.3498, lon: -6.2603, tz: "Europe/Dublin" },
  { id: "rome", name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, tz: "Europe/Rome" },
  { id: "barcelona", name: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734, tz: "Europe/Madrid" },
  { id: "nyc", name: "New York", country: "USA", lat: 40.7128, lon: -74.0060, tz: "America/New_York" }
];

// Recommendation dataset based on weather conditions

// This object maps each city (by id) to two categories:
// rainy: indoor activities recommended for bad weather
// dry: outdoor activities recommended for good weather

// This structure is used in result.js to generate personalized travel suggestions depending on the current weather
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