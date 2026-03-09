const STORAGE_KEY = "selectedDestinationId";
const apiBase = "https://api.open-meteo.com/v1/forecast";

let abortController = null;

const $id = (id) => document.getElementById(id);

function clearList(el) {
  if (el) el.innerHTML = "";
}

function addItem(ul, text) {
  if (!ul) return;
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("list-group-item");
  ul.appendChild(li);
}

function c(n) {
  return `${Math.round(n)}°C`;
}

function mm(n) {
  return `${Number(n).toFixed(1)} mm`;
}

function findDestinationById(id) {
  return destinations.find((d) => d.id === id) || null;
}

function getSelectedDestinationFromStorage() {
  const id = localStorage.getItem(STORAGE_KEY);
  return id ? findDestinationById(id) : null;
}

function formatDayLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

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