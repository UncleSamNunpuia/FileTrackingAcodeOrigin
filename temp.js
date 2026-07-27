function getFileModalHTML(config = {}) {

    const {
        title = "Enter File Number & Name",
        fileNumber = "",
        fileName = "",
        fileSection = "",
        fileDescription = "",
        disabled = false,
        buttonText = "Create File",
        buttonAction = "submitFile()"
    } = config;

    const dis = disabled ? "disabled" : "";

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
                ${dis}>
        </div>

        <div class="form-group">
            <label>File Name</label>
            <input
                type="text"
                id="fileName"
                value="${fileName}"
                ${dis}>
        </div>

        <div class="form-group">
            <label>Section</label>
            <select id="fileSection" ${dis}>
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
                ${dis}>${fileDescription}</textarea>
        </div>

        <button
            class="submit-btn"
            onclick="${buttonAction}">
            ${buttonText}
        </button>
    `;
}

function submitFile() {

    const fileData = {
        fileNumber: document.getElementById("fileNumber").value.trim(),
        fileName: document.getElementById("fileName").value.trim(),
        fileSection: document.getElementById("fileSection").value,
        fileDescription: document.getElementById("fileDescription").value.trim()
    };

    modalCard.innerHTML = getFileModalHTML({
        ...fileData,
        title: "Confirm File Details",
        disabled: true,
        buttonText: "Confirm",
        buttonAction: "confirmSubmitFile()"
    });

    window.pendingFileData = fileData;
}

function confirmSubmitFile() {

    submitForm({
        action: "createFile",
        fields: [
            "fileNumber",
            "fileName",
            "fileSection",
            "fileDescription"
        ],
        successTitle: "File Created Successfully"
    });

}

function confirmSubmitFile() {

    const data = {
        action: "createFile",
        ...window.pendingFileData
    };

    const formData = createFormData(data);

    sendToGAS({
        formData,
        successTitle: "File Created Successfully"
    });
}