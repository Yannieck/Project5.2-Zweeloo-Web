const messages = {
    //Registering
    register_success: {
        icon: "success",
        title: "Account succesvol aangemaakt",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    failed_create_account: {
        icon: "error",
        title: "Account kon niet worden aangemaakt",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    register_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    unequal_password: {
        icon: "error",
        title: "Wachtwoorden zijn niet gelijk",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    email_taken: {
        icon: "error",
        title: "Dit e-mail adres is al in gebruik",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    register_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },

    //Login
    login_successfull: {
        icon: "success",
        title: "U bent ingelogd",
        text: "U zal nu worden doorgestuurd naar de home pagina.",
        redirect: "/",
    },
    invalid_credentials: {
        icon: "error",
        title: "E-mail en wachtwoord komen niet overeen",
        text: "U zal nu worden doorgestuurd naar de inlog pagina.",
        redirect: "/login",
    },
    login_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de inlog pagina.",
        redirect: "/login",
    },
    login_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de inlog pagina.",
        redirect: "/login",
    },
    login_required: {
        icon: "error",
        title: "Toegang geweigerd",
        text: "U zult eerst moeten inloggen. U zal nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/login",
    },

    //Route creation
    route_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de route editor pagina.",
        redirect: "/route-info-editor",
    },
    no_file: {
        icon: "error",
        title: "Er is geen GPX bestand geüpload",
        text: "U zal nu worden doorgestuurd naar de route editor pagina.",
        redirect: "/route-info-editor",
    },
    failed_create_route: {
        icon: "error",
        title: "Route aanmaken is mislukt",
        text: "U zal nu worden doorgestuurd naar de route editor pagina.",
        redirect: "/route-info-editor",
    },
    route_invalid_geojson: {
        icon: "error",
        title: "GPX validatie mislukt",
        text: "Controleer of uw GPX bestand zowel een route als punten bevat.",
        redirect: "/route-info-editor",
    },
    route_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de route editor pagina.",
        redirect: "/route-info-editor",
    },
    //route deletion
    confirm_delete_route: {
        icon: "warning",
        title: "Let op",
        text: "Weet u zeker dat u deze route wilt verwijderen?",
        redirect: "/api/routes/delete/",
        cancelRedirect: "/route-selection",
        buttons: [true, true],
    },
    successful_deletion_route: {
        icon: "success",
        title: "Route succesvol verwijderd",
        text: "U zal nu worden doorgestuurd naar de route overzicht pagina.",
        redirect: "/route-selection",
    },
    //POI
    poi_success: {
        icon: "success",
        title: "Bezienswaardigheid succesvol aangemaakt",
        text: "U zal nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    failed_create_poi: {
        icon: "error",
        title: "Bezienswaardigheid aanmaken is mislukt",
        text: "U zal nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    poi_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zal nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    poi_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zal nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    poi_invalid_id: {
        icon: "error",
        title: "Route ID niet valide",
        text: "U zal nu worden doorgestuurd naar de route overzicht pagina.",
        redirect: "/routes",
    },
    //Sponsors
    successful_deletion: {
        icon: "success",
        title: "Sponsor succesvol verwijderd",
        text: "U zal nu worden doorgestuurd naar de sponsor overzicht pagina.",
        redirect: "/sponsors",
    },
    deletion_error: {
        icon: "error",
        title: "Sponsor kon niet verwijderd worden",
        text: "U zal nu worden doorgestuurd naar de sponsor overzicht pagina.",
        redirect: "/sponsors",
    },
    invalid_img: {
        icon: "error",
        title: "Sponsor afbeeldingen konden niet geladen worden",
        text: "U zal nu worden doorgestuurd naar de home pagina.",
        redirect: "/",
    },
    confirm_delete: {
        icon: "warning",
        title: "Let op",
        text: "Weet u zeker dat u deze sponsor wilt verwijderen?",
        redirect: "/api/sponsors/delete/",
        cancelRedirect: "/sponsors",
        buttons: [true, true],
    },
    successful_deletion: {
        icon: "success",
        title: "Sponsor succesvol verwijdert",
        text: "U zal nu worden doorgestuurd naar de sponsor pagina.",
        redirect: "/sponsors",
    }
};

if (messages.hasOwnProperty(message)) {
    let redirect = "";
    if (typeof additions !== "undefined") {
        if (additions != null) {
            redirect = additions;
        }
    }

    if (typeof messages[message].buttons == "undefined") {
        // Normal notification swal with single OK button
        swal({
            icon: messages[message].icon,
            toast: true,
            title: messages[message].title,
            text: messages[message].text,
        }).then(() => {
            window.location = messages[message].redirect + redirect;
        });
    } else {
        // Confirmation swal with OK/Cancel buttons
        swal({
            icon: messages[message].icon,
            toast: true,
            title: messages[message].title,
            text: messages[message].text,
            buttons: messages[message].buttons,
        }).then((success) => {
            if (success) {
                window.location = messages[message].redirect + redirect;
            } else {
                window.location = messages[message].cancelRedirect;
            }
        });
    }
}
