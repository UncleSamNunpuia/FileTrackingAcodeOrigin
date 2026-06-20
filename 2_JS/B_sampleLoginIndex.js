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
// console.log("JS Loaded");

// // const GAS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"; 
// // deployment id should be replaced with your actual deployment ID of the Google Apps Script that handles token validation. it is not the gsheet id. 
// // it is the deployment id of the script. you can find it in the script editor under "Deploy" > "Manage Deployments" > "Deployment ID".
// const GAS_URL = "https://script.google.com/macros/s/AKfycbzFHfbKChSslHleoa5FtGivIJ2N8Cnn5WmYvVjVYjiBnadMzCc1_0vu-twkJLmcOuhghQ/exec";
    
// document.getElementById("loginForm").addEventListener("submit", async function (event) {
//   event.preventDefault();

//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const messageDiv = document.getElementById("message");

//   messageDiv.innerHTML = "<span class='text-secondary'>Verifying...</span>";

//   try {
//     const response = await fetch(GAS_URL, {
//       method: "POST",
//       headers: { "Content-Type": "text/plain" },
//       body: JSON.stringify({ action: "login", username, password }),
//     });

//     const result = await response.json();

//     if (result.success) {
//       // Save token and role in sessionStorage
//       sessionStorage.setItem("auth_token", result.token);
//       sessionStorage.setItem("role", result.role);
//       sessionStorage.setItem("username", username);

//       messageDiv.innerHTML = "<span class='text-success'>Login Successful! Redirecting...</span>";

//       // Redirect to your main page after short delay
//       setTimeout(() => {
//         window.location.href = "../1_html/B_sampleDashboard.html"; 
//         // change to your actual page
//         // window.location.href = "dashboard.html"; // change to your actual page
//       }, 1000);

//     } else {
//       messageDiv.innerHTML = "<span class='text-danger'>Invalid Username or Password</span>";
//     }

//   } catch (error) {
//     console.error(error);
//     messageDiv.innerHTML = "<span class='text-danger'>Something went wrong. Try again.</span>";
//   }
// });


// version 3 by claude
// B_sampleLoginIndex.js — version 2: authenticate using GAS + Google Sheets
console.log("JS Loaded");

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbybot_jsane8OaXdYBSyoROy14s2NrTw6rj_Cmv3JszHjKbe7kp7vxVeilMe5xc17eLig/exec";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageDiv = document.getElementById("message");

    messageDiv.innerHTML = "<span class='text-secondary'>Verifying...</span>";

    try {
      // ✅ FIX: Use URLSearchParams (form-encoded body).
      // GAS reads these via e.parameter.action, e.parameter.username, etc.
      // Sending JSON caused a CORS redirect failure — GAS POST requests
      // trigger a 302 redirect that fetch (in CORS mode) can't follow with a body,
      // so the request arrived empty and GAS threw an error, landing in catch.
      const body = new URLSearchParams({
        action: "login",
        username: username,
        password: password,
      });

      const response = await fetch(GAS_URL, {
        method: "POST",
        // ✅ FIX: Do NOT set Content-Type manually for URLSearchParams.
        // The browser sets it to application/x-www-form-urlencoded automatically.
        // Setting "text/plain" or "application/json" triggers a CORS preflight
        // which GAS does not support — causing the request to fail.
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Save token and role in sessionStorage
        sessionStorage.setItem("auth_token", result.token);
        sessionStorage.setItem("role", result.role);
        sessionStorage.setItem("username", username);

        messageDiv.innerHTML =
          "<span class='text-success'>Login Successful! Redirecting...</span>";

        setTimeout(() => {
          window.location.href = "../1_html/B_dashboard.html";
        }, 1000);
      } else {
        messageDiv.innerHTML =
          "<span class='text-danger'>Invalid Username or Password</span>";
      }
    } catch (error) {
      console.error("Login error:", error);
      messageDiv.innerHTML =
        "<span class='text-danger'>Something went wrong. Try again.</span>";
    }
  });
