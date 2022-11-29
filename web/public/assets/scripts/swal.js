const messages = {
    register_success: {
        icon: "success",
        title: "Account succesvol aangemaakt",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/register",
    },
    failed_create_account: {
        icon: "error",
        title: "Account kon niet worden aangemaak",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/register",
    },
    register_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/register",
    },
    unequal_password: {
        icon: "error",
        title: "Wachtwoorden zijn niet gelijk",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/register",
    },
    email_taken: {
        icon: "error",
        title: "Dit E-mail adres is al in gebruik",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/register",
    },
    login_successfull: {
        icon: "success",
        title: "U bent ingelogd",
        text: "U zal nu worden doorgestuurd naar de home pagina",
        redirect: "/",
    },
    invalid_credentials: {
        icon: "error",
        title: "E-mail en wachtwoord komen niet overeen",
        text: "U zal nu worden doorgestuurd naar de inlog pagina",
        redirect: "/login",
    },
    login_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/register",
    },
    login_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de inlog pagina",
        redirect: "/login",
    },
    register_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/register",
    },
    login_required: {
        icon: "error",
        title: "Toegang geweigerd",
        text: "U zult eerst moeten inloggen. U zal nu worden doorgestuurd naar de aanmeld pagina",
        redirect: "/login",
    },
};

if (messages.hasOwnProperty(message)) {
    swal({
        icon: messages[message].icon,
        toast: true,
        title: messages[message].title,
        text: messages[message].text,
    }).then(() => {
        window.location = messages[message].redirect;
    });
}
