<?php
namespace model;

use model\Model;
class User extends Model
{
	private $_firstname;
	private $_lastname;
	private $_email;
	private $_telephone;
	private $_amount;

	public function setFirstname($firstname) {$this->_firstname = $firstname;}
	public function setLastname($lastname) {$this->_lastname = $lastname;}
	public function setEmail($email) {$this->_email = $email;}
	public function setTelephone($telephone) {$this->_telephone = $telephone;}
	public function setAmount($amount) {$this->_amount = $amount;}

	public function getFirstname() {return $this->_firstname;}
	public function getLastname() {return $this->_lastname;}
	public function getEmail() {return $this->_email;}
	public function getTelephone() {return $this->_telephone;}
	public function getAmount() {return $this->_amount;}
}