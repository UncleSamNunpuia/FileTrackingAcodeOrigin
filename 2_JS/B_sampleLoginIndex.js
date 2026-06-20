// version1_frontend Authentications
// console.log("JS Loaded");
// document.getElementById("loginForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     if (username === "admin" && password === "1234") {
//         document.getElementById("message").innerHTML =
//             "<span class='text-success'>Login Successful</span>";
//     } else {
//         document.getElementById("message").innerHTML =
//             "<span class='text-danger'>Invalid Username or Password</span>";
//     }
// });


// version 2_authenticate using GAS and gogole sheets; api
console.log("JS Loaded");

// const GAS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
const GAS_URL = "https://script.google.com/macros/s/12BgUrj6NS9NEa0Rprc8DEY_ZVl5gS9UqrMqxKUw-pAs/exec";
    
document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  messageDiv.innerHTML = "<span class='text-secondary'>Verifying...</span>";

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "login", username, password }),
    });

    const result = await response.json();

    if (result.success) {
      // Save token and role in sessionStorage
      sessionStorage.setItem("auth_token", result.token);
      sessionStorage.setItem("role", result.role);
      sessionStorage.setItem("username", username);

      messageDiv.innerHTML = "<span class='text-success'>Login Successful! Redirecting...</span>";

      // Redirect to your main page after short delay
      setTimeout(() => {
        window.location.href = "../1_html/B_sampleDashboard.html"; 
        // change to your actual page
        // window.location.href = "dashboard.html"; // change to your actual page
      }, 1000);

    } else {
      messageDiv.innerHTML = "<span class='text-danger'>Invalid Username or Password</span>";
    }

  } catch (error) {
    console.error(error);
    messageDiv.innerHTML = "<span class='text-danger'>Something went wrong. Try again.</span>";
  }
});