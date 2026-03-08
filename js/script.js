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
});