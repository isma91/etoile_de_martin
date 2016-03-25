<?php
namespace model;
class Model
{
	private $_error = false;
	private $_message;

	public function setMessage($message)
	{
		$this->_message = $message;
	}

	public function getMessage()
	{
		return $this->_message;
	}

	public function setError($error)
	{
		$this->_error = $error;
	}

	public function getError()
	{
		return $this->_error;
	}
}