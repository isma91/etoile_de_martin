﻿/*jslint browser: true, node : true*/
/*jslint devel : true*/
/*global $, jQuery*/
/*minifier le code => + perf !!*/
$(document).ready(function () {
    var user_nom, user_prenom, user_email, user_tel, parrain_email, don, error_message, error_count, user_pass, user_pass_valider, user_adress, user_newsletter, user_inscription_error, error_check_parrain, hello_asso_widget, window_width, window_height, user_ville, user_code_postal, user_pays, parrain_email_change, choose_parrain_email_change, error_check_parrain, connection_status, iframe_don_selected, iframe_user_info_selected, iframe_pourboire_selected, check_form_don_second_step, check_form_don_third_step, check_form_don_fourth_step, user_carte, iframe_cb_selected, user_json;
    error_message = "";
    error_count = 0;
    window_width = $(window).width();
    window_height = $(window).height();

    window.addEventListener("offline", function() {
        Materialize.toast('<p class="alert-failed">Pas de connexion internet !!<p>', 3000, 'rounded alert-failed');
    });

    window.addEventListener("online", function() {
        Materialize.toast('<p class="alert-success">Vous etes connectez à internet !!<p>', 3000, 'rounded alert-success');
    });

    function make_nav_work () {
        if (check_form_don("#form_don", "#user_carte") === true) {
            if (localStorage.getItem("etoile_de_martin_user_email") === null && localStorage.getItem("etoile_de_martin_parrain_email") === null) {
                $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="user_civilite"><option value="Monsieur">Monsieur</option><option value="Madame">Madame</option></select><label>Civilité</label></div><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">location_on</i><input id="user_adress" type="text"><label for="user_adress">Adresse</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_ville" type="text"><label for="user_ville">Ville</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_code_postal" type="number"><label for="user_code_postal">Code Postal</label></div><div class="input-field col s12"><i class="material-icons prefix">account_balance</i><input id="user_pays" type="text"><label for="user_pays">Pays</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div><div class="input-field col s12"><select id="user_inscription"><option value="non">Non</option><option value="oui">Oui</option></select><label>Voulez-vous être inscrit ?</label></div><div id="create_user_password"></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
                $('#menu_connection').html('<h1>Bienvenue dans la page de connexion !!</h1><h2>Veuillez remplir le formulaire pour vous connectez</h2><div class="row" id="div_error"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email_connexion" type="email" placeholder="email"></div><div class="input-field col s12"><i class="mdi-action-lock-outline prefix"></i><input id="user_pass" type="password" placeholder="Mot de passe"></div><button class="waves-effect waves-teal btn-flat" id="connexion">Connexion</button>');
                $('#menu_parrain').html('<div class="row" style="width:100%;"><h1>Pas de parrain !!</h1></div>');
            }
            if (localStorage.getItem("etoile_de_martin_user_email") === null && localStorage.getItem("etoile_de_martin_parrain_email") !== null) {
                $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="user_civilite"><option value="Monsieur">Monsieur</option><option value="Madame">Madame</option></select><label>Civilité</label></div><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">location_on</i><input id="user_adress" type="text"><label for="user_adress">Adresse</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_ville" type="text"><label for="user_ville">Ville</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_code_postal" type="number"><label for="user_code_postal">Code Postal</label></div><div class="input-field col s12"><i class="material-icons prefix">account_balance</i><input id="user_pays" type="text"><label for="user_pays">Pays</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div><div class="input-field col s12"><select id="user_inscription"><option value="non">Non</option><option value="oui">Oui</option></select><label>Voulez-vous être inscrit ?</label></div><div id="create_user_password"></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
                $('#menu_connection').html('<h1>Bienvenue dans la page de connexion !!</h1><h2>Veuillez remplir le formulaire pour vous connectez</h2><div class="row" id="div_error"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email_connexion" type="email" placeholder="email"></div><div class="input-field col s12"><i class="mdi-action-lock-outline prefix"></i><input id="user_pass" type="password" placeholder="Mot de passe"></div><button class="waves-effect waves-teal btn-flat" id="connexion">Connexion</button>');
                $('#menu_parrain').html('<div class="row" style="width:100%;"><h1>Parrain :</h1> <p>' + localStorage.getItem("etoile_de_martin_parrain_email") + '</p></div><div class="row col s12" id="div_error_parrain_change"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="parrain_email_change" type="email" placeholder="Email du parrain"></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="changer_parrain">Changer de Parrain</button></div>');
            }
            if (localStorage.getItem("etoile_de_martin_user_email") !== null && localStorage.getItem("etoile_de_martin_parrain_email") === null) {
                $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
                $('#menu_connection').html('Bienvenue <p>' + localStorage.getItem("etoile_de_martin_user_email") + '</p><div class="row"><button class="waves-effect waves-teal btn-flat" id="deconnexion">Deconnexion</button></div>');
                $('#menu_parrain').html('<div class="row" style="width:100%;"><h1>Pas de parrain !!</h1></div>');
            }
            if (localStorage.getItem("etoile_de_martin_user_email") !== null && localStorage.getItem("etoile_de_martin_parrain_email") !== null) {
                $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
                $('#menu_connection').html('Bienvenue <p>' + localStorage.getItem("etoile_de_martin_user_email") + '</p><div class="row"><button class="waves-effect waves-teal btn-flat" id="deconnexion">Deconnexion</button></div>');
                $('#menu_parrain').html('<div class="row" style="width:100%;"><h1>Parrain :</h1> <p>' + localStorage.getItem("etoile_de_martin_parrain_email") + '</p></div><div class="row col s12" id="div_error_parrain_change"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="parrain_email_change" type="email" placeholder="Email du parrain"></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="changer_parrain">Changer de Parrain</button></div>');
            }
            $('select').material_select();
            hello_asso_widget = $('<iframe/>', {
                id:'mfgWidget',
                src:'https://www.helloasso.com/associations/l-etoile-de-martin/formulaire-don',
                style:'width:' + window_width + 'px;height: ' + window_height + 'px;border:none;',
                load: function () {
                    $("#button_valider_don").html('<button class="waves-effect waves-teal btn-flat" id="valider_don">Valider le don</button>');
                }
            });
            $("#fiscal").html("<p>Coût réel de votre don après déduction fiscale : " + ($('#montant_don').val() - (0.34 * $('#montant_don').val())).toFixed(2) + " €</p>");
            $('#widget').append(hello_asso_widget);
            $('#widget').css('display', 'none');
        } else {
            if (localStorage.getItem("etoile_de_martin_user_email") === null) {
                $('#menu_connection').html('<h1>Bienvenue dans la page de connexion !!</h1><h2>Veuillez remplir le formulaire pour vous connectez</h2><div class="row" id="div_error"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email_connexion" type="email" placeholder="email"></div><div class="input-field col s12"><i class="mdi-action-lock-outline prefix"></i><input id="user_pass" type="password" placeholder="Mot de passe"></div><button class="waves-effect waves-teal btn-flat" id="connexion">Connexion</button>');
            } else {
                $('#menu_connection').html('Bienvenue <p>' + localStorage.getItem("etoile_de_martin_user_email") + '</p><div class="row"><button class="waves-effect waves-teal btn-flat" id="deconnexion">Deconnexion</button></div>');
            }
            if (localStorage.getItem("etoile_de_martin_parrain_email") === null) {
                $('#menu_parrain').html('<div class="row" style="width:100%;"><h1>Pas de parrain !!</h1></div>');
            } else {
                $('#menu_parrain').html('<div class="row" style="width:100%;"><h1>Parrain :</h1> <p>' + localStorage.getItem("etoile_de_martin_parrain_email") + '</p></div><div class="row col s12" id="div_error_parrain_change"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="parrain_email_change" type="email" placeholder="Email du parrain"></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="changer_parrain">Changer de Parrain</button></div>');
            }
        }
    }

    function check_if_parrain () {
        if (localStorage.getItem("etoile_de_martin_parrain_email") === null) {
            $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row end_button"><h1>Vous n\'avez pas de parrain !! Voulez-vous en ajouter ?</h1><button class="waves-effect waves-teal btn-flat" id="non_parrain">Non</button><button class="waves-effect waves-teal btn-flat" id="oui_parrain">Oui</button></div>');
            $("#menu").sideNav();
            make_nav_work();
        } else {
            go_form_don();
        }
    }

    check_if_parrain();
    //localStorage.clear();
    
    //changer cette valeur pour mettre le path du server de l'association
    path_to_ajax = 'http://localhost.ismaydogmus.fr/api/public/index.php';
    //path_to_ajax = '../api/public/index.php';

    function change_to_invalide (id_selector) {
        $('#' + id_selector).css('border-bottom', '1px solid #FF0000');
    }
    function change_to_valide (id_selector) {
        $('#' + id_selector).css('border-bottom', '1px solid #9e9e9e');
    }
    function check_form_don (id_iframe, id_input) {
        if ($(id_iframe).contents().find(id_input).val() === undefined) {
            return false;
        } else {
            return true;
        }
    }
    function go_form_don () {
        if (localStorage.getItem("etoile_de_martin_user_email") === null && localStorage.getItem("etoile_de_martin_parrain_email") === null) {
            $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="user_civilite"><option value="Monsieur">Monsieur</option><option value="Madame">Madame</option></select><label>Civilité</label></div><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">location_on</i><input id="user_adress" type="text"><label for="user_adress">Adresse</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_ville" type="text"><label for="user_ville">Ville</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_code_postal" type="number"><label for="user_code_postal">Code Postal</label></div><div class="input-field col s12"><i class="material-icons prefix">account_balance</i><input id="user_pays" type="text"><label for="user_pays">Pays</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div><div class="input-field col s12"><select id="user_inscription"><option value="non">Non</option><option value="oui">Oui</option></select><label>Voulez-vous être inscrit ?</label></div><div id="create_user_password"></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
        }
        if (localStorage.getItem("etoile_de_martin_user_email") === null && localStorage.getItem("etoile_de_martin_parrain_email") !== null) {
            $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="user_civilite"><option value="Monsieur">Monsieur</option><option value="Madame">Madame</option></select><label>Civilité</label></div><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">location_on</i><input id="user_adress" type="text"><label for="user_adress">Adresse</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_ville" type="text"><label for="user_ville">Ville</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_code_postal" type="number"><label for="user_code_postal">Code Postal</label></div><div class="input-field col s12"><i class="material-icons prefix">account_balance</i><input id="user_pays" type="text"><label for="user_pays">Pays</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div><div class="input-field col s12"><select id="user_inscription"><option value="non">Non</option><option value="oui">Oui</option></select><label>Voulez-vous être inscrit ?</label></div><div id="create_user_password"></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
        }
        if (localStorage.getItem("etoile_de_martin_user_email") !== null && localStorage.getItem("etoile_de_martin_parrain_email") === null) {
            $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
        }
        if (localStorage.getItem("etoile_de_martin_user_email") !== null && localStorage.getItem("etoile_de_martin_parrain_email") !== null) {
            $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row"><div class="col s12" id="user"></div></div><div class="row" id="div_h1_h2"><h1>Bienvenue sur l’appli « Un geste solidaire » pour l’Etoile de Martin pour soutenir la recherche sur les cancers de l’enfant</h1><h2>Pour faire un don, merci de remplir le formulaire</h2></div><div class="row"><div class="col s12" id="div_error_don"></div></div><div class="row" id="form_don"><form class="col s12"><div class="row"><div class="input-field col s12"><select id="montant_don"><option value="10">10€</option><option value="20">20€</option><option value="30">30€</option><option value="autre">autre montant</option></select><label>Montant du don</label></div><div id="input_autre_montant"></div><div class="input-field col s12"><select id="user_anonyme"><option value="non">Non</option><option value="oui">Oui</option></select><label>Don anonyme ?</label></div><div class="input-field col s12"><select id="user_carte"><option value="CB" data-icon="img/cb.jpg" class="left responsive-img">Carte Bleue</option><option value="E-CARTEBLEUE" data-icon="img/e_cb.jpg" class="left responsive-img">E-Carte bleue</option><option value="MAESTRO" data-icon="img/maestro.png" class="left responsive-img">Maestro</option><option value="MASTERCARD" data-icon="img/mastercard.png" class="left responsive-img">Mastercard</option><option value="VISA" data-icon="img/visa.png" class="left responsive-img">Visa</option><option value="VISA_ELECTRON" data-icon="img/visa_electron.png" class="left responsive-img">Visa Electron</option></select><label>Choix type carte</label></div></div></form><div class="row" id="fiscal"></div><div class="row end_button" id="button_valider_don"><div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div><div class="row" id="widget"></div>');
        }
        make_nav_work();
        $("#menu").sideNav();
        $('select').material_select();
        hello_asso_widget = $('<iframe/>', {
            id:'mfgWidget',
            src:'https://www.helloasso.com/associations/l-etoile-de-martin/formulaire-don',
            style:'width:' + window_width + 'px;height: ' + window_height + 'px;border:none;',
            load: function () {
                $("#button_valider_don").html('<button class="waves-effect waves-teal btn-flat" id="valider_don">Valider le don</button>');
            }
        });
        $("#fiscal").html("<p>Coût réel de votre don après déduction fiscale : " + ($('#montant_don').val() - (0.34 * $('#montant_don').val())).toFixed(2) + " €</p>");
        $('#widget').append(hello_asso_widget);
        $('#widget').css('display', 'none');
    }
    $(document).on('click', '#retour_choix_invation', function() {
        check_if_parrain();
    });
    $(document).on('click', '#oui_parrain', function() {
        $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><nav id="slide-out" class="side-nav"><div id="menu_nav"><div id="menu_connection"></div><div id="menu_parrain"></div></div></nav><a href="#" class="button-collapse" id="menu" data-activates="slide-out"><i class="material-icons medium">perm_identity</i></a><div class="row col s12"><h1>Veuillez ecrire l\'email du parrain</h1></div><div class="row col s12" id="div_error_parrain"></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="parrain_email" type="email"><label for="parrain_email">Email du Parrain</label></div><div class="row end_button"><button class="waves-effect waves-teal btn-flat" id="valider_parrain">Valider le Parrain</button><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button><button class="waves-effect waves-teal btn-flat" id="go_form_don">Acceder au formulaire de don</button></div>');
        $("#menu").sideNav();
        make_nav_work();
    });
    $(document).on('click', '#non_parrain', function() {
        go_form_don();
    });
    $(document).on('click', '#non_compte', function() {
        $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><h1>Bienvenue sur la page d\'inscription !!</h1><h2>Nous vous proposons de vous inscrire afin de pouvoir faire des dons plus rapidement et plus simplement !</h2><div class="row"><div class="col s12" id="div_error"></div></div><div class="row"><form class="col s12"><div class="row"><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">location_on</i><input id="user_adress" type="text"><label for="user_adress">Adresse</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_ville" type="text"><label for="user_ville">Ville</label></div><div class="input-field col s12"><i class="material-icons prefix">location_city</i><input id="user_code_postal" type="number"><label for="user_code_postal">Code Postal</label></div><div class="input-field col s12"><i class="material-icons prefix">account_balance</i><input id="user_pays" type="text"><label for="user_pays">Pays</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">vpn_key</i><input id="user_pass" type="password"><label for="user_pass">Mot de passe</label></div><div class="input-field col s12"><i class="material-icons prefix">vpn_key</i><input id="user_pass_valider" type="password"><label for="user_pass_valider">Valider mot de passe</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><input id="newsletter" type="checkbox" name="newsletter" value="1"><label for="newsletter">s\'abonner a la newsletter</label></div></div></form><div class="row"><button class="waves-effect waves-teal btn-flat" id="valider_inscription">Valider l\'inscription</button><button class="waves-effect waves-teal btn-flat" id="retour_choix_invation">Retour au choix de l\'invitation</button></div></div>');
        $("#menu").sideNav();
        make_nav_work();
    });
    function check_parrain_email () {
        change_to_valide("parrain_email");
        $("#div_error_parrain").html('');
        parrain_email = $.trim($('#parrain_email').val());
        choose_parrain_email = false;
        error_check_parrain = "";
        if (parrain_email === "") {
            error_check_parrain = error_check_parrain + '<p>Email vide !!</p>';
            change_to_invalide("parrain_email");
        }
        if (parrain_email !== "") {
            if (parrain_email.split('@').length === 2) {
                if (parrain_email.split('@')[0] !== "" && parrain_email.split('@')[1] !== "") {
                    if (parrain_email.split('@')[1].split(".").length > 1) {
                        choose_parrain_email = true;
                    } else {
                        error_check_parrain = error_check_parrain + '<p>Email non valide !!</p>';
                        change_to_invalide("parrain_email");
                    }
                } else {
                    error_check_parrain = error_check_parrain + '<p>Email non valide !!</p>';
                    change_to_invalide("parrain_email");
                }
            } else {
                error_check_parrain = error_check_parrain + '<p>Email non valide !!</p>';
                change_to_invalide("parrain_email");
            }
        }
        $("#div_error_parrain").html(error_check_parrain);
        if (choose_parrain_email === true) {
            $.post(path_to_ajax, {action: 'check_parrain', parrain_email: parrain_email}, function (data, textStatus) {
                if (textStatus === "success") {
                    data = JSON.parse(data);
                    if (data.error === null) {
                        if (data.data === localStorage.getItem("etoile_de_martin_user_email")) {
                            localStorage.getItem("etoile_de_martin_parrain_email", "");
                            Materialize.toast('<p class="alert-failed">Vous ne pouvez pas etre le parrain de vous meme !!<p>', 3000, 'rounded alert-failed');
                        } else {
                            localStorage.setItem("etoile_de_martin_parrain_email", parrain_email);
                            Materialize.toast('<p class="alert-success">L\'email ' + parrain_email + ' a bien été ajouter comme votre parrain ! Vous pouvez changer votre parrain a tout moment via votre profil !!<p>', 3000, 'rounded alert-success');
                            make_nav_work();
                        }
                    } else {
                            localStorage.setItem("etoile_de_martin_parrain_email", parrain_email);
                            Materialize.toast('<p class="alert-success">L\'email ' + parrain_email + ' a bien été ajouter comme votre parrain ! Vous pouvez changer votre parrain a tout moment via votre profil !!<p>', 3000, 'rounded alert-success');
                            make_nav_work();
                    }
                }
            });
        }
    }
    function check_parrain_change_email () {
        change_to_valide("parrain_email_change");
        $("#div_error_parrain_change").html('');
        parrain_email_change = $.trim($('#parrain_email_change').val());
        choose_parrain_email_change = false;
        error_check_parrain = "";
        if (parrain_email_change === "") {
            error_check_parrain = error_check_parrain + '<p>Email vide !!</p>';
            change_to_invalide("parrain_email_change");
        }
        if (parrain_email_change !== "") {
            if (parrain_email_change.split('@').length === 2) {
                if (parrain_email_change.split('@')[0] !== "" && parrain_email_change.split('@')[1] !== "") {
                    if (parrain_email_change.split('@')[1].split(".").length > 1) {
                        choose_parrain_email_change = true;
                    } else {
                        error_check_parrain = error_check_parrain + '<p>Email non valide !!</p>';
                        change_to_invalide("parrain_email_change");
                    }
                } else {
                    error_check_parrain = error_check_parrain + '<p>Email non valide !!</p>';
                    change_to_invalide("parrain_email_change");
                }
            } else {
                error_check_parrain = error_check_parrain + '<p>Email non valide !!</p>';
                change_to_invalide("parrain_email_change");
            }
        }
        $("#div_error_parrain_change").html(error_check_parrain);
        if (choose_parrain_email_change === true) {
            $.post(path_to_ajax, {action: 'check_parrain', parrain_email: parrain_email_change}, function (data, textStatus) {
                if (textStatus === "success") {
                    data = JSON.parse(data);
                    if (data.error === null) {
                        if (data.data === localStorage.getItem("etoile_de_martin_user_email")) {
                            localStorage.getItem("etoile_de_martin_parrain_email", "");
                            Materialize.toast('<p class="alert-failed">Vous ne pouvez pas etre le parrain de vous meme !!<p>', 3000, 'rounded alert-failed');
                        } else {
                            localStorage.setItem("etoile_de_martin_parrain_email", parrain_email_change);
                            Materialize.toast('<p class="alert-success">Vous avez bien changer votre parrain par ' + parrain_email_change + ' !!<p>', 3000, 'rounded alert-success');
                            make_nav_work();
                        }
                    } else {
                            localStorage.setItem("etoile_de_martin_parrain_email", parrain_email_change);
                            Materialize.toast('<p class="alert-success">Vous avez bien changer votre parrain par ' + parrain_email_change + ' !!<p>', 3000, 'rounded alert-success');
                            make_nav_work();
                    }
                }
            });
        }
    }
    $(document).on('keyup', '#parrain_email', function (event) {
        if (event.keyCode === 13) {
            check_parrain_email();
        }
    });
    $(document).on('click', '#valider_parrain', function() {
        check_parrain_email();
    });
    $(document).on('click', '#changer_parrain', function() {
        check_parrain_change_email();
    });
    $(document).on('click', '#go_form_don', function() {
        go_form_don();
    });
    $(document).on('click', '#connexion', function() {
        change_to_valide("user_email_connexion");
        $("#div_error").html('');
        user_email = $.trim($('#user_email_connexion').val());
        user_pass = $("#user_pass").val();
        choose_user_email = false;
        error_connexion = "";
        if (user_email === "") {
            error_connexion = error_connexion + '<p>Email vide !!</p>';
            change_to_invalide("user_email_connexion");
        }
        if (user_email !== "") {
            if (user_email.split('@').length === 2) {
                if (user_email.split('@')[0] !== "" && user_email.split('@')[1] !== "") {
                    if (user_email.split('@')[1].split(".").length > 1) {
                        choose_user_email = true;
                    } else {
                        error_connexion = error_connexion + '<p>Email non valide !!</p>';
                        change_to_invalide("user_email_connexion");
                    }
                } else {
                    error_connexion = error_connexion + '<p>Email non valide !!</p>';
                    change_to_invalide("user_email_connexion");
                }
            } else {
                error_connexion = error_connexion + '<p>Email non valide !!</p>';
                change_to_invalide("user_email_connexion");
            }
        }
        if (user_pass === "") {
            error_connexion = error_connexion + "<p>Mot de pass vide !!</p>";
        }
        $("#div_error").html(error_connexion);
        if (error_connexion === "") {
            $.post(path_to_ajax, {action: 'connexion', user_email: user_email, user_pass: user_pass}, function (data, textStatus) {
                if (textStatus === "success") {
                    data = JSON.parse(data);
                    if (data.error === null) {
                        if (localStorage.getItem("etoile_de_martin_parrain_email") === data.data.email) {
                            Materialize.toast('<p class="alert-success">Connexion etablie mais vous avez le meme email que votre parrain !! Email du parrain effacé !!<p>', 3000, 'rounded alert-success');
                            localStorage.removeItem("etoile_de_martin_parrain_email");
                        } else {
                            Materialize.toast('<p class="alert-success">Connexion etablie !!<p>', 3000, 'rounded alert-success');
                        }
                        localStorage.setItem("etoile_de_martin_user_email", data.data.email);
                        localStorage.setItem("etoile_de_martin_user_token", data.data.token);
                        localStorage.setItem("etoile_de_martin_user_json", JSON.stringify(data.data));
                        make_nav_work();
                        $("#menu").sideNav();
                    } else {
                        Materialize.toast('<p class="alert-failed">' + data.error + '<p>', 3000, 'rounded alert-failed');
                    }
                }
            });
        }
    });
    $(document).on('click', '#deconnexion', function() {
        if (localStorage.getItem("etoile_de_martin_user_email") !== null) {
            localStorage.removeItem("etoile_de_martin_user_email");
            localStorage.removeItem("etoile_de_martin_user_token");
            Materialize.toast('<p class="alert-failed">Deconnexion reussi !!<p>', 3000, 'rounded alert-failed');
            make_nav_work();
        }
    });
    $(document).on('change', '#montant_don', function() {
        if ($(this).val() === "autre") {
            $('#input_autre_montant').html('<div class="input-field col s12"><i class="material-icons prefix">€</i><input id="don" type="number"><label for="don">Montant du don</label></div>');
        } else {
            $("#fiscal").html("<p>Coût réel de votre don après déduction fiscale : " + ($(this).val() - (0.34 * $(this).val())).toFixed(2) + " €</p>");
        }
    });
    $(document).on('change', '#user_inscription', function() {
        if ($(this).val() === "oui") {
            $('#create_user_password').html('<div class="row"><div class="input-field col s12"><i class="material-icons prefix">vpn_key</i><input id="user_password" type="password"><label for="user_password">Mot de passe</label></div></div>');
        } else {
            $('#create_user_password').html('');
        }
    });
    $(document).on('keyup', '#don', function() {
        $("#fiscal").html("<p>Coût réel de votre don après déduction fiscale : " + ($(this).val() - (0.34 * $(this).val())).toFixed(2) + " €</p>");
    });
    $(document).on('click', '#valider_don', function() {
        if (localStorage.getItem("etoile_de_martin_user_email") === null) {
            user_genre = $('#user_civilite option:selected').val();
            user_nom = $('#user_nom').val();
            user_prenom = $('#user_prenom').val();
            user_email = $('#user_email').val();
            user_adress = $.trim($("#user_adress").val());
            user_ville = $.trim($("#user_ville").val());
            user_code_postal = $.trim($("#user_code_postal").val());
            user_pays = $.trim($("#user_pays").val());
            user_tel = $('#user_tel').val();
            if ($('#user_inscription').val() === "oui") {
                user_pass = $('#user_password').val();
            }
        } else {
            user_json = JSON.parse(localStorage.getItem("etoile_de_martin_user_json"));
            user_genre = user_json.genre;
            user_nom = user_json.nom;
            user_prenom = user_json.prenom;
            user_email = user_json.email;
            user_adress = user_json.adresse;
            user_ville = user_json.ville;
            user_code_postal = user_json.codePostal;
            user_pays = user_json.pays;
            user_tel = user_json.tel;
        }
        user_anonyme = $('#user_anonyme option:selected').val();
        user_commentaire = "Don fait à partir de l'application 'Un geste solidaire'";
        user_carte = $('#user_carte option:selected').val();
        iframe_don_selected = false;
        iframe_user_info_selected = false;
        iframe_pourboire_selected = false;
        iframe_cb_selected = false;
        change_to_valide("user_nom");
        change_to_valide("user_prenom");
        change_to_valide("user_email");
        change_to_valide("user_adress");
        change_to_valide("user_ville");
        change_to_valide("user_code_postal");
        change_to_valide("user_pays");
        change_to_valide("user_don");
        $('#div_error_don').html('');
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
        if (user_adress === "") {
            change_to_invalide("user_adress");
            error_message = error_message + "<p>Vous devez ecrire votre adresse !!</p>"
            error_count = error_count + 1;
        }
        if (user_ville === "") {
            change_to_invalide("user_ville");
            error_message = error_message + "<p>Vous devez ecrire votre ville !!</p>"
            error_count = error_count + 1;
        }
        if (user_code_postal === "") {
            change_to_invalide("user_code_postal");
            error_message = error_message + "<p>Vous devez ecrire votre code postal!!</p>"
            error_count = error_count + 1;
        }
        if (user_pays === "") {
            change_to_invalide("user_pays");
            error_message = error_message + "<p>Vous devez ecrire votre pays !!</p>"
            error_count = error_count + 1;
        }
        if ($.trim(don) < 1 || $.trim(don) === "autre") {
            change_to_invalide('don');
            error_message = error_message + '<p>Vous devez ecrire le montant de votre don</p>';
            error_count = error_count + 1;
        }
        if (user_email !== "") {
            if (user_email.split('@').length === 2) {
                if (user_email.split('@')[0] !== "" && user_email.split('@')[1] !== "") {
                    if (user_email.split('@')[1].split(".").length > 1) {
                        choose_user_email = true;
                    } else {
                        error_message = error_message + '<p>Email non valide !!</p>';
                        change_to_invalide("user_email_connexion");
                        error_count = error_count + 1;
                    }
                } else {
                    error_message = error_message + '<p>Email non valide !!</p>';
                    change_to_invalide("user_email_connexion");
                    error_count = error_count + 1;
                }
            } else {
                error_message = error_message + '<p>Email non valide !!</p>';
                change_to_invalide("user_email_connexion");
                error_count = error_count + 1;
            }
        }
        if ($('#user_inscription').val() === "oui") {
            if ($.trim(user_pass) === "" ) {
                error_message = error_message + '<p>Mot de passe vide !!!</p>';
                change_to_invalide('#user_password');
                error_count = error_count + 1;
            }
        }
        if (error_count !== 0) {
            $(this).css('background-color', '#FF0000');
            $('#div_error_don').html(error_message);
            $(this).css('background-color', '#2ab7a9');
            error_message = "";
            error_count = 0;
        } else {
            $('#mainForm').remove();
            if ($('#user_inscription').val() === "oui") {
                $.post(path_to_ajax, {action: 'user_inscription', user_genre: user_genre, user_nom: user_nom, user_prenom: user_prenom, user_adress: user_adress, user_ville: user_ville, user_code_postal: user_code_postal, user_pays: user_pays,  user_email: user_email, user_pass: user_pass, user_tel: user_tel, user_newsletter: 'false'}, function(data, textStatus) {
                    if (textStatus === "success") {
                        data = JSON.parse(data);
                        if (data.error !== null) {
                            Materialize.toast('<p class="alert-failed">' + data.error + '<p>', 3000, 'rounded alert-failed');
                        }
                    }
                });
            }
            $('#button_valider_don').html('<div class="preloader-wrapper active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
            if (don === "10") {
                $("#mfgWidget").contents().find("#ctl09_rptOptionsDon_option_1").children('td').children('input').prop('checked', true);
                $("#mfgWidget").contents().find("#ctl09_rptOptionsDon_option_1").trigger("click");
                iframe_don_selected = true;
            } else if (don === "20") {
                $("#mfgWidget").contents().find("#ctl09_rptOptionsDon_option_2").children('td').children('input').prop('checked', true);
                $("#mfgWidget").contents().find("#ctl09_rptOptionsDon_option_2").trigger("click");
                iframe_don_selected = true;
            } else {
                $("#mfgWidget").contents().find("#ctl09_optionMontantLibre").children('td').children('input').prop('checked', true);
                $("#mfgWidget").contents().find("#ctl09_optionMontantLibre").trigger("click");
                $("#mfgWidget").contents().find("#montantLibreUnique").val(don);
                iframe_don_selected = true;
            }
            if (iframe_don_selected === true) {
                $("#mfgWidget").contents().find("#ctl09_btnValidateFormule").trigger('click');
                check_form_don_second_step = setInterval(function() {
                    if (check_form_don("#mfgWidget", "#ctl09_prenom") === true) {
                        clearInterval(check_form_don_second_step);
                        $("#mfgWidget").contents().find("#ctl09_civilite option[value='" + user_genre + "']").prop('selected', true);
                        $("#mfgWidget").contents().find("#ctl09_prenom").val(user_prenom);
                        $("#mfgWidget").contents().find("#ctl09_nom").val(user_nom);
                        $("#mfgWidget").contents().find("#ctl09_email").val(user_email);
                        $("#mfgWidget").contents().find("#ctl09_adresse").val(user_adress);
                        $("#mfgWidget").contents().find("#ctl09_ville").val(user_ville);
                        $("#mfgWidget").contents().find("#ctl09_codePostal").val(user_code_postal);user_commentaire
                        $("#mfgWidget").contents().find("#ctl09_pays").val(user_pays);
                        $("#mfgWidget").contents().find("#ctl09_commentaire").val(user_commentaire);
                        if (user_anonyme === "oui") {
                            $("#mfgWidget").contents().find("#anonyme").prop('checked', true);
                        } else {
                            $("#mfgWidget").contents().find("#anonyme").prop('checked', false);
                        }
                        iframe_user_info_selected = true;
                        if (iframe_user_info_selected === true) {
                            $("#mfgWidget").contents().find("#ctl09_btnValidateCoordonnees").trigger('click');
                            check_form_don_third_step = setInterval(function() {
                                if (check_form_don("#mfgWidget", "#montantPourboire") === true) {
                                    clearInterval(check_form_don_third_step);
                                    $("#mfgWidget").contents().find("#cbNoTip").trigger('click');
                                    iframe_pourboire_selected = true;
                                }
                                if (iframe_pourboire_selected === true) {
                                    $("#mfgWidget").contents().find("#ctl09_btnValidatePaiement").trigger('click');
                                    check_form_don_fourth_step = setInterval(function() {
                                        if (check_form_don("#mfgWidget", "#CB") === true) {
                                            clearInterval(check_form_don_fourth_step);
                                            iframe_cb_selected = true;
                                            if (iframe_cb_selected === true) {
                                                $("#mfgWidget").contents().find('#validationButtonPaymentMean').trigger('click');
                                                check_form_don_five_step = setInterval(function() {
                                                    if (check_form_don("#mfgWidget", "#cvvid") === true) {
                                                        $('#the_body').css({
                                                            "border": '0',
                                                            "margin": '0'
                                                        });
                                                        $("#mfgWidget").contents().find("#backToBoutiqueBlock").css('display', 'none');
                                                        $('#form_don').css('display', 'none');
                                                        $('#div_h1_h2').css('display', 'none');
                                                        $('#widget').css('display', 'block');
                                                        //$("html, body").animate({ scrollTop: 0 }, "fast");
                                                        $("#mfgWidget").contents().find("#" + user_carte).trigger('click');
                                                    }
                                                }, 2000);
                                            }
                                        }
                                    }, 2000);
                                }
                            }, 2000);
                        }
                    }
                }, 2000);
            }
        }
    });
});