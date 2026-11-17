const form = document.getElementById("registrationForm");

if (form) {

    const button = document.getElementById("submitButton");
    const message = document.getElementById("formMessage");
    const successPanel = document.getElementById("successPanel");

    // EMAIL TUJUAN
    const destinationEmail = "erdivabp24@gmail.com";

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        message.textContent = "";

        // VALIDASI FORMULIR
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const originalText = button.innerHTML;

        button.disabled = true;
        button.textContent = "Mengirim data...";

        // MENGAMBIL DATA FORMULIR
        const data = Object.fromEntries(
            new FormData(form).entries()
        );

        delete data._honey;

        data._subject = "Pendaftaran Baru - BloomForm";

        try {

            // MENGIRIM DATA KE FORMSUBMIT
            const response = await fetch(
                https://formsubmit.co/ajax/${destinationEmail},
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (
                !response.ok ||
                result.success === "false" ||
                result.success === false
            ) {
                throw new Error(
                    result.message || "Pengiriman belum berhasil."
                );
            }

            // TAMPILAN JIKA BERHASIL
            form.hidden = true;
            successPanel.hidden = false;

        } catch (error) {

            // TAMPILAN JIKA GAGAL
            message.textContent =
                "Maaf, data belum berhasil dikirim. " +
                "Periksa koneksi internet dan coba lagi. " +
                error.message;

            button.disabled = false;
            button.innerHTML = originalText;

        }

    });

}
