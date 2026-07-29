import { submitUser, submitFile  } from "./userActions.js";

const modalCard = document.getElementById("modalCard");
const modalOverlay = document.getElementById("modalOverlay");
const userTile  = document.getElementById("tile-user");
const fileTile  = document.getElementById("tile-file");

// assign modal html codes to funtions
function getUserModalHTML() {
        return `
        <div class="modal-header">
            <h2>Create New User</h2>
            <button class="close-modal" data-modal="closeModal">×</button>
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
        <button class="submit-btn" id="btnCreateUser" data-modal="submitUser">
            Create User
        </button>
        `;
    }
// fn to createUser Modal html ends

function getFileModalHTML() {
    return `
        <div class="modal-header">
            <h2>Enter File Number & Name</h2>
            <button class="close-modal" data-modal="closeModal">×</button>
        </div>
        <div class="form-group">
            <label for="fileNumber">File Number</label>
            <input type="text" id="fileNumber">
        </div>
        <div class="form-group">
            <label for="fileName">File Name</label>
            <input type="text" id="fileName">
        </div>
        <div class="form-group">
            <label for="fileSectionLabel">Section</label>
            <select id="fileSection">
                <option>Accounts</option>
                <option>Administration</option>
                <option>Establishment</option>
                // This part maybe modified to fetch from database
            </select>
        </div>
        <div class="form-group">
            <label for="fileDescription">Description</label>
            <textarea id="fileDescription" rows="4"></textarea>
        </div>
        <button class="submit-btn" id="btnCreateFile" data-modal="submitFile">
            Create File
        </button>
        `;
    }
// fn to createFile Modal html ends

// func to open modal based on the type of modal requested
function openModal(type, title = "", message = "") {
    switch (type) {
        case "createUser":
            modalCard.innerHTML = getUserModalHTML();
            document.getElementById("btnCreateUser").addEventListener("click", submitUser);
            break;
        case "createFile":
            modalCard.innerHTML = getFileModalHTML();
            document.getElementById("btnCreateFile").addEventListener("click", submitFile);
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


modalCard.addEventListener("click", (event) => {
    const action = event.target.dataset.modal;
    switch (action) {
        case "closeModal":
        case "closeSuccessModal":
            closeModal();
            break;
        case "btnCreateUser":
            submitUser();
            break;
        case "btnCreateFile":
            submitFile();
            break;
    }
});

// close modal function X  and ok of success modal button
function closeModal() {
    console.trace("closeModal called");
    modalOverlay.style.display = "none";
}

// // // ok on success modal button
// function closeSuccessModal() {
//     modalOverlay.style.display = "none";
// }

// show success modal
function showSuccessModalHTML(title, message) {
    // modalCard.innerHTML = `
    return `
    <div class="modal-header">
    <h2>Success</h2>
    <button class="close-modal" data-modal="closeModal">×</button>
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
            <button class="submit-btn" id="closeSuccessModalBtn" data-modal="closeSuccessModal">
            OK
            </button>
            </div>
            `;
    modalOverlay.style.display = "none";
}
// below are html codes to be rendered as modals ends

    // <button class="submit-btn" onclick="closeSuccessModal()">
// export the functions to be used in other modules
export {
    openModal,
    closeModal,
    showSuccessModalHTML
    // closeSuccessModal
};
