<?php
namespace model;

use model\Model;
class User extends Model
{
    private $_nom;
    private $_prenom;
    private $_email;
    private $_pass;
    private $_tel;
    private $_parrainEmail;
    private $_newsletter;
    private $_token;

    public function setNom ($nom) {
        $this->_nom = $nom;
    }
    public function setPrenom ($prenom) {
        $this->_prenom = $prenom;
    }
    public function setEmail ($email) {
        $this->_email = $email;
    }
    public function setPass ($pass) {
        $this->_pass = $pass;
    }
    public function setTel ($tel) {
        $this->_tel = $tel;
    }
    public function setParrainEmail ($parrainEmail) {
        $this->_parrainEmail = $parrainEmail;
    }
    public function setToken ($token) {
        $this->_token = $token;
    }
    public function getNom() {
        return $this->_nom;
    }
    public function getPrenom() {
        return $this->_prenom;
    }
    public function getEmail() {
        return $this->_email;
    }
    public function getPass() {
        return $this->_pass;
    }
    public function getTel() {
        return $this->_tel;
    }
    public function getParrainEmail() {
        return $this->_parrainEmail;
    }
    public function getToken() {
        return $this->_token;
    }
}