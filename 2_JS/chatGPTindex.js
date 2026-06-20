/* --------------------------
   SAMPLE USERS
---------------------------*/
// this is to be replaced by a real database in production
// fetch(WEB_APP_URL,{
//     method:"POST",
//     body:JSON.stringify({
//         username,
//         password
//     })
// })
// .then(response => response.json())
// .then(data => {

//     if(data.success){

//         switch(data.role){

//             case "SUPER":
//                 window.location.href =
//                     "super-dashboard.html";
//                 break;

//             case "ADMIN":
//                 window.location.href =
//                     "admin-dashboard.html";
//                 break;

//             case "USER":
//                 window.location.href =
//                     "file-tracking.html";
//                 break;
//         }
//     }
// });
const users = {

    superuser:{

        password:"1234",

        role:"SUPER"
    },

    admin:{

        password:"1234",

        role:"ADMIN"
    },

    user:{

        password:"1234",

        role:"USER"
    }
};

/* --------------------------
   LOGIN
---------------------------*/

document
// .getElementById("loginBtn")
.getElementById("loginForm")
.addEventListener("submit", login);
// .addEventListener("click", login);

// function login(){
function login(event){

    event.preventDefault();

    const username =
        document
        .getElementById("username")
        .value
        .trim();

    const password =
        document
        .getElementById("password")
        .value
        .trim();

    const message =
        document
        .getElementById("message");

    const user =
        users[username];

    if(!user){

        message.className =
            "message error";

        message.textContent =
            "User not found";

        return;
    }

    if(user.password !== password){

        message.className =
            "message error";

        message.textContent =
            "Invalid Password";

        return;
    }

    message.className =
        "message success";

    message.textContent =
        "Login Successful";

    /* ------------------
       REDIRECTION
    -------------------*/

    switch(user.role){

        case "SUPER":

            window.location.href =
                "../ChatGPT/html/AdminLanding/ChatGPTAdminLanding.html";
                // "super-dashboard.html";

            break;

        case "ADMIN":

            window.location.href =
                "../ChatGPT/html/AdminLanding/ChatGPTAdminLanding.html";

            break;

        case "USER":

            window.location.href =
                "../ChatGPT/html/DealingLanding/ChatGPTDealingLanding.html";
                // "file-tracking.html";
            break;
    }
}