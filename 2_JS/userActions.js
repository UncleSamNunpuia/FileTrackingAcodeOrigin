import { submitForm } from "./B_1superadmin_dashboard.js";

function submitUser() {
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

function submitFile() {
    // Create FormData
    submitForm({
        action: "createFile",
        // here <html id> : <what GAS expects> mapping is done, 
        // so that the GAS can understand the data sent from the front end.
        fields:[
            "fileNumber",
            "fileName",
            "fileSection",
            "fileDescription"
        ],
        successTitle: "File Created Successfully"
    });
}


export { submitUser, submitFile };