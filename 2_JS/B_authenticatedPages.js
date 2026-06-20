// // auth-check.js — include on every protected page ver-1
//   const token = sessionStorage.getItem("auth_token");
//   if (!token) {
//     window.location.href = "login.html";
//     return;
//   }

//   // Re-validate token with GAS
//   const GAS_URL = "https://script.google.com/macros/s/AKfycbzFHfbKChSslHleoa5FtGivIJ2N8Cnn5WmYvVjVYjiBnadMzCc1_0vu-twkJLmcOuhghQ/exec";
// //   const GAS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"; 
// // the YOUR_DEPLOyMENT_ID should be replaced with your actual deployment ID of the Google Apps Script that handles token validation.
//   const res = await fetch(`${GAS_URL}?token=${token}`);
//   const result = await res.json();

//   if (!result.valid) {
//     sessionStorage.clear();
//     window.location.href = "login.html";
//   }
// })();

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
