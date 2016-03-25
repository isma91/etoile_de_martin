<?php
namespace controller;

use model\User;
use model\Bdd;
class UsersController extends User
{
	public function create()
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
	}
}