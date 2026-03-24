document.addEventListener("DOMContentLoaded", function(){

    const userName = localStorage.getItem("userName");
    const navText = document.getElementById("navText");
    const userNav = document.getElementById("userNav");

    if(userName){
        navText.innerText = userName.toUpperCase();

        // Optional: click pe dashboard khol
        userNav.href = "/DashbordUi/index.html";
    }

});
