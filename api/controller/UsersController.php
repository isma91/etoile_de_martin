<?php
namespace controller;

use model\User;
use model\Bdd;
class UsersController extends User
{
	public function create()
	{
		$bdd = new Bdd();
	}
}