document.addEventListener("DOMContentLoaded", () => {

    async function loadStories() {
        try {
            const res = await fetch("/src/data/story.json");
            if (!res.ok) throw new Error("Failed to load story.json");

            allStories = await res.json();

            renderStoryList(allStories);

        } catch (err) {
            console.error("Error loading place cards:", err);
        }
    }

    function renderStoryList(stories) {
        
        const container = document.getElementById("random-recommend-story");
        if (!container || !stories || stories.length === 0) return;

        container.innerHTML = stories.map(story => `
        <a 
            class="recommend-story-card"
            href="${story.path}"
            target="_blank"
            rel="noopener"
        >
            <img src="${story.cover}" alt="${story.title}">
            <div class="recommend-story-title">
                <div class="story-title">${story.title}</div>
                <div class="story-author">${story.author}</div>
            </div>
        </a>
    `).join("");
    }

    loadStories()

})