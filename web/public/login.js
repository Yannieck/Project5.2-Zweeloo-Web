const axios = window.axios;
const swal = window.sweetAlert;

const login_button = document.getElementById("login_button");

login_button.addEventListener("click", () => {
    //Get the email and password from the fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //Put the login data into the post with axios
    axios
        .post(
            "/auth/login",
            {
                email: email,
                password: password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Type": "application/json",
                },
            }
        )
        //If the post was succesfull, no errors occured
        .then((res) => {
            let data = res.data;

            //Create SweetAlert
            return swal({
                icon: "success",
                toast: true,
                title: "Login succesfull",
            }).then(() => {
                window.location = data.redirect;
            });
        })
        //If the post had errors
        .catch(function (error) {
            //Create SweetAlert
            return swal({
                icon: "error",
                toast: true,
                title: "Login failed",
                text: error.message + " : " + error.response.data.message,
            }).then(() => {
                window.location = error.response.data.redirect;
            });
        });
});
