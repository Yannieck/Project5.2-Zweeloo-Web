if (success == "register_success") {
    swal({
        icon: "success",
        toast: true,
        title: "Account succesvol aangemaakt",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
    }).then(() => {
        window.location = "/register";
    });
} else if (success == "failed_create_account") {
    swal({
        icon: "error",
        toast: true,
        title: "Account kon niet worden aangemaakt",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
    }).then(() => {
        window.location = "/register";
    });
} else if (success == "register_unknown_error") {
    swal({
        icon: "error",
        toast: true,
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
    }).then(() => {
        window.location = "/register";
    });
} else if (success == "unequal_password") {
    swal({
        icon: "error",
        toast: true,
        title: "Wachtwoorden zijn niet gelijk",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
    }).then(() => {
        window.location = "/register";
    });
} else if (success == "email_taken") {
    swal({
        icon: "error",
        toast: true,
        title: "Dit E-mail adres is al in gebruik",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
    }).then(() => {
        window.location = "/register";
    });
} else if (success == "login_successfull") {
    swal({
        icon: "success",
        toast: true,
        title: "U bent ingelogd",
        text: "U zal nu worden doorgestuurd naar de home pagina",
    }).then(() => {
        window.location = "/";
    });
} else if (success == "invalid_credentials") {
    swal({
        icon: "error",
        toast: true,
        title: "E-mail en wachtwoord komen niet overeen",
        text: "U zal nu worden doorgestuurd naar de inlog pagina",
    }).then(() => {
        window.location = "/login";
    });
} else if (success == "login_unknown_error") {
    swal({
        icon: "error",
        toast: true,
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
    }).then(() => {
        window.location = "/register";
    });
} else if (success == "login_failed_validation") {
    swal({
        icon: "error",
        toast: true,
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de inlog pagina",
    }).then(() => {
        window.location = "/login";
    });
} else if (success == "register_failed_validation") {
    swal({
        icon: "error",
        toast: true,
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
    }).then(() => {
        window.location = "/register";
    });
}
