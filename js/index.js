const promoteImage = [
    'src/images/promote/promote-1.png',
    'src/images/promote/promote-2.png',
    'src/images/promote/promote-3.png'
]

let currentIndex = 0;

const img = document.getElementById('promote-image');
const prevBtn = document.querySelector('.btn.prev');
const nextBtn = document.querySelector('.btn.next');

function getRandomPlaces(array, count) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

let allPlaces = [];

async function loadPlaceCard() {
    try {
        const res = await fetch("/src/data/place.json");
        if (!res.ok) throw new Error("Failed to load place.json");

        allPlaces = await res.json();

        renderRandomPlaces();
    } catch (err) {
        console.error("Error loading place cards:", err);
    }
}

function renderRandomPlaces() {
    const selectedPlaces = getRandomPlaces(allPlaces, 3);

    const cardList = document.querySelector(".card-list");
    cardList.innerHTML = "";

    selectedPlaces.forEach(place => {
        const cardHTML = `
      <div class="card">
        <div class="image-container">
          <img src="${place.pictures.cover}" alt="${place.country}" />
        </div>
        <p class="location">${place.location},</p>
        <p class="country">${place.country}</p>
        <p class="subtitle">${place.subtitle}</p>
        <a href="/place/index.html?id=${place.id}">
          <button>Visit Now →</button>
        </a>
      </div>
    `;
        cardList.insertAdjacentHTML("beforeend", cardHTML);
    });
}

loadPlaceCard();

function goNext() {
    img.style.transform = 'translateX(-100%)';

    setTimeout(() => {
        currentIndex++;
        if (currentIndex >= promoteImage.length) {
            currentIndex = 0;
        }

        img.src = promoteImage[currentIndex];

        img.style.transition = 'none';
        img.style.transform = 'translateX(100%)';

        img.offsetHeight;

        img.style.transition = 'transform 0.4s ease';
        img.style.transform = 'translateX(0)';
    }, 600)
}

function goPrev() {
    img.style.transform = 'translateX(100%)';

    setTimeout(() => {

        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = promoteImage.length - 1;
        }

        img.src = promoteImage[currentIndex];

        img.style.transition = 'none';
        img.style.transform = 'translateX(-100%)';

        img.offsetHeight;

        img.style.transition = 'transform 0.4s ease';
        img.style.transform = 'translateX(0)';

    }, 600)
}

let autoPlay = setInterval(goNext, 6000);

function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(goNext, 6000);
}

nextBtn.addEventListener('click', () => {
    resetAutoPlay();
    goNext();
});

prevBtn.addEventListener('click', () => {
    resetAutoPlay();
    goPrev();
});
