<?php
include './../autoload.php';
use controller\ApiController;
use controller\UsersController;

$user = new UsersController();

switch ($_POST["action"]) {
	case 'check_parrain':
		$user->check_parrain($_POST["parrain_email"]);
		break;

	case 'user_inscription':
		// USER REGISTER
		// RETURN EMAIL & TOKEN
		// OR SPECIFIC ERROR
		$user->create_user($_POST["user_genre"], $_POST["user_nom"], $_POST["user_prenom"], $_POST["user_adress"], $_POST["user_ville"], $_POST["user_code_postal"], $_POST["user_pays"],  $_POST["user_email"], $_POST["user_pass"], $_POST["user_tel"], $_POST["user_newsletter"]);
		break;

	case 'connexion':
		// USER CONNECTION
		// RETURN EMAIL & TOKEN
		// OR SPECIFIC ERROR
		$user->connexion($_POST["user_email"], $_POST["user_pass"]);
		break;

	case 'confirmation':
		// AFTER PAIEMENT
		// RETURN { ERROR => FALSE }
		// OR SPECIFIC ERROR
		$user->confirm();
		break;

	default:
		echo json_encode(array('error' => "action non valide !!", 'data' => null));
		break;
}