const STORAGE_KEY = "selectedDestinationId";

const testimonials = [
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta corporis consequuntur officiis beatae animi tenetur adipisci odio enim voluptatibus, impedit accusantium quas ab pariatur, illo nam libero eum nulla ad!",
    name: "Gustavo Taveira",
    location: "Dublin, Ireland"
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta corporis consequuntur officiis beatae animi tenetur adipisci odio enim voluptatibus, impedit accusantium quas ab pariatur, illo nam libero eum nulla ad!",
    name: "Gustavo Taveira",
    location: "Rio de Janeiro, Brazil"
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta corporis consequuntur officiis beatae animi tenetur adipisci odio enim voluptatibus, impedit accusantium quas ab pariatur, illo nam libero eum nulla ad!",
    name: "Gustavo Taveira",
    location: "London, UK"
  }
];

const destinationSelect = document.getElementById("destinationSelect");
const planBtn = document.getElementById("planBtn");
const statusEl = document.getElementById("status");

function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

function getSelectedDestination() {
  if (!destinationSelect || !destinationSelect.value) return null;
  return destinations.find(dest => dest.id === destinationSelect.value) || null;
}

function loadDestinations() {
  if (!destinationSelect) return;

  destinations.forEach(dest => {
    const option = document.createElement("option");
    option.value = dest.id;
    option.textContent = `${dest.name}, ${dest.country}`;
    destinationSelect.appendChild(option);
  });
}

let currentIndex = 0;

function initTestimonials() {
  const textEl = document.getElementById("testimonialText");
  const nameEl = document.getElementById("testimonialName");
  const locationEl = document.getElementById("testimonialLocation");
  const dots = document.querySelectorAll(".dot");
  const nextBtn = document.getElementById("nextTestimonial");
  const prevBtn = document.getElementById("prevTestimonial");

  if (!textEl || !nameEl || !locationEl || !nextBtn || !prevBtn) return;

  function updateTestimonial(index) {
    const t = testimonials[index];

    textEl.innerText = `"${t.text}"`;
    nameEl.innerText = t.name;
    locationEl.innerText = t.location;

    dots.forEach(dot => dot.classList.remove("is-active"));
    if (dots[index]) dots[index].classList.add("is-active");
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.dataset.index, 10);
      updateTestimonial(currentIndex);
    });
  });

  updateTestimonial(currentIndex);
}

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

      localStorage.setItem(STORAGE_KEY, dest.id);
      window.location.href = "result.html";
    });
  }
});