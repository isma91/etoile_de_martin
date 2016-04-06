<?php
include './../autoload.php';
use controller\ApiController;
use controller\UsersController;

$users_controller = new UsersController();

switch ($_POST["action"]) {
	case 'check_parrain':
	$users_controller->check_parrain($_POST["parrain_email"], $_POST["parrain_tel"]);
	break;
	case 'user_inscription':
	$users_controller->create_user($_POST["user_nom"], $_POST["user_prenom"], $_POST["user_adress"], $_POST["user_email"], $_POST["user_pass"], $_POST["user_tel"], $_POST["user_newsletter"]);
	break;
	default:
	echo json_encode(array('error' => "action non valide !!", 'data' => null));
	break;
}
/*if ($_POST && $_GET) {
	$o = new ApiController($_POST, $_GET);

	echo $o->result();
}*/