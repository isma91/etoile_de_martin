/*jslint browser: true, node : true*/
/*jslint devel : true*/
/*global $, jQuery*/
$(document).ready(function () {
    var user_nom, user_prenom, user_email, user_tel, parrain_email, parrain_tel, don, error_message, error_count, user_pass, user_pass_valider, user_adress, user_newsletter, user_inscription_error;
    error_message = "";
    error_count = 0;
    function change_to_invalide (id_selector) {
        $('#' + id_selector).css('border-bottom', '1px solid #FF0000');
    }
    function change_to_valide (id_selector) {
        $('#' + id_selector).css('border-bottom', '1px solid #9e9e9e');
    }
    $(document).on('click', '#retour_choix_invation', function() {
        $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><div class="row end_button"><h1>Avez-vous été invité ?</h1><button class="waves-effect waves-teal btn-flat" id="non_parrain">Non</button><button class="waves-effect waves-teal btn-flat" id="oui_parrain">Oui</button></div>');
    });
    $(document).on('click', '#oui_parrain', function() {
        $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><div class="row col s12"><h1>Veuillez ecrire l\'email et/ou le numero de telephone du parrain</h1></div><div class="row col s12" id="div_error_parrain"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="parrain_email" type="email"><label for="parrain_email">Email du Parrain</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="parrain_tel" type="tel"><label for="parrain_tel">Numero de Telephone du Parrain</label></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="valider_parrain">Valider le Parrain</button><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div>');
    });
    $(document).on('click', '#non_parrain', function() {
        $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><div class="row"><div class="col s12" id="user"></div></div><div class="row"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de vous identifier</h2></div><div class="row"><div class="col s12" id="div_error"></div></div><div class="row"><form class="col s12"><div class="row"><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div></div></form><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="valider_don">Valider le don</button><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div></div>');
        $('select').material_select();
    });
    $(document).on('click', '#yes_compte', function(event) {
        $('#the_body').html('<div class="row"><div class="col s12" id="div_error"></div></div><div class="input-field col s12"><img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin" /></div><div class="row"><h1>Bienvenue dans la page de connexion !!</h1><h2>Veuillez remplir le formulaire pour vous connectez</h2></div><div class="row"><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div></div><div class="row"><div class="input-field col s12"><i class="mdi-action-lock-outline prefix"></i><input id="password" type="password"><label for="password">Mot de Passe</label></div></div><div class="row"><button class="waves-effect waves-teal btn-flat" id="connexion">Connexion</button><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div>');
    });
    $(document).on('click', '#non_compte', function() {
        $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><h1>Bienvenue sur la page d\'inscription !!</h1><h2>Nous vous proposons de vous inscrire afin de pouvoir faire des dons plus rapidement et plus simplement !</h2><div class="row"><div class="col s12" id="div_error"></div></div><div class="row"><form class="col s12"><div class="row"><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">location_on</i><input id="user_adress" type="text"><label for="user_adress">Adresse</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">vpn_key</i><input id="user_pass" type="password"><label for="user_pass">Mot de passe</label></div><div class="input-field col s12"><i class="material-icons prefix">vpn_key</i><input id="user_pass_valider" type="password"><label for="user_pass_valider">Valider mot de passe</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><input id="newsletter" type="checkbox" name="newsletter" value="1"><label for="newsletter">s\'abonner a la newsletter</label></div></div></form><div class="row"><button class="waves-effect waves-teal btn-flat" id="valider_inscription">Valider l\'inscription</button><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div></div>');
    });
    $(document).on('click', '#retour_choix_compte', function(event) {
        $("#the_body").html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><div class="row" id="demande_inscription_connexion"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin</h1><h2>Avez-vous déjà un compte ?</h2><button class="waves-effect waves-teal btn-flat" id="no_compte">Non</button><button class="waves-effect waves-teal btn-flat" id="yes_compte">Oui</button></div>');
    });
    $(document).on('click', '#connexion', function() {
        //envoie de la requete ajax pour verifier si ce user exist et si l'email/mot de passe son bon
    });
    $(document).on('click', '#valider_inscription', function() {
        user_inscription_error = "";
        change_to_valide("user_nom");
        change_to_valide("user_prenom");
        change_to_valide("user_adress");
        change_to_valide("user_email");
        change_to_valide("user_pass");
        change_to_valide("user_pass_valider");
        change_to_valide("user_tel");
        user_nom = $.trim($("#user_nom").val());
        user_prenom = $.trim($("#user_prenom").val());
        user_adress = $.trim($("#user_adress").val());
        user_email = $.trim($("#user_email").val());
        user_pass = $("#user_pass").val();
        user_pass_valider = $("#user_pass_valider").val();
        user_tel = $.trim($("#user_tel").val());
        user_newsletter = $("#newsletter").is(":checked");
        if (user_nom === "") {
            change_to_invalide("user_nom");
            user_inscription_error = user_inscription_error + "<p>Nom vide !!</p>"
        }
        if (user_prenom === "") {
            change_to_invalide("user_prenom");
            user_inscription_error = user_inscription_error + "<p>Prenom vide !!</p>"
        }
        if (user_adress === "") {
            change_to_invalide("user_adress");
            user_inscription_error = user_inscription_error + "<p>Adresse vide !!</p>"
        }
        if (user_email === "") {
            change_to_invalide("user_email");
            user_inscription_error = user_inscription_error + "<p>Email vide !!</p>"
        }
        if (user_pass === "") {
            change_to_invalide("user_pass");
            user_inscription_error = user_inscription_error + "<p>Mot de passe vide !!</p>"
        }
        if (user_pass_valider === "") {
            change_to_invalide("user_pass_valider");
            user_inscription_error = user_inscription_error + "<p>Mot de passe de validation vide !!</p>"
        }
        if (user_email !== "") {
            if (user_email.split('@').length === 2) {
                if (user_email.split('@')[0] !== "" && user_email.split('@')[1] !== "") {
                    if (user_email.split('@')[1].split(".").length > 0) {
                    } else {
                        user_inscription_error = user_inscription_error + "<p>Email non valide !!</p>"
                        change_to_invalide("user_email");
                    }
                } else {
                    user_inscription_error = user_inscription_error + "<p>Email non valide !!</p>"
                    change_to_invalide("user_email");
                    }
            } else {
                user_inscription_error = user_inscription_error + "<p>Email non valide !!</p>"
                change_to_invalide("user_email");
            }
        }
        if (user_tel !== "") {
            if (user_tel.length > 9) {
            } else {
                user_inscription_error = user_inscription_error + "<p>Numero non valide !!</p>";
                change_to_invalide("user_tel");
            }
        }
        if (user_pass !== user_pass_valider) {
            user_inscription_error = user_inscription_error + "<p>Vous n'avez pas ecrit deux fois le meme mot de passe !!</p>";
            change_to_invalide("user_pass_valider");
        }
        $("#div_error").html(user_inscription_error);
        if (user_inscription_error === "") {
            $.post('../api/public/index.php', {action: 'user_inscription', user_nom: user_nom, user_prenom: user_prenom, user_adress: user_adress, user_email: user_email, user_pass: user_pass, user_tel: user_tel, user_newsletter: user_newsletter}, function (data, textStatus) {
                if (textStatus === "success") {
                    data = JSON.parse(data);
                    if (data.error === null) {
                        Materialize.toast('<p class="alert-success">' + data.data + '<p>', 3000, 'rounded alert-success');
                    } else {
                        Materialize.toast('<p class="alert-failed">' + data.error + '<p>', 3000, 'rounded alert-failed');
                    }
                    console.log(data);
                }
            });
        }
    });
    $(document).on('click', '#valider_parrain', function() {
        check_parrain_json = {};
        change_to_valide("parrain_email");
        change_to_valide("parrain_tel");
        $("#div_error_parrain").html('');
        parrain_email = $.trim($('#parrain_email').val());
        parrain_tel = $.trim($('#parrain_tel').val());
        choose_parrain_email = false;
        choose_parrain_tel = false;
        if (parrain_email === "" && parrain_tel === "") {
            change_to_invalide("parrain_email");
            change_to_invalide("parrain_tel");
            $("#div_error_parrain").html("<p>Email ou numero de telephone non ecrit !!</p>");
        }
        if (parrain_email !== "") {
            if (parrain_email.split('@').length === 2) {
                if (parrain_email.split('@')[0] !== "" && parrain_email.split('@')[1] !== "") {
                    if (parrain_email.split('@')[1].split(".").length > 0) {
                        choose_parrain_email = true;
                    } else {
                        if (choose_parrain_tel === false) {
                            $("#div_error_parrain").html('<p>Email non valide !!</p>');
                            change_to_invalide("parrain_email");
                        }
                    }
                } else {
                    if (choose_parrain_tel === false) {
                        $("#div_error_parrain").html('<p>Email non valide !!</p>');
                        change_to_invalide("parrain_email");
                    }
                }
            } else {
                if (choose_parrain_tel === false) {
                    $("#div_error_parrain").html('<p>Email non valide !!</p>');
                    change_to_invalide("parrain_email");
                }
            }
        }
        if (parrain_tel !== "") {
            if (parrain_tel.length > 9) {
                choose_parrain_tel = true;
            } else {
                if (choose_parrain_email === false) {
                    $("#div_error_parrain").html("<p>Numero non valide !!</p>");
                    change_to_invalide("parrain_tel");
                }
            }
        }
        check_parrain_json = {};
        if (choose_parrain_tel === true && choose_parrain_email === true) {
            check_parrain_json = {action: 'check_parrain', parrain_tel: parrain_tel, parrain_email: parrain_email};
        } else if (choose_parrain_email === true && choose_parrain_tel === false) {
            check_parrain_json = {action: 'check_parrain', parrain_tel: null, parrain_email: parrain_email};
        } else if (choose_parrain_email === false && choose_parrain_email === true) {
            check_parrain_json = {action: 'check_parrain', parrain_tel: null, parrain_email: parrain_email};
        }
        $.post('../api/public/index.php', check_parrain_json, function (data, textStatus) {
            if (textStatus === "success") {
                data = JSON.parse(data);
                console.log(data);
            }
        });
        //envoie de la requete ajax pour verifier si l'email/tel de ce parrain exist
        //puis ajout dans un localstorage
    });
    /* ces deux localStorage seront utiliser pour savoir si l'utilisateur est déjà connecter ou pas */
    /*console.log(localStorage.etoile_de_martin_user);
    console.log(localStorage.etoile_de_martin_pass);
    if (localStorage.etoile_de_martin_user == undefined) {
        $('#user').html('Vous n\'etes pas connecter, <span id="go_login">cliquer ici</span> pour vous connecter')
    }*/
    $(document).on('change', '#montant_don', function() {
        if ($(this).val() === "autre") {
            $('#input_autre_montant').html('<div class="input-field col s12"><i class="material-icons prefix">€</i><input id="don" type="number"><label for="don">Montant du don</label></div>');
        }
    });
    $(document).on('click', '#valider_don', function() {
        change_to_valide("user_nom");
        change_to_valide("user_prenom");
        change_to_valide("user_email");
        change_to_valide("user_don");
        $('#div_error').html('');
        user_nom = $('#user_nom').val();
        user_prenom = $('#user_prenom').val();
        user_email = $('#user_email').val();
        user_tel = $('#user_tel').val();
        if ($('#don').val() === "" || $('#don').val() < 1 || $('#don').val() == undefined) {
            don = $('#montant_don option:selected').val();
        } else {
            don = $('#don').val();
        }
        if ($.trim(user_nom) === "") {
            change_to_invalide('user_nom');
            error_message = error_message + '<p>Vous devez ecrire votre nom</p>';
            error_count = error_count + 1;
        }
        if ($.trim(user_prenom) === "") {
            change_to_invalide('user_prenom');
            error_message = error_message + '<p>Vous devez ecrire votre prenom</p>';
            error_count = error_count + 1;
        }
        if ($.trim(user_email) === "") {
            change_to_invalide('user_email');
            error_message = error_message + '<p>Vous devez ecrire votre email</p>';
            error_count = error_count + 1;
        }
        if ($.trim(don) < 1 || $.trim(don) === "autre") {
            change_to_invalide('don');
            error_message = error_message + '<p>Vous devez ecrire le montant de votre don</p>';
            error_count = error_count + 1;            
        }
        if (error_count !== 0) {
            $(this).css('background-color', '#FF0000');
            $('#div_error').html(error_message);
            $(this).css('background-color', '#2ab7a9');
            error_message = "";
            error_count = 0;
        } else {
            console.log("nom = " + user_nom);
            console.log("prenom = " + user_prenom);
            console.log("email = " + user_email);
            console.log("tel = " + user_tel);
            console.log("don = " + don);
            //faire la requete ajax pour envoyer le don
        }
    });
});