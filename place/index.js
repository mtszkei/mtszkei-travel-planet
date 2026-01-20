document.addEventListener("DOMContentLoaded", () => {

    function getPlaceIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    }

    function renderPlaceHeader(place) {
        const container = document.getElementById("place-header");

        container.innerHTML = `
            <div class="place-header">
                <div class="place-title">
                    <span class="place-location">${place.location}</span>
                    <span class="place-summary">${place.summary}</span>
                </div>
                <div class="place-cover-wrapper">
                    <img class="place-cover" src="${place.pictures.cover}" alt="${place.country}-${place.location}">
                </div>
            </div>
    `;
    }

    function renderPlaceBar(place) {
        const container = document.getElementById("place-bar");

        container.innerHTML = `
            <div class="place-bar">
                    <span>${place.location}, ${place.country}</span>
                    <a href="https://www.trip.com/" target="_blank" rel="noopener">START THIS TRIP</a>
            </div>
        `;
    }

    function renderPlaceCarousel(place) {
        const container = document.getElementById("place-carousel");

        const images = place.pictures.wrappers;
        const slidesHTML = [
            images[images.length - 1],
            ...images,
            images[0]
        ]
            .map(src => `<img src="${src}" class="slide" />`)
            .join("");

        container.innerHTML = `
                <div class="carousel">
                    <div class="carousel-viewport">
                        <div class="carousel-track">
                            ${slidesHTML}
                        </div>
                    </div>

                    <div class="controls">
                        <button id="prev">←PREV</button>
                        <button id="next">NEXT→</button>
                    </div>
                </div>
    `;
        initCarousel()
    }

    function renderPlaceOverview(place) {
        const container = document.getElementById("place-content");

        const itineraryHTML = place.itinerary
            .map((text, index) => `
        <p>
            ${text}
        </p>
    `)
            .join("");

        const highlightsHTML = place.highlights
            .map(item => `
        <div class="highlight-item">
            <span>${item.title}</span>
            <p>${item.description}</p>
        </div>
    `)
            .join("");

        container.innerHTML = `
            <div class="place-side">
                <img class="place-side-img" src="${place.pictures.side}" alt="${place.country}-${place.location}">
            </div>
            <div>
                <div class="overview">
                    OVERVIEW
                </div>
                <div class="overview-content">
                    ${itineraryHTML}
                </div>
                <div class="highlights">
                    Highlights
                </div>
                <div class="highlights-content">
                    ${highlightsHTML}
                </div>
            </div>
    `;
    }

    function renderPlaceVideo(place) {
        const container = document.getElementById("place-video");

        container.innerHTML = `
        <div class="place-video">
            <div class="video-wrapper">
                <iframe
                    src="${place.video}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    }

    function initCarousel() {
        const track = document.querySelector(".carousel-track");
        const slides = document.querySelectorAll(".slide");
        const prevBtn = document.getElementById("prev");
        const nextBtn = document.getElementById("next");

        let isAnimating = false;

        if (!track || slides.length === 0) return;

        let currentIndex = 1;
        updateCarousel();
        const totalSlides = slides.length;

        function updateCarousel() {
            const slideWidth = slides[0].getBoundingClientRect().width + 28;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        nextBtn.addEventListener("click", () => {
            if (isAnimating) return;
            isAnimating = true;

            if (currentIndex === totalSlides - 2) {
                track.style.transition = "none";
                currentIndex = totalSlides - 1;
                updateCarousel();

                track.offsetHeight;

                track.style.transition = "transform 0.4s ease";
                currentIndex = 1;
                updateCarousel();

                setTimeout(() => {
                    isAnimating = false;
                }, 400);

            } else {
                currentIndex++;
                updateCarousel();

                setTimeout(() => {
                    isAnimating = false;
                }, 400);
            }
        });

        prevBtn.addEventListener("click", () => {
            if (isAnimating) return;
            isAnimating = true;

            currentIndex--;
            updateCarousel();

            if (currentIndex === 0) {
                setTimeout(() => {
                    track.style.transition = "none";
                    currentIndex = totalSlides - 2;
                    updateCarousel();

                    track.offsetHeight;
                    track.style.transition = "transform 0.4s ease";
                    isAnimating = false;
                }, 400);
            } else {
                setTimeout(() => {
                    isAnimating = false;
                }, 400);
            }
        });
    }

    async function loadPlaceDetail() {
        const placeId = getPlaceIdFromURL();

        const res = await fetch("/src/data/place.json");
        const places = await res.json();

        const place = places.find(p => p.id === placeId);

        if (!place) {
            window.location.href = "/place.html";
            return;
        }

        renderPlaceHeader(place);
        renderPlaceBar(place);
        renderPlaceCarousel(place);
        renderPlaceOverview(place);
        renderPlaceVideo(place);
    }

    getPlaceIdFromURL()
    loadPlaceDetail();
});