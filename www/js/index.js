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
});