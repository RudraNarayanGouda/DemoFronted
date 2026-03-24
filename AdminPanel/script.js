document.addEventListener("DOMContentLoaded", function() {
    const adminLink = document.getElementById("adminLink");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    // Role-based navbar
    if (role === "ADMIN") {
        adminLink.style.display = "inline-block";
    } else {
        adminLink.style.display = "none";
        // If a non-admin tries to open admin page
        if (window.location.pathname.includes("/Adminpanel/")) {
            alert("🚫 Access denied! Admins only.");
            window.location.href = "/loginpage/login.html";
        }
    }

    // Default view on page load
    showSection('dashboard'); // show dashboard first
});

// Global tickets array
let allTickets = [];

// Toggle sections
function showSection(section) {
    const dashboard = document.getElementById("dashboardSection");
    const tickets = document.getElementById("ticketsSection");

    if (section === "dashboard") {
        dashboard.style.display = "block";
        tickets.style.display = "none";
        loadStats(); // load dashboard stats
    } else if (section === "tickets") {
        dashboard.style.display = "none";
        tickets.style.display = "block";
        loadTickets(); // load ticket table
    }
}

// Load all tickets for table (admin only)
function loadTickets() {
    fetch("http://localhost:8080/tickets/admin")
        .then(res => res.json())
        .then(data => {
            allTickets = data;
            displayTickets(data);
        });
}

// Display tickets in table
function displayTickets(tickets) {
    const table = document.getElementById("ticketTable");
    table.innerHTML = "";
    tickets.forEach(t => {
        const row = `
            <tr>
                <td>${t.id}</td>
                <td>${t.userName || t.user?.name || "User"}</td>
                <td>${t.type}</td>
                <td>${t.price}</td>
                <td>${t.status}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Filter tickets by type
function filterTickets() {
    const selectedType = document.getElementById("typeFilter").value;
    let filteredTickets = allTickets;

    if (selectedType !== "ALL") {
        filteredTickets = allTickets.filter(t => t.type.toUpperCase() === selectedType);
    }

    displayTickets(filteredTickets);
    updateStats(filteredTickets);
}

// Update stats for given tickets array
function updateStats(tickets) {
    document.getElementById("totalTickets").innerText = tickets.length;

    const revenue = tickets
        .filter(t => t.status !== "CANCELLED")
        .reduce((sum, t) => sum + t.price, 0);

    document.getElementById("totalRevenue").innerText = revenue;

    // Total Users = unique users in filtered tickets
    const userIds = [...new Set(tickets.map(t => t.userId))];
    document.getElementById("totalUsers").innerText = userIds.length;
}

// Load dashboard stats
function loadStats() {
    fetch("http://localhost:8080/tickets/admin")
        .then(res => res.json())
        .then(tickets => {
            const totalTickets = tickets.length;
            const revenue = tickets
                .filter(t => t.status !== "CANCELLED")
                .reduce((sum, t) => sum + t.price, 0);

            document.getElementById("totalTickets").innerText = totalTickets;
            document.getElementById("totalRevenue").innerText = revenue;
        });

    fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then(users => {
            document.getElementById("totalUsers").innerText = users.length;
        });
}
document.addEventListener("DOMContentLoaded", function() {
    const adminLink = document.getElementById("adminLink");
    const role = localStorage.getItem("role"); // must be set on login

    // Show admin link only for ADMIN role
    if (role === "ADMIN") {
        adminLink.style.display = "inline-block";
    } else {
        adminLink.style.display = "none";
    }
});