/*jslint browser: true, node : true*/
/*jslint devel : true*/
/*global $, jQuery*/
$(document).ready(function () {
    console.log(localStorage.etoile_de_martin_user);
    console.log(localStorage.etoile_de_martin_pass);
    $('select').material_select();
    $('#montant_don').change(function () {
    	if ($(this).val() === "autre") {
    		$('#input_autre_montant').html('<div class="input-field col s12"><i class="material-icons prefix">euro_symbol</i><input id="don" type="number"><label for="don">Montant du don</label></div>');
    	}
    });
});