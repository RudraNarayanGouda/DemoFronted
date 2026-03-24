document.addEventListener("DOMContentLoaded", function() {
    const flightForm = document.getElementById("flightBookingForm");

    // Get inputs by placeholder
    const fromInput = flightForm.querySelector('input[placeholder="Location"]');
    const toInput = flightForm.querySelector('input[placeholder="Destination"]');
    const dateInput = flightForm.querySelector('input[placeholder="Departure"]');

    flightForm.addEventListener("submit", function(e) {
        e.preventDefault(); // stop normal submit

        // Check login
        const userId = localStorage.getItem("userId");
        if(!userId){
            alert("⚠️ Please login first to book tickets!");
            // Optional: redirect to login page
            window.location.href = "/loginpage/login.html";
            return;
        }

        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        const date = dateInput.value.trim();

        if(!from || !to || !date){
            alert("⚠️ Please fill all fields!");
            return;
        }

        const ticket = {
            source: from,
            destination: to,
            date: date,
            price: 500,       // you can calculate based on logic
            type: "Flight"
        };

        fetch(`http://localhost:8080/tickets?userId=${userId}`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(ticket)
        })
        .then(res => {
            if(!res.ok) throw new Error("Booking failed");
            return res.json();
        })
        .then(data => {
            alert(`🎉 Flight Booked Successfully!\nFrom: ${ticket.source}\nTo: ${ticket.destination}\nDate: ${ticket.date}`);
            flightForm.reset();
        })
        .catch(err => {
            console.error(err);
            alert("❌ Flight booking failed!");
        });
    });
});