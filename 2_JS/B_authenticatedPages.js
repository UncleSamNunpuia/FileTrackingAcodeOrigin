// ver 2
// auth-check.js — include on every protected page (no changes needed here)
(async function () {
  const token = sessionStorage.getItem("auth_token");

  if (!token) {
    window.location.href = "../index.html";
    // window.location.href = "login.html";
    return;
  }

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbybot_jsane8OaXdYBSyoROy14s2NrTw6rj_Cmv3JszHjKbe7kp7vxVeilMe5xc17eLig/exec";

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
