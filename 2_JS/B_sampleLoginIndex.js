console.log("JS Loaded");
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        document.getElementById("message").innerHTML =
            "<span class='text-success'>Login Successful</span>";
    } else {
        document.getElementById("message").innerHTML =
            "<span class='text-danger'>Invalid Username or Password</span>";
    }
});