document.addEventListener("DOMContentLoaded", () => {

    // NAVIGASI MOBILE
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.textContent = isOpen ? "×" : "☰";
        });
    }

    // DARK MODE DAN LIGHT MODE
    const themeButton = document.querySelector(".theme-toggle");

    const savedTheme = localStorage.getItem("bloomform-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    if (themeButton) {

        themeButton.textContent =
            document.body.classList.contains("dark") ? "☾" : "☼";

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const dark = document.body.classList.contains("dark");

            localStorage.setItem(
                "bloomform-theme",
                dark ? "dark" : "light"
            );

            themeButton.textContent = dark ? "☾" : "☼";
        });
    }

    // TAHUN OTOMATIS PADA FOOTER
    document.querySelectorAll(".year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

});
