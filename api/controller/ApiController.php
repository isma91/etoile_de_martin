<?php
namespace controller;

use controller\UsersController;

class ApiController
{
	private $_response;

	/*public function __construct($post, $request)
	{
		$request = $request['request'];

		$user = new UsersController();
		switch ($request) {
			case 'create':
				if ($user->create($post)) {
					$this->_response = array('status' => 'success', 'message' => 'user register with success');
				} else {
					$this->_response = array('status' => 'error', 'message' => 'cant register user error_id = [1]');
				}
				break;

		}
	}

	public function result()
	{
		return json_encode($this->_response);
	}*/
}