document.addEventListener("DOMContentLoaded", () => {

  let allPlaces = [];

  async function productFilterTroggle() {
    const toggle = document.getElementById('filter-toggle');
    const group = document.getElementById('filter-group');

    group.classList.add('collapsed');
    toggle.textContent = '- Continent Filter -';

    toggle.addEventListener('click', () => {
      group.classList.toggle('collapsed');

      if (group.classList.contains('collapsed')) {
        toggle.textContent = '— Continent Filter —';
      } else {
        toggle.textContent = '▼ Continent Filter ▼';
      }
    });
  }

  async function loadPlaceCards() {
    try {
      const res = await fetch("/src/data/place.json");
      if (!res.ok) throw new Error("Failed to load place.json");

      allPlaces = await res.json();

      renderPlaceCards(allPlaces);

    } catch (err) {
      console.error("Error loading place cards:", err);
    }
  }

  function renderPlaceCards(places) {
    const cardList = document.querySelector(".card-list");
    cardList.innerHTML = "";

    places.forEach(place => {
      const cardHTML = `
        <a class="card" href="/place/index.html?id=${place.id}">
          <div class="image-container">
            <img
              src="${place.pictures.side}"
              alt="${place.country} ${place.location}"
            />
          </div>
          <span class="location">${place.location}</span>
          <span class="country">${place.country}</span>
        </a>
      `;
      cardList.insertAdjacentHTML("beforeend", cardHTML);
    });
  }

  function setupContinentFilter() {
    const checkboxes = document.querySelectorAll('input[name="continent"]');

    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const selected = Array.from(checkboxes)
          .filter(c => c.checked)
          .map(c => c.value);

        const filtered =
          selected.length === 0
            ? allPlaces
            : allPlaces.filter(place =>
              selected.includes(place.continent)
            );

        renderPlaceCards(filtered);
      });
    });
  }

  loadPlaceCards();
  productFilterTroggle();
  setupContinentFilter();
})
