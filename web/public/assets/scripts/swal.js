const messages = {
    //Registering
    register_success: {
        icon: "success",
        title: "Account succesvol aangemaakt",
        text: "U zult nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    failed_create_account: {
        icon: "error",
        title: "Account kon niet worden aangemaakt",
        text: "U zult nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    register_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zult nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    unequal_password: {
        icon: "error",
        title: "Wachtwoorden zijn niet gelijk",
        text: "U zult nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    email_taken: {
        icon: "error",
        title: "Dit e-mail adres is al in gebruik",
        text: "U zult nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },
    register_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zult nu worden doorgestuurd naar de aanmeld pagina.",
        redirect: "/register",
    },

    //Login
    login_successfull: {
        icon: "success",
        title: "U bent ingelogd",
        text: "U zult nu worden doorgestuurd naar de home pagina.",
        redirect: "/",
    },
    invalid_credentials: {
        icon: "error",
        title: "E-mail en wachtwoord komen niet overeen",
        text: "U zult nu worden doorgestuurd naar de inlog pagina.",
        redirect: "/login",
    },
    login_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zult nu worden doorgestuurd naar de inlog pagina.",
        redirect: "/login",
    },
    login_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zult nu worden doorgestuurd naar de inlog pagina.",
        redirect: "/login",
    },
    login_required: {
        icon: "error",
        title: "Toegang geweigerd",
        text: "U zult eerst moeten inloggen. U zult nu worden doorgestuurd naar de inlogpagina.",
        redirect: "/login",
    },
    invalid_token: {
        icon: "error",
        title: "Token is niet valide",
        text: "U zult opnieuw moeten inloggen. U zult nu worden doorgestuurd naar de inlogpagina.",
        redirect: "/login",
    },

    //Route creation
    route_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zult nu worden doorgestuurd naar de route editor pagina.",
        redirect: "/route-info-editor",
    },
    no_file: {
        icon: "error",
        title: "Er is geen GPX bestand geüpload",
        text: "U zult nu worden doorgestuurd naar de route editor pagina.",
        redirect: "/route-info-editor",
    },
    failed_create_route: {
        icon: "error",
        title: "Route aanmaken is mislukt",
        text: "U zult nu worden doorgestuurd naar de route editor pagina.",
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
        text: "U zult nu worden doorgestuurd naar de route editor pagina.",
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
        text: "U zult nu worden doorgestuurd naar de route overzicht pagina.",
        redirect: "/route-selection",
    },
    invalid_deletion_route: {
        icon: "error",
        title: "Onbekende fout route verwijderen",
        text: "U zult nu worden doorgestuurd naar de route overzicht pagina.",
        redirect: "/route-selection",
    },
    error_routes: {
        icon: "error",
        title: "Onbekende fout routes",
        text: "U zult nu worden doorgestuurd naar de home pagina.",
        redirect: "/",
    },
    //POI
    poi_success: {
        icon: "success",
        title: "Bezienswaardigheid succesvol aangemaakt",
        text: "U zult nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    failed_create_poi: {
        icon: "error",
        title: "Bezienswaardigheid aanmaken is mislukt",
        text: "U zult nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    poi_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zult nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    poi_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zult nu worden doorgestuurd naar de bezienswaardigheid toevoegen pagina.",
        redirect: "/route-poi-editor",
    },
    poi_invalid_id: {
        icon: "error",
        title: "Route ID niet valide",
        text: "U zult nu worden doorgestuurd naar de route overzicht pagina.",
        redirect: "/routes",
    },
    //Sponsors
    successful_deletion: {
        icon: "success",
        title: "Sponsor succesvol verwijderd",
        text: "U zult nu worden doorgestuurd naar de sponsor overzicht pagina.",
        redirect: "/sponsors",
    },
    deletion_error: {
        icon: "error",
        title: "Sponsor kon niet verwijderd worden",
        text: "U zult nu worden doorgestuurd naar de sponsor overzicht pagina.",
        redirect: "/sponsors",
    },
    invalid_img: {
        icon: "error",
        title: "Sponsor afbeeldingen konden niet geladen worden",
        text: "U zult nu worden doorgestuurd naar de home pagina.",
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
    sponsor_unkown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zult nu worden doorgestuurd naar de sponsor aanmaken pagina.",
        redirect: "/sponsor-editor",
    },
    sponsor_create_succes: {
        icon: "success",
        title: "Sponsor aangemaakt",
        text: "U zult nu worden doorgestuurd naar het sponsor overzicht.",
        redirect: "/sponsors",
    },
    failed_validation: {
        icon: "error",
        title: "Sponsor info niet valide",
        text: "U zult nu worden doorgestuurd naar de sponsor aanmaken pagina.",
        redirect: "/sponsor-editor",
    },
    //Profile
    profile_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    //Edit credentials
    profile_updated: {
        icon: "success",
        title: "Accountgegevens succesvol geüpdate",
        text: "Om de veranderingen te zien zult u opniew moeten inloggen. U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    account_failed_validation: {
        icon: "error",
        title: "Ingevulde gegevens zijn niet valide",
        text: "U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    failed_update_credentials: {
        icon: "error",
        title: "Accountgegevens konden niet worden geüpdate",
        text: "U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    //Edit password
    edit_password_changed: {
        icon: "success",
        title: "Wachtwoord succesvol aangepast",
        text: "U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    edit_incorrect_password: {
        icon: "error",
        title: "Wachtwoord incorrect",
        text: "U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    invalid_edit_pass_match: {
        icon: "error",
        title: "Wachtwoorden komen niet overeen",
        text: "U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    failed_update_pass: {
        icon: "error",
        title: "Wachtwoord kon niet worden aangepast",
        text: "U zult nu worden doorgestuurd naar de profiel pagina.",
        redirect: "/profile",
    },
    //Profiles
    confirm_delete_profile: {
        icon: "warning",
        title: "Let op",
        text: "Weet u zeker dat u dit profiel wilt verwijderen?",
        redirect: "/api/users/delete/",
        cancelRedirect: "/profiles",
        buttons: [true, true],
    },
    profile_successful_deletion: {
        icon: "success",
        title: "Profiel succesvol verwijdert",
        text: "U zult nu worden doorgestuurd naar de profiel overzicht pagina.",
        redirect: "/profiles",
    },
    profile_deletion_error: {
        icon: "error",
        title: "Profiel kon niet worden verwijdert",
        text: "U zult nu worden doorgestuurd naar de profiel overzicht pagina.",
        redirect: "/profiles",
    },
    last_profile_delete: {
        icon: "error",
        title: "Laatste profiel kon niet verwijderd worden",
        text: "Er moet altijd minimaal één account zijn. U zult nu worden doorgestuurd naar de profiel overzicht pagina.",
        redirect: "/profiles",
    },
    profiles_unknown_error: {
        icon: "error",
        title: "Onbekende fout opgetreden",
        text: "U zult nu worden doorgestuurd naar de profiel overzicht pagina.",
        redirect: "/profiles",
    },
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
