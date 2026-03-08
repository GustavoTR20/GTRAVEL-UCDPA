const destinationSelect = document.getElementById("destinationSelect");

function loadDestinations() {
  if (!destinationSelect) return;

  destinations.forEach(dest => {
    const option = document.createElement("option");
    option.value = dest.id;
    option.textContent = `${dest.name}, ${dest.country}`;
    destinationSelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {

  loadDestinations();

  if (planBtn) {

    planBtn.addEventListener("click", () => {

      const dest = getSelectedDestination();

      if (!dest) {
        setStatus("Please select a destination first.");
        return;
      }

      localStorage.setItem(STORAGE_KEY, dest.id);

      window.location.href = "result.html";

    });

  }

});

const STORAGE_KEY = "selectedDestinationId";
const planBtn = document.getElementById("planBtn");
const statusEl = document.getElementById("status");

function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

function getSelectedDestination() {
  if (!destinationSelect || !destinationSelect.value) return null;
  return destinations.find(dest => dest.id === destinationSelect.value) || null;
}