<?php
namespace controller;

use controller\UsersController;

class ApiController
{
	private $_response;

	public function __construct($post, $request)
	{
		$request = $request['request'];

		$user = new UsersController();
		switch ($request) {
			case 'create':
				$this->_response = $user->create($post);
				break;

		}
	}

	public function result()
	{
		return json_encode($this->_response);
	}
}