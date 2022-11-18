const axios = window.axios;
const swal = window.sweetAlert;

const register_button = document.getElementById("register_button");

register_button.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_repeat = document.getElementById("password_repeat").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;

    axios
        .post(
            "/auth/register",
            {
                email: email,
                password: password,
                password_repeat: password_repeat,
                first_name: first_name,
                last_name: last_name,
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept-Type": "application/json",
                },
            }
        )
        .then((res) => {
            let data = res.data;

            //Create SweetAlert
            return swal({
                icon: "success",
                toast: true,
                title: "Registration succesfull",
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
