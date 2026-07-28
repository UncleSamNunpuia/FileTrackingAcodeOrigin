import { submitForm } from "./B_1superadmin_dashboard.js";

function submitUser() {
    // alert("submitUser function called");
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


export { submitUser };