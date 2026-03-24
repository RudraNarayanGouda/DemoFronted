document.addEventListener("DOMContentLoaded", function() {

    const bookBtn = document.getElementById("bookTicketBtn");
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const seatSelect = document.getElementById("seat");
    const ticketForm = document.querySelector("form");

    bookBtn.addEventListener("click", function() {

        // ✅ LOGIN CHECK
        const userId = localStorage.getItem("userId");

        if(!userId){
            alert("⚠️ Please login first to book ticket!");
            window.location.href = "/loginpage/login.html";
            return;
        }
        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        const date = dateInput.value;
        const time = timeInput.value;
        const seats = parseInt(seatSelect.value);

        if(!from || !to || !date || !time || seats === 0){
            alert("⚠️ Please fill all fields correctly!");
            return;
        }

        const ticket = {
            source: from,
            destination: to,
            date: date,
            time: time,
            seats: seats,
            price: seats * 100,
            type:"Bus"
        };

        // const userId = localStorage.getItem("userId") || 1;

        fetch(`http://localhost:8080/tickets?userId=${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticket)
        })
        .then(res => {
            console.log("Status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Server Response:", data);
            alert("🎉 Ticket Booked Successfully!");
            ticketForm.reset(); // ✅ Now works
        })
        .catch(err => {
            console.error("Error booking ticket:", err);
            alert("❌ Error booking ticket. Check console!");
        });

    });

});