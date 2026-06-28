/* ── CLOCK ── */
      function updateClock() {
        const now = new Date();
        const h = now.getHours();
        const m = String(now.getMinutes()).padStart(2, "0");
        const ampm = h >= 12 ? "PM" : "AM";
        const h12 = h % 12 || 12;
        document.getElementById("topbar-time").textContent =
          `${h12}:${m} ${ampm}`;

        const eyebrow = document.getElementById("greeting-eyebrow");
        if (h < 12) eyebrow.textContent = "Good morning";
        else if (h < 17) eyebrow.textContent = "Good afternoon";
        else eyebrow.textContent = "Good evening";
      }
      updateClock();
      setInterval(updateClock, 60000);

      /* ── ROLE SWITCHER ── */
      let currentRole = "superuser";

      function setRole(role) {
        currentRole = role;

        // update toggle buttons
        document
          .querySelectorAll(".rt-btn")
          .forEach((b) => b.classList.remove("active-role"));
        document
          .querySelector(`.rt-btn.${role}-btn`)
          .classList.add("active-role");

        const tileUser = document.getElementById("tile-user");
        const navSettings = document.getElementById("nav-settings");
        const avatar = document.getElementById("sidebar-avatar");
        const pill = document.getElementById("sidebar-role-pill");
        const greetSub = document.getElementById("greeting-sub");
        const greetName = document.getElementById("greeting-name");
        const sidebarName = document.getElementById("sidebar-name");

        if (role === "superuser") {
          // unlock user creation tile
          tileUser.classList.remove("locked");
          tileUser.style.pointerEvents = "";
          tileUser.querySelector(".tile-action").textContent = "";
          tileUser.querySelector(".tile-action").innerHTML =
            'Open App <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 12h14M12 5l7 7-7 7"/></svg>';
          const lb = tileUser.querySelector(".lock-badge");
          if (lb) lb.remove();
          navSettings.classList.add("locked");

          pill.className = "role-pill superuser";
          pill.innerHTML =
            '<svg width="8" height="8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.25 3.75 10.15 9 11.25C17.25 21.15 21 16.25 21 11V5L12 1z"/></svg> Superuser';
          avatar.className = "avatar";
          greetSub.innerHTML =
            "You're signed in as <strong>Superuser</strong>. All system functions are available to you.";
          greetName.textContent = "Samuel";
          sidebarName.textContent = "Samuel R.";
        } else {
          // lock user creation tile for admin
          tileUser.classList.add("locked");
          tileUser.style.pointerEvents = "none";
          if (!tileUser.querySelector(".lock-badge")) {
            const lb = document.createElement("div");
            lb.className = "lock-badge";
            lb.innerHTML = `<svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path stroke-linecap="round" d="M7 11V7a5 5 0 0110 0v4"/></svg> Superuser only`;
            tileUser.appendChild(lb);
          }
          navSettings.classList.remove("locked");

          pill.className = "role-pill admin";
          pill.innerHTML =
            '<svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path stroke-linecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> Admin';
          avatar.className = "avatar teal";
          greetSub.innerHTML =
            "You're signed in as <strong>Admin</strong>. File registration and management are available.";
          greetName.textContent = "Admin User";
          sidebarName.textContent = "Admin User";
        }
      }

      /* ── APP LAUNCH MODAL ── */
      const appInfo = {
        user: {
          color: "#4F46E5",
          bg: "#EEF2FF",
          iconColor: "#4F46E5",
          title: "Create New User",
          desc: "This will open the User Management app where you can create new accounts and assign roles to clerks and admins.",
          cta: "Launch User App",
        },
        file: {
          color: "#0D9488",
          bg: "#F0FDFA",
          iconColor: "#0D9488",
          title: "Enter File Number & Name",
          desc: "This will open the File Registry app where you can register new files with their number, name, and section assignment.",
          cta: "Launch File App",
        },
      };

      function launchApp(type) {
        if (type === "user" && currentRole === "admin") return;
        const info = appInfo[type];
        const overlay = document.getElementById("modal-overlay");
        const icon = document.getElementById("modal-icon");

        icon.style.background = info.bg;
        icon.innerHTML =
          type === "user"
            ? `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="${info.iconColor}" stroke-width="1.8"><path stroke-linecap="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path stroke-linecap="round" d="M19 8v6M22 11h-6"/></svg>`
            : `<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="${info.iconColor}" stroke-width="1.8"><path stroke-linecap="round" d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/><path stroke-linecap="round" d="M12 11v6M9 14h6"/></svg>`;

        document.getElementById("modal-title").textContent = info.title;
        document.getElementById("modal-desc").textContent = info.desc;

        const cta = document.getElementById("modal-cta");
        cta.textContent = info.cta;
        cta.style.background = info.color;

        overlay.style.display = "flex";
      }

      function closeModal() {
        document.getElementById("modal-overlay").style.display = "none";
      }

      // close on backdrop click
      document
        .getElementById("modal-overlay")
        .addEventListener("click", function (e) {
          if (e.target === this) closeModal();
        });