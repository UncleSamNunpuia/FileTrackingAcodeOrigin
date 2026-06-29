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
}