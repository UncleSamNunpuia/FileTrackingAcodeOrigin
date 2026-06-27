// ver 3 - logout button implemented
const GAS_URL = "https://script.google.com/macros/s/AKfycbybot_jsane8OaXdYBSyoROy14s2NrTw6rj_Cmv3JszHjKbe7kp7vxVeilMe5xc17eLig/exec";

// auth-check.js — include on every protected page (no changes needed here)
(async function () {
  const token = sessionStorage.getItem("auth_token");

  if (!token) {
    window.location.href = "../index.html";
    // window.location.href = "login.html";
    return;
  }

  try {
    const res    = await fetch(`${GAS_URL}?token=${token}`);
    const result = await res.json();

    if (!result.valid) {
      sessionStorage.clear();
    window.location.href = "../index.html";

      // window.location.href = "login.html";
    }
  } catch (err) {
    // Network error — clear session and redirect to be safe
    console.error("Token validation failed:", err);
    sessionStorage.clear();
    // using address of authetication requireing apges redirects to this page
    window.location.href = "../index.html";
    // window.location.href = "login.html";
  }
})();

document
  .getElementById("logoutBtn")
  .addEventListener("click", logout);

async function logout() {

  if (!confirm("Are you sure you want to logout?")) {
    return;
  }

  const token = sessionStorage.getItem("auth_token");

  try {

    const body = new URLSearchParams({

      action: "logout",

      token: token

    });

    const response = await fetch(GAS_URL, {

      method: "POST",

      body: body

    });

    const result = await response.json();

    console.log(result);

  }
  catch (err) {

    console.error("Logout Error:", err);

  }
  finally {

    // Remove only these keys

    sessionStorage.removeItem("auth_token");

    sessionStorage.removeItem("username");

    sessionStorage.removeItem("role");

    window.location.replace("../index.html");

  }

}