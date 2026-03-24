document.addEventListener("DOMContentLoaded", function () {
    const trainForm = document.querySelector("#bookingForm");
    const msg = document.getElementById("msg");

    trainForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // ====== LOGIN CHECK ======
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("⚠️ Please login first to book tickets!");
            window.location.href = "/loginpage/login.html"; // optional redirect
            return;
        }

        // Get values
        const name = document.getElementById("username").value.trim();
        const from = document.getElementById("trainFrom").value.trim();
        const to = document.getElementById("trainTo").value.trim();
        const date = document.getElementById("trainDate").value;
        const travelClass = document.getElementById("class").value;
        const passengers = parseInt(document.getElementById("trainPassengers").value);

        // Validation
        if (!name || !from || !to || !date || travelClass === "Select Train Class" || passengers <= 0) {
            msg.style.color = "red";
            msg.innerText = "⚠️ Please fill all fields!";
            return;
        }

        msg.style.color = "lightgreen";
        msg.innerText = "🔍 Booking train ticket...";

        const ticket = {
            username: name,
            source: from,
            destination: to,
            date: date,
            travelClass: travelClass,
            passengers: passengers,
            price: passengers * 100,
            type: "Train"
        };

        // POST ticket to backend
        fetch(`http://localhost:8080/tickets?userId=${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticket)
        })
        .then(res => {
            if (!res.ok) throw new Error("Booking failed");
            return res.json();
        })
        .then(data => {
            console.log("TRAIN SUCCESS:", data);
            msg.style.color = "green";
            msg.innerText = "✅ Train Ticket Booked!";
            alert(`🎉 Train Ticket Booked!\nFrom: ${ticket.source}\nTo: ${ticket.destination}\nDate: ${ticket.date}`);
            trainForm.reset();
        })
        .catch(err => {
            console.error("TRAIN ERROR:", err);
            msg.style.color = "red";
            msg.innerText = "❌ Train booking failed!";
        });
    });
});