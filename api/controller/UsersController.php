<?php
namespace controller;

use model\User;
use model\Bdd;
class UsersController extends User
{

	public function send_json ($error, $data) {
		echo json_encode(array('error' => $error, 'data' => $data));
	}

	public function create_user ($nom, $prenom, $adresse, $email, $pass, $tel, $newsletter) {
		if (empty($tel)) {
			$tel = null;
		}
		$duplicate_email = false;
		$bdd = new Bdd();
		$sql = $bdd->getBdd()->prepare("SELECT email FROM users");
		$sql->execute();
		$donnees = $sql->fetchAll();
		foreach ($donnees as $value) {
			if ($email === $value['email']) {
				$duplicate_email = true;
			}
		}
		if ($duplicate_email === false) {
			$sql_insert = $bdd->getBdd()->prepare("INSERT INTO users (nom, prenom, email, pass, tel, adresse, newsletter) VALUES (:nom, :prenom, :email, :pass, :tel, :adresse, :newsletter)");
			$sql_insert->bindParam(":nom", $nom);
			$sql_insert->bindParam(":prenom", $prenom);
			$sql_insert->bindParam(":email", $email);
			$sql_insert->bindParam(":pass", password_hash($pass, PASSWORD_DEFAULT));
			$sql_insert->bindParam(":tel", $tel);
			$sql_insert->bindParam(":adresse", $adresse);
			$sql_insert->bindParam(":newsletter", $newsletter);
			$sql_insert->execute();
			self::send_json(null, 'Inscription reussi !!');
		} else {
			self::send_json("L'email " . $email . " est déjà pris !! Veuillez en ecrire un autre !!", null);
		}
	}
	public function check_parrain ($email, $tel) {
		$bdd = new Bdd();
		if (!empty($email) && !empty($tel)) {
			$sql = $bdd->getBdd()->prepare("SELECT * FROM user WHERE user_email = ? OR user_tel = ?");
			$sql->bindParam(1, $tel);
			$sql->bindParam(1, $email);
		} elseif (!empty($email) && empty($tel)) {
			$sql = $bdd->getBdd()->prepare("SELECT * FROM user WHERE user_email = ?");
			$sql->bindParam(1, $email);
		} elseif (empty($email) && !empty($tel)) {
			$sql = $bdd->getBdd()->prepare("SELECT * FROM user WHERE user_tel = ?");
			$sql->bindParam(1, $tel);
		}
		$sql->execute();
		$donnees = $sql->fetchAll();
		//var_dump($donnees);
	}
	/*public function create()
	{
		$bdd = new Bdd();

		// var setting
		$lastname = $this->getLastname();
		$firstname = $this->getFirstname();
		$email = isset($this->getEmail()) ? $this->getEmail() : "";
		$telephone = isset($this->getTelephone()) ? $this->getTelephone() : "";
		$amount = $this->getAmount();

		$insert = $bdd->getBdd()->prepare('INSERT INTO users (lastname, firstname, email, telephone, amount) VALUES (?, ?, ?, ?, ?)');
		$insert->bindParam(1, $lastname);
		$insert->bindParam(2, $firstname);
		$insert->bindParam(3, $email);
		$insert->bindParam(4, $telephone);
		$insert->bindParam(5, $amount);
		return $insert->execute();
	}*/
}