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
			if ($sql_insert->execute()) {
				$token = sha1(time() * rand(1, 555));
				$sql_token = $bdd->getBdd()->prepare('UPDATE users SET token = :token WHERE email = :email');
				$sql_token->bindParam(':token', $token);
				$sql_token->bindParam(':email', $email);
				if ($sql_token->execute()) {
					self::send_json(null, array("email" => $email, "token" => $token));
				} else {
					self::send_json("Inscription reussi mais probleme d'ajout de token !! Contacter l'admin du logiciel !!", null);
				}
			} else {
				self::send_json("Probleme lors de l'inscription", null);
			}
		} else {
			self::send_json("L'email " . $email . " est déjà pris !! Veuillez en ecrire un autre !!", null);
		}
	}
	public function check_parrain ($email) {
		$bdd = new Bdd();
		$sql = $bdd->getBdd()->prepare("SELECT email FROM users WHERE email = ?");
		$sql->bindParam(1, $email);
		$sql->execute();
		$donnees = $sql->fetch();
		if ($donnees !== false) {
			self::send_json(null, $donnees["email"]);
		} else {
			self::send_json("L'email " . $email . " est associé avec aucun inscris !!", null);
		}
	}
	public function connexion($email, $pass) {
		$bdd = new Bdd();
		$sql_email = $bdd->getBdd()->prepare("SELECT email FROM users WHERE email = :email");
		$sql_email->bindParam(":email", $email);
		$sql_email->execute();
		$donnee_email = $sql_email->fetch();
		if ($donnee_email !== false) {
			$sql_pass = $bdd->getBdd()->prepare("SELECT pass FROM users WHERE email = :email");
			$sql_pass->bindParam(":email", $email);
			$sql_pass->execute();
			$donnee_pass = $sql_pass->fetch();
			$check_pass = password_verify($pass, $donnee_pass["pass"]);
			if ($check_pass) {
				$token = sha1(time() * rand(1, 555));
				$sql_token = $bdd->getBdd()->prepare('UPDATE users SET token = :token WHERE email = :email');
				$sql_token->bindParam(':token', $token);
				$sql_token->bindParam(':email', $email);
				if ($sql_token->execute()) {
					self::send_json(null, array("email" => $email, "token" => $token));
				} else {
					self::send_json("Bon email et pass mais probleme d'ajout de token !! Contacter l'admin du logiciel !!", null);
				}
			} else {
				self::send_json("Mauvais email ou mot de pass !!", null);
			}
		} else {
			self::send_json("Mauvais email ou mot de pass !!", null);
		}
	}
}