async function loadLayout(id, file) {
    try {
        const res = await fetch(file);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    } catch (err) {
        console.error(`Failed to load ${file}`, err);
    }
}

async function initLayout() {

    await loadLayout('header', '/layout/header.html');
    await loadLayout('footer', '/layout/footer.html');

    const toggleBtn = document.querySelector(".nav-toggle");
    const navBar = document.querySelector(".main-navbar");

    if (toggleBtn && navBar) {
        toggleBtn.addEventListener("click", () => {
            navBar.classList.toggle("active");
        });
    }
}

initLayout();