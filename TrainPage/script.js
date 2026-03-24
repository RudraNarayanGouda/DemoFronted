// ==========================
// SELECT ELEMENTS
// ==========================
const form = document.getElementById("bookingForm");
const msg = document.getElementById("msg");
const scrollBtn = document.querySelector(".scroll-top a");
const newsletterBtn = document.querySelector(".newsletter button");
const newsletterInput = document.querySelector(".newsletter input");

// ==========================
// FORM SUBMIT (TRAIN SEARCH)
// ==========================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("username").value.trim();
    const from = document.getElementById("userFrom").value.trim();
    const to = document.getElementById("userTo").value.trim();
    const date = document.getElementById("userDate").value;
    const travelClass = document.getElementById("class").value;
    const passengers = document.getElementById("userPassengers").value;

    // Validation
    if (
        name === "" ||
        from === "" ||
        to === "" ||
        date === "" ||
        travelClass === "Select Train Class" ||
        passengers === ""
    ) {
        msg.style.color = "red";
        msg.innerText = "⚠️ Please fill all fields!";
        return;
    }

    // Searching message
    msg.style.color = "lightgreen";
    msg.innerText = "🔍 Searching trains...";

    // Fake delay (like real app)
    setTimeout(() => {
        msg.innerText = "✅ Trains Found!";
    }, 2000);

    // Show details
    alert(`Train Details:
Name: ${name}
From: ${from}
To: ${to}
Date: ${date}
Class: ${travelClass}
Passengers: ${passengers}`);

    // Reset form
    form.reset();
});

// ==========================
// SCROLL TO TOP
// ==========================
scrollBtn.addEventListener("click", function (e) {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==========================
// SMOOTH SCROLL FOR LINKS
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ==========================
// NEWSLETTER SUBSCRIBE
// ==========================
newsletterBtn.addEventListener("click", function () {
    const email = newsletterInput.value.trim();

    if (email === "") {
        alert("⚠️ Please enter your email!");
        return;
    }

    alert("📩 Subscribed successfully!");
    newsletterInput.value = "";
});