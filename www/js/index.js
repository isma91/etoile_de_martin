/*jslint browser: true, node : true*/
/*jslint devel : true*/
/*global $, jQuery*/
$(document).ready(function () {
	var user_nom, user_prenom, user_email, user_tel, parrain_email, parrain_tel, don, error_message, error_count;
    error_message = "";
    error_count = 0;
    /* ces deux localStorage seront utiliser pour savoir si l'utilisateur est déjà connecter ou pas */
    console.log(localStorage.etoile_de_martin_user);
    console.log(localStorage.etoile_de_martin_pass);
    function change_to_invalide (id_selector) {
        $('#' + id_selector).css('border-bottom', '1px solid #FF0000');
    }
    $('select').material_select();
    $('#montant_don').change(function () {
    	if ($(this).val() === "autre") {
    		$('#input_autre_montant').html('<div class="input-field col s12"><i class="material-icons prefix">€</i><input id="don" type="number"><label for="don">Montant du don</label></div>');
    	}
    });
    $('#valider_don').click(function () {
    	user_nom = $('#user_nom').val();
    	user_prenom = $('#user_prenom').val();
        user_email = $('#user_email').val();
    	user_tel = $('#user_tel').val();
    	parrain_email = $('#parrain_email').val();
    	parrain_tel = $('#parrain_tel').val();
    	if ($('#don').val() === "" || $('#don').val() < 1) {
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
            /* faire la requete ajax pour envoyer le don */
        }
    });
    $('#login').click(function() {
        $('#the_body').html('<div id="login-page" class="row"><div class="col s12"><form class="login-form"><div class="row"><div class="col s12" id="div_error"></div><div class="input-field col s12 center"><img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><p class="center login-form-text"></p></div></div><div class="row margin"><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div></div><div class="row margin"><div class="input-field col s12"><i class="mdi-action-lock-outline prefix"></i><input id="password" type="password"><label for="password">Mot de Passe</label></div></div><div class="row"><div class="input-field col s12 m12 l12  login-text"><input type="checkbox" id="remember-me" /><label for="remember-me">Remember me</label></div></div><div class="row"><div class="input-field col s12"><a href="index.html" class="btn waves-effect waves-light col s12">Login</a></div></div><div class="row"><div class="input-field col s6 m6 l6"><p class="margin medium-small"><a href="page-register.html">Register Now!</a></p></div><div class="input-field col s6 m6 l6"><p class="margin right-align medium-small"><a href="page-forgot-password.html">Forgot password ?</a></p></div></div></form></div></div>');
    });
    $('#register').click(function() {
        $('#the_body').html('<img class="responsive-img" src="img/logo.png" alt="logo_etoile_de_martin"><h1>Bienvenue sur la page d\'inscription !!</h1><h2>Nous vous proposons de vous inscrire afin de pouvoir faire des dons plus rapidement et plus simplement !</h2><div class="row"><div class="col s12" id="div_error"></div></div><div class="row"><form class="col s12"><div class="row"><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input id="user_nom" type="text"><label for="user_nom">Nom</label></div><div class="input-field col s12"><i class="material-icons prefix">account_box</i><input id="user_prenom" type="text"><label for="user_prenom">Prenom</label></div><div class="input-field col s12"><i class="material-icons prefix">location_on</i><input id="user_address" type="text"><label for="user_adress">Adresse</label></div><div class="input-field col s12"><i class="material-icons prefix">email</i><input id="user_email" type="email"><label for="user_email">Email</label></div><div class="input-field col s12"><i class="material-icons prefix">phone</i><input id="user_tel" type="tel"><label for="user_tel">Numero de Telephone (Facultatif)</label></div><div class="input-field col s12"><input id="newsletter" type="checkbox" name="newsletter" value="1"><label for="newsletter">s\'abonner a la newsletter</label></div></div></form><div class="row"><button class="waves-effect waves-teal btn-flat" id="valider_inscription">Valider l\'inscription</button></div></div>');
    });
});