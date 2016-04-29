<?php
namespace controller;

use model\User;
use model\Bdd;
use controller\MailsController;
class UsersController extends User
{
	public function send_json ($error, $data) {
		echo json_encode(array('error' => $error, 'data' => $data));
	}

	private function checkEmail()
	{
		$bdd = new Bdd();

		$check = $bdd->getBdd()->prepare('SELECT id FROM users WHERE email = :email');
		$check->bindParam(':email', $_POST['user_email'], PDO::PARAM_STR);
		$check->execute();
		if (empty($check->fetch())) {
			return true;
		}

		return false;
	}
	public function create_user ($nom, $prenom, $adresse, $ville, $code_postal, $pays, $email, $pass, $tel, $newsletter)
	{
		$bdd = new Bdd();
		if ($this->checkEmail()) {
			$sql = 'INSERT INTO users (nom, prenom, email, pass, tel, adresse, ville, codePostal, pays, newsletter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
			$create = $bdd->getBdd()->prepare($sql);
			$create->bindParam(1, $nom);
			$create->bindParam(2, $prenom);
			$create->bindParam(3, $email);
			$create->bindParam(4, password_hash($pass, PASSWORD_DEFAULT));
			$create->bindParam(5, $tel);
			$create->bindParam(6, $adresse);
			$create->bindParam(7, $ville);
			$create->bindParam(8, $code_postal);
			$create->bindParam(9, $pays);
			$create->bindParam(10, $newsletter);
			if ($create->execute()) {
				$token = sha1(time() * rand(1, 555));
				$update = $bdd->getBdd()->prepare('UPDATE users SET token = :token WHERE email = :email AND prenom = :prenom');
				$update->bindParam(':token', $token);
				$update->bindParam(':email', $email);
				$update->bindParam(':prenom', $prenom);
				if ($update->execute()) {
					self::send_json(null, array("email" => $email, "token" => $token));
					return true;
				} else {
					self::send_json("Inscription reussi mais probleme d'ajout de token !! Contacter l'admin du logiciel !!", null);
					return false;
				}
			} else {
				self::send_json("Probleme lors de l'inscription", null);
				return false;
			}
		}
		self::send_json("L'email " . $email . " est déjà pris !! Veuillez en ecrire un autre !!", null);
		return false;
	}
	public function check_parrain ($email) {
		$bdd = new Bdd();
		$sql = $bdd->getBdd()->prepare('SELECT email FROM users WHERE email = ?');
		$sql->bindParam(1, $email);
		$sql->execute();
		$donnees = $sql->fetch(PDO::FETCH_ASSOC);
		if ($donnees) {
			self::send_json(null, $donnees["email"]);
		} else {
			self::send_json("L'email " . $email . " est associé avec aucun inscris !!", null);
		}
	}

	public function connexion($email, $pass) {
		$bdd = new Bdd();
		$auth_error = true;
		$getPwd = $bdd->getBdd()->prepare('SELECT pass FROM users WHERE email = ?');
		$getPwd->bindParam(1, $email);
		$getPwd->execute();
		if ($pwd = $getPwd->fetch(PDO::FETCH_ASSOC)) {
			if (password_verify($pass, $pwd['pass'])) {
				$auth_error = false;
				$token = sha1(time() * rand(1, 555));
				$sql_token = $bdd->getBdd()->prepare('UPDATE users SET token = ? WHERE email = ?');
				$sql_token->bindParam(1, $token, PDO::PARAM_STR);
				$sql_token->bindParam(2, $email, PDO::PARAM_STR);
				if (!$sql_token->execute()) {
					self::send_json("error occured during token insertion, please contact admin", null);
					return false;
				}
				$get = $bdd->getBdd()->prepare('SELECT * FROM users WHERE email = ? AND token = ?');
				$get->bindParam(1, $email, PDO::PARAM_STR);
				$get->bindParam(2, $token, PDO::PARAM_STR);
				if ($get->execute()) {
					$user = $get->fetchAll(PDO::FETCH_ASSOC);
					self::send_json(false, array("email" => $email, "token" => $token, 'user' => $user));
				} else {
					self::send_json('error occured while get user', false);
					return false;

				}
				return true;
			}
		}
		self::send_json("Email ou mot de passe incorrect", null);
		return false;
	}

	public function confirm()
	{
		$bdd = new Bdd();
		$sql = 'INSERT INTO donations (nom, prenom, email, tel, adresse, ville, codePostal, pays, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		$insert = $bdd->getBdd()->prepare($sql);
		$insert->bindParam(1, $_POST['user_nom']);
		$insert->bindParam(2, $_POST['user_prenom']);
		$insert->bindParam(3, $_POST['user_email']);
		$insert->bindParam(4, $_POST['user_tel']);
		$insert->bindParam(5, $_POST['user_adress']);
		$insert->bindParam(6, $_POST['user_ville']);
		$insert->bindParam(7, $_POST['user_code_postal']);
		$insert->bindParam(8, $_POST['user_pays']);
		$insert->bindParam(9, $_POST['user_amount']);
		if ($insert->execute()) {
			$mail = new MailsController();
			if ($mail->sendMail()) {
				$this->send_json(false, null);
				return true;
			} else {
				$this->send_json('error occured during mail sending, please contact admin', null);
				return false;
			}
		}
		$this->send_json('error occcured during base insertion until confirm', null);
		return false;
	}
}