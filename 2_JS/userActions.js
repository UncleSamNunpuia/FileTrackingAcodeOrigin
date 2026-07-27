


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


export { submitUser };