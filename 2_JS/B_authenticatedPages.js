// auth-check.js — include on every protected page
(async function () {
  const token = sessionStorage.getItem("auth_token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Re-validate token with GAS
  const GAS_URL = "https://script.google.com/macros/s/AKfycbzFHfbKChSslHleoa5FtGivIJ2N8Cnn5WmYvVjVYjiBnadMzCc1_0vu-twkJLmcOuhghQ/exec";
//   const GAS_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"; 
// the YOUR_DEPLOyMENT_ID should be replaced with your actual deployment ID of the Google Apps Script that handles token validation.
  const res = await fetch(`${GAS_URL}?token=${token}`);
  const result = await res.json();

  if (!result.valid) {
    sessionStorage.clear();
    window.location.href = "login.html";
  }
})();