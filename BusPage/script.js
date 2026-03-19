// ==============================
// DOM Elements
// ==============================

const form = document.querySelector(".right-cont form");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const seatSelect = document.getElementById("seat");

const bookButtons = document.querySelectorAll(".butn");
const scrollTopBtn = document.querySelector(".scroll-top a");
const navLinks = document.querySelectorAll(".nav-items a");

// ==============================
// FORM SUBMIT FUNCTION
// ==============================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const seat = seatSelect.value;

    // Validation
    if (!from || !to || !date || !time || seat === "1") {
        alert("⚠️ Please fill all fields correctly!");
        return;
    }

    // Show booking confirmation
    alert(
        `✅ Booking Confirmed!\n\nFrom: ${from}\nTo: ${to}\nDate: ${date}\nTime: ${time}\nSeats: ${seat}`
    );

    // Reset form
    form.reset();
});

// ==============================
// BOOK NOW BUTTONS
// ==============================
bookButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        alert("🚌 Redirecting to booking page...");
        // You can redirect later:
        // window.location.href = "booking.html";
    });
});

// ==============================
// SMOOTH SCROLLING
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ==============================
// SCROLL TO TOP
// ==============================
scrollTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==============================
// NAVBAR ACTIVE LINK
// ==============================
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

// ==============================
// SCROLL ANIMATION (Fade In)
// ==============================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll("section").forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.6s ease";
    observer.observe(section);
});
if (entry.isIntersecting) {
    entry.target.classList.add("show");
}