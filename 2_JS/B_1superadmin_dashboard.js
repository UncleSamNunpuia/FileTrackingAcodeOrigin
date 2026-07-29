// import functions from B_modalsHTML.js
import {
    openModal,
    closeModal
    // closeSuccessModal
} from "./B_modalsHTML.js";

import {
    GAS_URL
} from "./B_config.js";

import { sendToGAS } from "./gas.js";

// to laod icons from svgIcons.js file if script is loaded with defer  you can simply do:
// loadIcons();
// else if script is loaded without defer, you can do:
// document.addEventListener("DOMContentLoaded", () => { loadIcons(); // });
// eliminate the need to remember calling loadIcons()  on every page by having icons.js do it automatically:
window.addEventListener("DOMContentLoaded", () => {
    window.loadIcons();
});

// listens the click on .app-title and attach eventlistener to open the 
// modal based on the data-modal attribute of the clicked tile.
document.querySelectorAll(".app-tile").forEach(tile => {
    tile.addEventListener("click", () => {
        openModal(tile.dataset.modal);

    });
});



function submitForm(config) {
    // only action parameter of the config (submitForm() is assigned to data object,
    //  the rest of the parameters are assigned to data object in the forEach loop below.
    const data = { action: config.action};
    config.fields.forEach(id => { data[id] = document.getElementById(id).value.trim();});
    const formData = createFormData(data);

    console.log(formData)
    sendToGAS({ formData, successTitle:config.successTitle});

} // generic submit form data ends

// funtion to create Form data
function createFormData(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
} // create Form data ends

// // send to GAS fn
// function sendToGAS(config) {
// // object destructuring (or destructuring assignment) in JS (intro in ES6).
// // Extracts properties from an object into variables with the same names.
// // if the parameter passed is increased the variable names 
// // can be increased in the destructuring assignment.
//     const {
//         formData,
//         successTitle
//     } = config;

//     fetch(GAS_URL, { method: "POST", body: formData })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Response:", data);
//         if (data.success) {
//             alert(data.message);
//             openModal("success", successTitle, data.message);
//         } else {
//             alert("Error: " + data.message);
//         }
//     }).catch(error => {
//         console.error("Error:", error);
//         alert("Failed to connect to the server.");
//     });
// } // send to GAS fn ends here

export { submitForm };