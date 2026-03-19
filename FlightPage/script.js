// ==========================
// SELECT ELEMENTS
// ==========================
const form = document.querySelector(".booking-container form");
const inputs = document.querySelectorAll(".booking-container input");
const classOptions = document.querySelectorAll(".booking-nav span");
const scrollBtn = document.querySelector(".scroll-top a");
const newsletterBtn = document.querySelector(".newsletter button");
const newsletterInput = document.querySelector(".newsletter input");

// ==========================
// BOOKING CLASS SWITCH
// ==========================
classOptions.forEach(option => {
    option.addEventListener("click", () => {
        classOptions.forEach(opt => opt.style.background = "#f1f5f9");
        classOptions.forEach(opt => opt.style.color = "#64748b");

        option.style.background = "#00a6ff";
        option.style.color = "white";
    });
});

// ==========================
// FORM SUBMIT
// ==========================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let values = [];

    inputs.forEach(input => {
        values.push(input.value.trim());
    });

    if (values.includes("")) {
        alert("⚠️ Please fill all fields!");
        return;
    }

    alert("✅ Booking Successful!\n\nDetails:\n" +
        "Location: " + values[0] + "\n" +
        "Travellers: " + values[1] + "\n" +
        "Departure: " + values[2] + "\n" +
        "Return: " + values[3]
    );

    form.reset();
});

// ==========================
// SMOOTH SCROLL
// ==========================
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

// ==========================
// SCROLL TO TOP
// ==========================
scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==========================
// NEWSLETTER
// ==========================
newsletterBtn.addEventListener("click", () => {
    const email = newsletterInput.value.trim();

    if (email === "") {
        alert("⚠️ Enter your email!");
        return;
    }

    alert("📩 Subscribed successfully!");
    newsletterInput.value = "";
});

// ==========================
// SIMPLE SCROLL ANIMATION
// ==========================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(50px)";
    sec.style.transition = "0.6s ease";
    observer.observe(sec);
});