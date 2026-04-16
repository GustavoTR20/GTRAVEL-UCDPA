
// This key is used to store the destination selected by the user in localStorage, allowing the results page to display the same destination
const STORAGE_KEY = "selectedDestinationId";

// API link where weather requests are created by providing the destination coordinates and time zone
const apiBase = "https://api.open-meteo.com/v1/forecast";

// An instance of the AbortController used to cancel any previous weather requests, and also to avoid overlapping API calls
let abortController = null;

// A small helper function for retrieving DOM elements by ID, used to maintain access to the DOM 
const $id = (id) => document.getElementById(id);

// Used before re-rendering forecast cards or recommendation lists, clearing all existing content 
function clearList(el) {
  if (el) el.innerHTML = "";
}

// Adds a new item to a specific unordered list element, allowing the list’s rendering to be reused in recommendations and tips
function addItem(ul, text) {
  if (!ul) return;
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("list-group-item");
  ul.appendChild(li);
}

// Formats a numeric temperature value for display
function c(n) {
  return `${Math.round(n)}°C`;
}

// Formats precipitation values in millimetres for UI display
function mm(n) {
  return `${Number(n).toFixed(1)} mm`;
}

// Finds a destination object in the shared destinations dataset using its ID, and returns null if the ID does not match any known destination
function findDestinationById(id) {
  return destinations.find((d) => d.id === id) || null;
}

//Retrieves the selected destination id from localStorage and converts it into the full destination object
function getSelectedDestinationFromStorage() {
  const id = localStorage.getItem(STORAGE_KEY);
  return id ? findDestinationById(id) : null;
}

// Converts a date string from the API into a short weekday label.
function formatDayLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

// Gets weather data from the Open-Meteo API for the selected destination 
// It also returns an error if the request fails or if the API response is incomplete
async function getWeather(dest) {
  const params = new URLSearchParams({
    latitude: String(dest.lat),
    longitude: String(dest.lon),
    timezone: dest.tz,
    current_weather: "true",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum"
  });

  const res = await fetch(`${apiBase}?${params.toString()}`, {
    signal: abortController.signal
  });

  if (!res.ok) throw new Error("Could not fetch weather data.");

  const data = await res.json();
  if (!data?.daily?.time) throw new Error("Weather API returned unexpected data.");

  return data;
}

// Displays the weather summary and daily forecast cards on the results page, using the destination name, a summary of the current day and the forecast for the other days
function renderWeather(dest, data) {
  const weatherSummary = $id("weatherSummary");
  const forecastGrid = $id("forecastGrid");
  const titleEl = $id("resultCityTitle");

  if (!weatherSummary || !forecastGrid || !titleEl) return;

  const days = data.daily.time;
  const tMax = data.daily.temperature_2m_max;
  const tMin = data.daily.temperature_2m_min;
  const rain = data.daily.precipitation_sum;

  titleEl.textContent = dest.name;
  weatherSummary.textContent = `${c(tMin[0])} / ${c(tMax[0])} • Rain ${mm(rain[0] ?? 0)}`;

  clearList(forecastGrid);

  for (let i = 0; i < days.length; i++) {
    const card = document.createElement("div");
    card.className = "forecast-day-card";
    card.innerHTML = `
      <div class="forecast-day-name">${formatDayLabel(days[i])}</div>
      <div class="forecast-day-temp">${c(tMin[i])} / ${c(tMax[i])}</div>
      <div class="forecast-day-rain">${mm(rain[i] ?? 0)}</div>
    `;
    forecastGrid.appendChild(card);
  }
}

// Generates general travel recommendations based on the first day's forecast.
// The algorithm takes into account the amount of rainfall to determine whether outdoor plans are suitable the maximum temperature to suggest clothing and planning tips
function renderRecommendations(dest, data) {
  const recommendationsList = $id("recommendationsList");
  if (!recommendationsList) return;

  const max = data.daily.temperature_2m_max[0];
  const rain = data.daily.precipitation_sum[0] ?? 0;

  clearList(recommendationsList);

  if (rain >= 5) addItem(recommendationsList, "Heavy rain: focus on indoor spots.");
  else if (rain >= 1) addItem(recommendationsList, "Possible rain: bring an umbrella and have a backup plan.");
  else addItem(recommendationsList, "Dry weather: great for outdoor attractions and walking tours.");

  if (max >= 28) addItem(recommendationsList, "Hot day: sunscreen + water, avoid peak sun hours.");
  else if (max <= 10) addItem(recommendationsList, "Cold day: wear layers and plan indoor breaks.");
  else addItem(recommendationsList, "Mild weather: perfect for exploring on foot.");

  addItem(recommendationsList, `Local tip: explore ${dest.name} according to the vibe of the city.`);
}

// The function selects suggestions for indoor or outdoor activities, depending on whether the weather forecast predicts rain for the selected destination
function renderTips(dest, data) {
  const tipsList = $id("tipsList");
  if (!tipsList) return;

  const rain = data.daily.precipitation_sum[0] ?? 0;
  const isRainy = rain >= 1;
  const cityPlaces = placesByCity[dest.id];
  const list = isRainy ? cityPlaces?.rainy : cityPlaces?.dry;

  clearList(tipsList);

  addItem(tipsList, "Check the forecast 24h before your trip to adjust your packing.");
  addItem(tipsList, isRainy ? "Wear shoes that handle wet floors." : "Start early to enjoy the day with fewer crowds.");

  if (Array.isArray(list)) {
    addItem(tipsList, isRainy ? "Good places for a rainy day:" : "Good places for a dry day:");
    list.slice(0, 3).forEach((place) => addItem(tipsList, place));
  }
}

// This function retrieves the selected destination from storage, fetches weather data from the API and renders weather, recommendations, and tips
// It also cancels any previous request before starting a new one.
async function runResultsPage() {
  const dest = getSelectedDestinationFromStorage();
  if (!dest) return;

  try {
    if (abortController) abortController.abort();
    abortController = new AbortController();

    const data = await getWeather(dest);

    renderWeather(dest, data);
    renderRecommendations(dest, data);
    renderTips(dest, data);
  } catch (err) {
    if (err?.name !== "AbortError") console.error(err);
  }
}

// It initializes the results page as soon as the DOM is ready, loading all the dynamic content of the results and also linking the Back button
document.addEventListener("DOMContentLoaded", () => {
  runResultsPage();

  const backBtn = $id("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "index.html#landingPage";
    });
  }
});