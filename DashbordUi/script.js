// =================== DASHBOARD JS ===================

// Logout
function logout(){ 
    localStorage.clear();
    window.location.href = "/loginpage/login.html";
}

// Get current userId
let userId = localStorage.getItem("userId");
if(!userId){
    alert("Login first!");
    window.location.href = "/loginpage/login.html";
}

// Load all tickets for the user
function loadTickets(){
    fetch(`http://localhost:8080/tickets/user/${userId}`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("ticketList");
        container.innerHTML = "";

        data.forEach(ticket => {
            const div = document.createElement("div");
            div.className = "ticket-card";

            // Only one date needed
            let dateInfo = `<p>Date: ${ticket.date || 'N/A'}</p>`;

            div.innerHTML = `
                <p><b>${ticket.source} → ${ticket.destination}</b></p>
                ${dateInfo}
                <p>Price: ₹${ticket.price}</p>
                <p>Type: <b>${ticket.type}</b></p>
                <p class="${ticket.status}">Status: ${ticket.status}</p>

                <select onchange="updateStatus(${ticket.id}, this.value)">
                    <option value="OPEN" ${ticket.status==='OPEN'?'selected':''}>OPEN</option>
                    <option value="IN_PROGRESS" ${ticket.status==='IN_PROGRESS'?'selected':''}>IN_PROGRESS</option>
                    <option value="CLOSED" ${ticket.status==='CLOSED'?'selected':''}>CLOSED</option>
                    <option value="CANCELLED" ${ticket.status==='CANCELLED'?'selected':''}>CANCELLED</option>
                </select>

                ${ticket.status !== 'CANCELLED' ? `<button style="background:black;color:white" onclick="cancelTicket(${ticket.id})">Cancel</button>` : `<p style="color:red">❌ Cancelled</p>`}
                <br>

                <button class="update" onclick="showUpdateForm(${ticket.id})">Update</button>
                <button class="delete" onclick="deleteTicket(${ticket.id})">Delete</button>
                <button class="download" onclick="downloadTicket(${ticket.id})">Download Ticket</button>

                <div id="updateForm-${ticket.id}" style="display:none;">
                    <input id="source-${ticket.id}" value="${ticket.source}">
                    <input id="dest-${ticket.id}" value="${ticket.destination}">
                    <input id="date-${ticket.id}" value="${ticket.date}"> <!-- Only one date -->
                    <input id="price-${ticket.id}" value="${ticket.price}">
                    <input id="type-${ticket.id}" value="${ticket.type}">
                    <button class="save" onclick="updateTicket(${ticket.id})">Save</button>
                </div>
            `;
            container.appendChild(div);
        });
    });
}

// ================= UPDATE STATUS =================
function updateStatus(id, status){
    fetch(`http://localhost:8080/tickets/${id}/status?status=${status}`, { method:"PUT" })
    .then(()=>loadTickets());
}

// ================= UPDATE TICKET =================
function updateTicket(id){
    const source = document.getElementById(`source-${id}`).value.trim();
    const dest = document.getElementById(`dest-${id}`).value.trim();
    const price = parseFloat(document.getElementById(`price-${id}`).value);
    const type = document.getElementById(`type-${id}`).value.trim() || "Unknown";

    const dateInput = document.getElementById(`date-${id}`);

    let payload = { 
        source, 
        destination: dest, 
        price, 
        type,
        date: dateInput ? dateInput.value : "" // Only single date
    };

    fetch(`http://localhost:8080/tickets/${id}`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    })
    .then(res => {
        if(!res.ok) throw new Error("Update failed");
        return res.json().catch(()=>{});
    })
    .then(()=>loadTickets())
    .catch(err=>{
        console.error("Update Error:", err);
        alert("❌ Ticket update failed!");
    });
}

// ================= CANCEL TICKET =================
function cancelTicket(id){
    if(!confirm("Are you sure you want to cancel this ticket?")) return;
    fetch(`http://localhost:8080/tickets/${id}/status?status=CANCELLED`, { method:"PUT" })
    .then(()=>loadTickets());
}

// ================= DELETE TICKET =================
function deleteTicket(id){
    if(confirm("Are you sure?")){
        fetch(`http://localhost:8080/tickets/${id}`, { method:"DELETE" })
        .then(()=>loadTickets());
    }
}

// ================= SHOW UPDATE FORM =================
function showUpdateForm(id){
    document.getElementById(`updateForm-${id}`).style.display = "block";
}

// ================= PDF DOWNLOAD =================
function downloadTicket(ticketId){
    fetch(`http://localhost:8080/tickets/${ticketId}`)
    .then(res=>res.json())
    .then(ticket=>{
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFillColor(0,102,204);
        doc.rect(0,0,210,30,"F");

        doc.setTextColor(255,255,255);
        doc.setFontSize(20);
        doc.text("E-TICKET", 75, 18);

        doc.setTextColor(0,0,0);
        doc.setFont("helvetica","normal");
        doc.rect(10,40,190,140);

        const price = Number(ticket.price) || 0;
        doc.text("Passenger:",20,60);
        doc.text(ticket.user?.name || "User",80,60);

        doc.text("Transport:",20,75);
        doc.text(ticket.type || "N/A",80,75);

        doc.text("From:",20,90);
        doc.text(ticket.source,80,90);

        doc.text("To:",20,105);
        doc.text(ticket.destination,80,105);

        doc.text("Date:",20,120);
        doc.text(ticket.date || "N/A",80,120);

        doc.text("Price:",20,150);
        doc.text(`Rs. ${price}`,80,150);

        doc.text("Status:",20,165);
        doc.text(ticket.status,80,165);

        doc.setFontSize(10);
        doc.text("Thank you for booking!",70,185);

        doc.save("ticket_"+ticket.id+".pdf");
    })
    .catch(err=>{
        console.error(err);
        alert("❌ PDF download failed");
    });
}

// Load tickets on page load
loadTickets();