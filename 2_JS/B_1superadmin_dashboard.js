// // working

// open cerate user modal
function openUserModal() {
        document.getElementById("modalCard").innerHTML = `
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

        document.getElementById("modalOverlay").style.display = "flex";
      }

// open file modal
function openFileModal() {
  document.getElementById("modalCard").innerHTML = `
<div class="modal-header">
<h2>Enter File Number & Name</h2>
<button class="close-modal" onclick="closeModal()">×</button>
</div>

<div class="form-group">
<label>File Number</label>
<input type="text">
</div>

<div class="form-group">
<label>File Name</label>
<input type="text">
</div>

<div class="form-group">
<label>Section</label>
<select>
<option>Accounts</option>
<option>Administration</option>
<option>Establishment</option>
</select>
</div>

<div class="form-group">
<label>Description</label>
<textarea rows="4"></textarea>
</div>

<button class="submit-btn">Save File</button>
`;
        document.getElementById("modalOverlay").style.display = "flex";
      }

      function closeModal() {
        document.getElementById("modalOverlay").style.display = "none";
      }

      document
        .getElementById("modalOverlay")
        .addEventListener("click", function (e) {
          if (e.target === this) {
            closeModal();
          }
        });


        //  funtion to handle submitted data of create user
    function submitUser() {
    // Get values from the modal
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        const section = document.getElementById("section").value;

        // Print to the browser console
        console.log("===== Create User =====");
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Role:", role);
        console.log("Section:", section);
        console.log("=======================");

        // Create FormData
        const formData = new FormData();
        formData.append("action", "createUser");
        formData.append("username", username);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("section", section);

        const GAS_URL = "https://script.google.com/macros/s/AKfycbybot_jsane8OaXdYBSyoROy14s2NrTw6rj_Cmv3JszHjKbe7kp7vxVeilMe5xc17eLig/exec";
        // Send to GAS: we do not use URLSearchParams here because we are sending formData,
        //  so we need to use FormData
        fetch(GAS_URL, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);

            if (data.success) {
                alert(data.message);
                showSuccessModal(data.message); // Show Success modal
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to connect to the server.");
        });
    }

    // function showSuccessModal(message) {
    //     document.getElementById("successMessage").textContent = message;
    //     document.getElementById("successModal").style.display = "flex";
    // }

    function showSuccessModal(message) {

    document.getElementById("modalCard").innerHTML = `
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

            <h3>User Created Successfully</h3>

            <p>${message}</p>

            <button class="submit-btn" onclick="closeSuccessModal()">
                OK
            </button>

        </div>
    `;

    document.getElementById("modalOverlay").style.display = "flex";
}

    function closeSuccessModal() {
        document.getElementById("modalOverlay").style.display = "none";
    }