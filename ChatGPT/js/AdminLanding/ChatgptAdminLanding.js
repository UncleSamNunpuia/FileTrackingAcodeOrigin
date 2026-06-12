function openUserModal() {
        document.getElementById("modalCard").innerHTML = `
<div class="modal-header">
<h2>Create New User</h2>
<button class="close-modal" onclick="closeModal()">×</button>
</div>

<div class="form-group">
<label>Username</label>
<input type="text">
</div>

<div class="form-group">
<label>Password</label>
<input type="password">
</div>

<div class="form-group">
<label>Role</label>
<select>
<option>User</option>
<option>Admin</option>
<option>Super User</option>
</select>
</div>

<div class="form-group">
<label>Section</label>
<select>
<option>Accounts</option>
<option>Administration</option>
<option>Establishment</option>
</select>
</div>

<button class="submit-btn">Create User</button>
`;

        document.getElementById("modalOverlay").style.display = "flex";
      }

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