
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

    console.log("Attempting login with username:", username);
    console.log("Password length:", password.length);
    console.log("Message div:", messageDiv);
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

      console.log(body);

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

// not role based, just login authenticated redirection
        // setTimeout(() => {
        //   window.location.href = "../1_html/B_dashboard.html";
        // }, 1000);
        // role based redirection
        setTimeout(() => {

  switch (result.role.toLowerCase()) {

    case "superadmin":
      window.location.href =
        "../1_html/B_superadmin_dashboard.html";
      break;

    case "admin":
      window.location.href =
        "../1_html/B_admin_dashboard.html";
      break;

    case "normal":
      window.location.href =
        "../1_html/B_normal_dashboard.html";
      break;

    default:
      console.error("Unknown role:", result.role);

      messageDiv.innerHTML =
        "<span class='text-danger'>Unknown user role.</span>";
  }

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