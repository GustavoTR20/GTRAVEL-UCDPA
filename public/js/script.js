// A key used to store the selected destination in localStorage, allowing the selected city to be accessed later on the results page
const STORAGE_KEY = "selectedDestinationId";

// Data used to populate the reviews section, where each item represents a user review displayed dynamically on the user interface
const testimonials = [
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
    name: "Gustavo Taveira",
    location: "Dublin, Ireland"
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
    name: "Gustavo Taveira",
    location: "Rio de Janeiro, Brazil"
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
    name: "Gustavo Taveira",
    location: "London, UK"
  }
];

const destinationSelect = document.getElementById("destinationSelect");
const planBtn = document.getElementById("planBtn");
const statusEl = document.getElementById("status");

// function designed to update the status message displayed below the search bar 
function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

// Retrieves the currently selected destination from the drop-down list, thereby associating the selected value with the corresponding object in the shared destinations dataset
// Returns the selected destination object or null if no destination is selected
function getSelectedDestination() {
  if (!destinationSelect || !destinationSelect.value) return null;
  return destinations.find(dest => dest.id === destinationSelect.value) || null;
}

// This function reads the dataset of destinations (data.js) and creates option elements for each available city.
function loadDestinations() {
  if (!destinationSelect) return;

  destinations.forEach(dest => {
    const option = document.createElement("option");
    option.value = dest.id;
    option.textContent = `${dest.name}, ${dest.country}`;
    destinationSelect.appendChild(option);
  });
}

// Tracks the current testimonial index displayed in the UI
let currentIndex = 0;

// Initialises the testimonial slider component
//This function is designed to update the testimonial content dynamically, controls navigation to the next/previous page, and also synchronises the activity indicators
function initTestimonials() {
  const textEl = document.getElementById("testimonialText");
  const nameEl = document.getElementById("testimonialName");
  const locationEl = document.getElementById("testimonialLocation");
  const dots = document.querySelectorAll(".dot");
  const nextBtn = document.getElementById("nextTestimonial");
  const prevBtn = document.getElementById("prevTestimonial");

  if (!textEl || !nameEl || !locationEl || !nextBtn || !prevBtn) return;

  // Updates the content of the testimonial based on the current index and also updates the active status of the navigation points
  function updateTestimonial(index) {
    const t = testimonials[index];

    textEl.innerText = `"${t.text}"`;
    nameEl.innerText = t.name;
    locationEl.innerText = t.location;

    dots.forEach(dot => dot.classList.remove("is-active"));
    if (dots[index]) dots[index].classList.add("is-active");
  }

  // Controls navigation to the next testimonial and uses the module to return to the top
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex);
  });

  //  Handles navigation to the previous testimonial and ensures that the index is updated correctly upon returning
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentIndex);
  });

  // Allows users to jump directly to a testimonial using the dots

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.dataset.index, 10);
      updateTestimonial(currentIndex);
    });
  });

  // Initialize first testimonial
  updateTestimonial(currentIndex);
}

// Initialises the homepage features once the DOM has fully loaded, including loading the destination options, initialising the testimonial slider, and handling clicks on the search button
document.addEventListener("DOMContentLoaded", () => {
  loadDestinations();
  initTestimonials();

  if (planBtn) {
    planBtn.addEventListener("click", () => {
      const dest = getSelectedDestination();

      if (!dest) {
        setStatus("Please select a destination first.");
        return;
      }

// Stores the selected destination id in localStorage and redirects the user to the results page
      localStorage.setItem(STORAGE_KEY, dest.id);
      window.location.href = "result.html";
    });
  }
});