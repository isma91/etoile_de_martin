<?php
include './../autoload.php';
use controller\ApiController;

if ($_POST && $_GET) {
	$o = new ApiController($_POST, $_GET);

	echo $o->result();
}