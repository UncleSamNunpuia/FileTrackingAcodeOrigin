
documment.addEventListener("DOMContentLoaded", () => {
/* ------------------------------
   SAMPLE FR DATABASE
--------------------------------*/

      const frDatabase = {
        FR001: {
          pucType: "Letter",
          pucNo: "IMA(MZ)2026-2027/1",
          frDate: "09-06-2026",
          pucDate: "08-06-2026",
          status: "open",
        },

        FR002: {
          pucType: "Office Memorandum",
          pucNo: "OM/123/2026",
          frDate: "10-06-2026",
          pucDate: "09-06-2026",
          status: "done",
        },

        FR003: {
          pucType: "Application",
          pucNo: "APP/455/2026",
          frDate: "11-06-2026",
          pucDate: "10-06-2026",
          status: "partial",
        },
      };

      /* ------------------------------
   FILES BY SECTION
--------------------------------*/

      const sectionFiles = {
        Accounts: [
          {
            title: "Salary Files",
            files: [
              {
                fileNo: "ACC-01",
                shortcut: "Salary",
              },
              {
                fileNo: "ACC-02",
                shortcut: "Pay Fixation",
              },
            ],
          },
          {
            title: "Audit Files",
            files: [
              {
                fileNo: "ACC-03",
                shortcut: "Internal Audit",
              },
              {
                fileNo: "ACC-04",
                shortcut: "External Audit",
              },
            ],
          },
        ],

        Administration: [
          {
            title: "General Administration",
            files: [
              {
                fileNo: "ADM-01",
                shortcut: "Meetings",
              },
              {
                fileNo: "ADM-02",
                shortcut: "Vehicles",
              },
            ],
          },
        ],

        Establishment: [
          {
            title: "Service Matters",
            files: [
              {
                fileNo: "EST-01",
                shortcut: "Leave",
              },
              {
                fileNo: "EST-02",
                shortcut: "Service Book",
              },
            ],
          },
        ],
      };

      /* ------------------------------
   SEARCH FR
--------------------------------*/

      function searchFR() {
        const frNo = document.getElementById("frNo").value.trim();

        const record = frDatabase[frNo];

        if (!record) {
          alert("FR Number not found");
          return;
        }

        document.getElementById("pucType").value = record.pucType;

        document.getElementById("pucNo").value = record.pucNo;

        document.getElementById("frDate").value = record.frDate;

        document.getElementById("pucDate").value = record.pucDate;

        document.getElementById("statusSelect").value = record.status;

        updateStatus(record.status);
      }

      /* ------------------------------
   STATUS UPDATE
--------------------------------*/

      function updateStatus(status) {
        const dot = document.getElementById("statusDot");

        const text = document.getElementById("statusText");

        dot.className = "status-dot";

        if (status === "open") {
          dot.classList.add("open");
          text.textContent = "Open";
        }

        if (status === "partial") {
          dot.classList.add("partial");
          text.textContent = "Partially Done";
        }

        if (status === "done") {
          dot.classList.add("done");
          text.textContent = "Done";
        }
      }

      document
        .getElementById("statusSelect")
        .addEventListener("change", function () {
          updateStatus(this.value);
        });

      /* ------------------------------
   SECTION CHANGE
--------------------------------*/

      document
        .getElementById("sectionSelect")
        .addEventListener("change", function () {
          const section = this.value;

          const container = document.getElementById("accordionContainer");

          container.innerHTML = "";

          if (!section) {
            container.innerHTML = "Select a section first.";

            return;
          }

          sectionFiles[section].forEach((group) => {
            const item = document.createElement("div");

            item.className = "accordion-item";

            item.innerHTML = `
            <div class="accordion-header">
                ${group.title}
            </div>

            <div class="accordion-content">

                ${group.files
                  .map(
                    (file) => `

                    <div
                        class="file-option"
                        data-file="${file.fileNo}"
                        data-shortcut="${file.shortcut}">

                        ${file.fileNo}
                        -
                        ${file.shortcut}

                    </div>

                `,
                  )
                  .join("")}

            </div>
        `;

            container.appendChild(item);
          });

          bindAccordion();
        });

      /* ------------------------------
   ACCORDION
--------------------------------*/

      function bindAccordion() {
        document.querySelectorAll(".accordion-header").forEach((header) => {
          header.onclick = () => {
            const content = header.nextElementSibling;

            content.style.display =
              content.style.display === "block" ? "none" : "block";
          };
        });

        document.querySelectorAll(".file-option").forEach((option) => {
          option.onclick = () => {
            document
              .querySelectorAll(".file-option")
              .forEach((item) => item.classList.remove("active"));

            option.classList.add("active");

            document.getElementById("selectedFile").innerHTML = `
                File No:
                ${option.dataset.file}
                <br><br>
                Shortcut:
                ${option.dataset.shortcut}
            `;
          };
        });
      }

      /* ------------------------------
   ACTION ACCORDION
--------------------------------*/
      const actionHeader =
    document.getElementById("actionHeader");

const actionAccordion =
    document.getElementById("actionAccordion");

actionHeader.onclick = () => {

    actionAccordion.style.display =
        actionAccordion.style.display === "block"
        ? "none"
        : "block";
};


      /* ------------------------------
   ACTION SELECTION
--------------------------------*/
document
.querySelectorAll(".action-option")
.forEach(option => {

    // option.onclick = () => {

    //     document
    //     .querySelectorAll(".action-option")
    //     .forEach(x =>
    //         x.classList.remove("active")
    //     );

    //     option.classList.add("active");

    //     document
    //     .getElementById("selectedAction")
    //     .value =
    //         option.dataset.value;

    //     actionHeader.textContent =
    //         option.dataset.value;
    // };

    option.onclick = () => {

    document
    .querySelectorAll(".action-option")
    .forEach(x =>
        x.classList.remove("active")
    );
    option.classList.add("active");
    document
    .getElementById("selectedAction")
    .value =
        option.dataset.value;
    document
    .getElementById("actionHeader")
    .textContent =
        option.dataset.value;
    const customAction =
        document.getElementById(
            "customAction"
        );
    customAction.value = "";
    customAction.classList.remove(
        "active-action"
    );
};
});

const customAction =
    document.getElementById("customAction");

customAction.addEventListener("input", () => {

    if(customAction.value.trim() !== ""){

        document
        .querySelectorAll(".action-option")
        .forEach(option =>
            option.classList.remove("active")
        );

        document
        .getElementById("selectedAction")
        .value = "";

        customAction.classList.add(
            "active-action"
        );
    }
    else{

        customAction.classList.remove(
            "active-action"
        );
    }

});



      /* ------------------------------
   PUT UP Button
--------------------------------*/
document
.getElementById("putUpBtn")
.addEventListener("click", () => {

//     console.log(
//     "Custom Action:",
//     document.getElementById("customAction").value
// );

// console.log(
//     "Selected Action:",
//     document.getElementById("selectedAction").value
// );
    const formData = {
        frNo:
            document.getElementById("frNo").value,
        pucType:
            document.getElementById("pucType").value,
        pucNo:
            document.getElementById("pucNo").value,
        frDate:
            document.getElementById("frDate").value,
        pucDate:
            document.getElementById("pucDate").value,
        section:
            document.getElementById("sectionSelect").value,
        selectedFile:
            document
            .querySelector(".file-option.active")
            ?.dataset.file || "",
        status:
            document
            .getElementById("statusSelect")
            .value,
        action:
            document
            .getElementById("customAction")
            .value
            ||
            document
            .getElementById("selectedAction")
            .value,
        putUpTo:
            document
            .getElementById("putUpTo")
            .value,
        putUpDate:
            document
            .getElementById("putUpDate")
            .value
    };

    window.submittedData = formData;
    console.log(formData);

    alert(
        "Put Up Submitted Successfully"
    );

});
}

// When user clicks Put Up, the object becomes:

// {
//   "frNo":"FR001",
//   "pucType":"Letter",
//   "pucNo":"IMA(MZ)2026-2027/1",
//   "frDate":"09-06-2026",
//   "pucDate":"08-06-2026",
//   "section":"Accounts",
//   "selectedFile":"ACC-01",
//   "status":"open",
//   "action":"S.O DFA",
//   "putUpTo":"Medical Superintendent",
//   "putUpDate":"2026-06-13"
// }

// This object is exactly what you will later send to your Google Apps Script using:

// fetch(webAppUrl,{
//     method:"POST",
//     body:JSON.stringify(formData)
// })