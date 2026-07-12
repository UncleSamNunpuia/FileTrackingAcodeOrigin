// assigning variables
const modalCard = document.getElementById("modalCard");
const modalOverlay = document.getElementById("modalOverlay");
const GAS_URL = "https://script.google.com/macros/s/AKfycbybot_jsane8OaXdYBSyoROy14s2NrTw6rj_Cmv3JszHjKbe7kp7vxVeilMe5xc17eLig/exec";
// assigning the Modal HTML to variables ends

// below are html codes to be rendered as modals
// fn to createUser Modal html
function getUserModalHTML() {
        return `
        <div class="modal-header">
            <h2>Create New User</h2>
            <button class="close-modal" onclick="closeModal()">×</button>
        </div>

        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password">
        </div>

        <div class="form-group">
            <label for="role">Role</label>
            <select id="role">
                <option>User</option>
                <option>Admin</option>
                <option>Super User</option>
            </select>
        </div>

        <div class="form-group">
            <label for="section">Section</label>
            <select id="section">
                <option>Accounts</option>
                <option>Administration</option>
                <option>Establishment</option>
            </select>
        </div>

        <button class="submit-btn" onclick="submitUser()">
            Create User
        </button>
        `;
    }
// fn to createUser Modal html ends

function getFileModalHTML(config = {}) {

    const {
        title = "Enter File Number & Name",
        fileNumber = "",
        fileName = "",
        fileSection = "Accounts",
        fileDescription = "",
        confirmMode = false
    } = config;
  return `
<div class="modal-header">
    <h2>${title}</h2>
    <button class="close-modal" onclick="closeModal()">×</button>
</div>

<div class="form-group">
    <label>File Number</label>
    <input
        type="text"
        id="fileNumber"
        value="${fileNumber}"
        ${confirmMode ? "disabled" : ""}>
</div>

<div class="form-group">
    <label>File Name</label>
    <input
        type="text"
        id="fileName"
        value="${fileName}"
        ${confirmMode ? "disabled" : ""}>
</div>

<div class="form-group">
    <label>Section</label>

    <select id="fileSection" ${confirmMode ? "disabled" : ""}>
        <option ${fileSection==="Accounts"?"selected":""}>Accounts</option>
        <option ${fileSection==="Administration"?"selected":""}>Administration</option>
        <option ${fileSection==="Establishment"?"selected":""}>Establishment</option>
    </select>
</div>

<div class="form-group">
    <label>Description</label>

    <textarea
        id="fileDescription"
        rows="4"
        ${confirmMode ? "disabled" : ""}>${fileDescription}</textarea>
</div>

${
confirmMode
?
`
<button class="submit-btn" onclick="confirmSubmitFile()">
Confirm
</button>

<button class="submit-btn" onclick="editFile()">
Edit
</button>
`
:
`
<button class="submit-btn" onclick="submitFile()">
Create File
</button>
`}
`;
// fn to createFile Modal html
// fn to createFile Modal html ends
// // fn to createFile Modal html
// function getFileModalHTML() {
//     return `
//         <div class="modal-header">
//             <h2>Enter File Number & Name</h2>
//             <button class="close-modal" onclick="closeModal()">×</button>
//         </div>
//         <div class="form-group">
//             <label for="fileNumber">File Number</label>
//             <input type="text" id="fileNumber">
//         </div>
//         <div class="form-group">
//             <label for="fileName">File Name</label>
//             <input type="text" id="fileName">
//         </div>
//         <div class="form-group">
//             <label for="fileSectionLabel">Section</label>
//             <select id="fileSection">
//                 <option>Accounts</option>
//                 <option>Administration</option>
//                 <option>Establishment</option>
//                 // This part maybe modified to fetch from database
//             </select>
//         </div>
//         <div class="form-group">
//             <label for="fileDescription">Description</label>
//             <textarea id="fileDescription" rows="4"></textarea>
//         </div>
//         <button class="submit-btn" onclick="submitFile()">
//             Create File
//         </button>
//         `;
//     }
// // fn to createFile Modal html ends

// show success modal
function showSuccessModalHTML(title, message) {
// modalCard.innerHTML = `
    return `
        <div class="modal-header">
            <h2>Success</h2>
            <button class="close-modal" onclick="closeModal()">×</button>
        </div>
        <div style="text-align:center; padding:30px 20px;">
            <div style="
                width:80px;
                height:80px;
                margin:0 auto 20px;
                border-radius:50%;
                background:#28a745;
                color:white;
                font-size:50px;
                line-height:80px;
                font-weight:bold;">
                ✓
            </div>
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="submit-btn" onclick="closeSuccessModal()">
                OK
            </button>
        </div>
`;
    modalOverlay.style.display = "none";
}
// below are html codes to be rendered as modals ends
 
// openModal function to handle both user and file modals i.e to route Modal function call
function openModal(type, title = "", message = "") {
    switch (type) {
        case "createUser":
            modalCard.innerHTML = getUserModalHTML();
            break;
        case "createFile":
            modalCard.innerHTML = getFileModalHTML();
            break;
        case "success":
            modalCard.innerHTML = showSuccessModalHTML(title, message);
            break;
        default:
            console.error("Unknown modal type:", type);
            return;
    }
    modalOverlay.style.display = "flex";
}
// openModal function to handle both user and file modals ends

// close modal function X button
function closeModal() {
    console.trace("closeModal called");
    modalOverlay.style.display = "none";
}

// ok on success modal button
function closeSuccessModal() {
    modalOverlay.style.display = "none";
}

//  funtion to handle submitted data of create user
function submitUser() {
    // Create FormData
    submitForm({
            action:"createUser",
            fields:[
                "username",
                "password",
                "role",
                "section"
            ],
            successTitle: "User Created Successfully"
        });
};
// submit create user ends here

// Function to handle submitted data of Create File
function submitFile() {

    window.pendingFileData = {

    fileNumber:document.getElementById("fileNumber").value.trim(),
    fileName: document.getElementById("fileName").value.trim(),
    fileSection: document.getElementById("fileSection").value,
    fileDescription: document.getElementById("fileDescription").value.trim()
    };

    modalCard.innerHTML = getFileModalHTML({
        ...window.pendingFileData,
        title: "Confirm File Details",
        confirmMode: true
    });
}
// submit file create ends here

  // edit file
  function editFile() {
    modalCard.innerHTML = getFileModalHTML({
        ...window.pendingFileData,
        title: "Edit File",
        confirmMode: false
    });
}
  // edit file ends

// confirm submitFile
  function confirmSubmitFile() {
    const formData = createFormData({
        action: "createFile",
        ...window.pendingFileData
    });
    sendToGAS({
        formData,
        successTitle: "File Created Successfully"
    });
}
// confirm submitFile ends
  
// // Function to handle submitted data of Create File
// function submitFile() {
//     // Create FormData
//     submitForm({
//         action: "createFile",
//         // here <html id> : <what GAS expects> mapping is done, 
//         // so that the GAS can understand the data sent from the front end.
//         fields:[
//             "fileNumber",
//             "fileName",
//             "fileSection",
//             "fileDescription"
//         ],
//         successTitle: "File Created Successfully"
//     });
// }
// // submit file create ends here

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

// send to GAS fn
// function sendToGAS(formData, title) {
function sendToGAS(config) {
    // object destructuring (or destructuring assignment) in JS (intro in ES6).
    // Extracts properties from an object into variables with the same names.
    // if the parameter passed is increased the variable names can be increased in the destructuring assignment.
    const {
        formData,
        successTitle
    } = config;

    fetch(GAS_URL, {
        method: "POST",
        body: formData
    })
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