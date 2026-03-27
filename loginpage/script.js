document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value; // अगर name use कर रहे हो तो same रखो
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Invalid");
        }
        return res.json();
    })
    .then(user => {
        // 🔥 MOST IMPORTANT
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("role", user.role);
        document.getElementById("msg").innerText = "Login Successful ✅";
        console.log(localStorage.getItem("role"))
        // redirect
         setTimeout(() => {
            window.location.href = "/BusPage/index.html";
        }, 500);
    })
    .catch(err => {
        document.getElementById("msg").innerText = "Invalid Credentials ❌";
    });
});