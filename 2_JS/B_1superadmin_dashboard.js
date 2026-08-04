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

// to laod icons from svgIcons.js file 
// if script is loaded with defer  you can simply do: loadIcons();
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

export { submitForm };