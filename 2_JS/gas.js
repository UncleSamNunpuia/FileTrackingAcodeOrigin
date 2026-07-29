import { GAS_URL } from "./B_config.js";
import { openModal } from "./B_modalsHTML.js";
import { submitForm } from "./B_1superadmin_dashboard.js";

// send to GAS fn
function sendToGAS(config) {
// object destructuring (or destructuring assignment) in JS (intro in ES6).
// Extracts properties from an object into variables with the same names.
// if the parameter passed is increased the variable names 
// can be increased in the destructuring assignment.
    const {
        formData,
        successTitle
    } = config;

    fetch(GAS_URL, { method: "POST", body: formData })
    .then(response => response.json())
    .then(data => {
        console.log("Response:", data);
        if (data.success) {
            alert(data.message);
            openModal("success", successTitle, data.message);
        } else {
            alert("Error: " + data.message);
        }
    }).catch(error => {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    });
} // send to GAS fn ends here

export { submitForm, sendToGAS };