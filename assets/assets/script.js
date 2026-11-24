
document.addEventListener("DOMContentLoaded", () => {

    // NAVIGASI MOBILE
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
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

    // TAHUN OTOMATIS
    document.querySelectorAll(".year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // PENGIRIMAN FORMULIR FORMSPREE
    const form = document.getElementById("registrationForm");
    const submitButton = document.getElementById("submitButton");
    const formMessage = document.getElementById("formMessage");
    const successPanel = document.getElementById("successPanel");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!form.reportValidity()) return;

            const originalText = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.textContent = "Mengirim...";
            formMessage.textContent = "";
            formMessage.className = "form-message";

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                const result = await response.json();

                if (!response.ok) {
                    const detail = result.errors
                        ? result.errors.map(error => error.message).join(", ")
                        : "Silakan periksa kembali formulir kamu.";

                    throw new Error(detail);
                }

                // BERHASIL DIKIRIM
                form.hidden = true;

                if (successPanel) {
                    successPanel.hidden = false;
                }

                if (successPanel) {
                    successPanel.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

            } catch (error) {
                console.error("Formspree error:", error);

                formMessage.textContent =
                    "Gagal mengirim pendaftaran. " +
                    (error.message || "Silakan coba kembali.");

                formMessage.classList.add("error");

                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }

});
