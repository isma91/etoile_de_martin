/*jslint browser: true, node : true*/
/*jslint devel : true*/
/*global $, jQuery*/
$(document).ready(function () {
	var user_nom, user_prenom, user_email, user_tel, parrain_email, parrain_tel, don;
    console.log(localStorage.etoile_de_martin_user);
    console.log(localStorage.etoile_de_martin_pass);
    $('select').material_select();
    $('#montant_don').change(function () {
    	if ($(this).val() === "autre") {
    		$('#input_autre_montant').html('<div class="input-field col s12"><i class="material-icons prefix">euro_symbol</i><input id="don" type="number"><label for="don">Montant du don</label></div>');
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
    	console.log(don);
    });
});