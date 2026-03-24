// 🔹 Generate captcha
function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // avoid confusing letters
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("captcha").innerText = captcha;
    return captcha;
}

// 🔹 Store current captcha globally
let currentCaptcha = generateCaptcha();

// 🔹 Bind form submit
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // 🔹 Get values from form inputs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const captchaInput = document.getElementById("captchaInput").value.trim();

    // 🔹 Simple validation
    if (!name || !email || !password || !captchaInput) {
        document.getElementById("msg").innerText = "All fields are required ❌";
        return;
    }

    // 🔹 Captcha validation
    if (captchaInput !== currentCaptcha) {
        document.getElementById("msg").innerText = "Invalid Captcha ❌";
        currentCaptcha = generateCaptcha(); // regenerate captcha
        document.getElementById("captchaInput").value = ""; // clear input
        return;
    }

    // 🔹 Payload to backend
    const payload = { name, email, password, role: "USER" };

    // 🔹 Call backend API
    fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error("Signup failed");
        return res.json();
    })
    .then(user => {
        // 🔹 Save userId in localStorage
        localStorage.setItem("userId", user.id);

        document.getElementById("msg").innerText = "Signup Successful ✅";

        // 🔹 Redirect to login page
        setTimeout(() => {
            window.location.href = "/loginpage/login.html";
        }, 1000);
    })
    .catch(err => {
        // Backend will throw error if email already exists
        document.getElementById("msg").innerText = "Signup failed ❌ (maybe email already exists)";
        currentCaptcha = generateCaptcha(); // regenerate captcha
        document.getElementById("captchaInput").value = "";
    });
});