<?php
class MailsController
{
	public function __construct()
	{
		$config = include '../config.php';
		ini_set('SMTP', $config['mail']['SMTP']);
		ini_set('smtp_port', $config['mail']['smtp_port']);
		ini_set('sendmail_from', $config['mail']['sendmail_from']);
	}
	public function send_mail($parrain_mail)
	{
		$to = $parrain_mail;
		$subject = 'DON REUSSI !';
		$message = 'Votre filleul ' . $_POST['user_prenom'] . ' ' . $_POST['user_nom'] . ' à réalisé un don pour l\'assossiation Etoile de Martin via l\'application Cadeau Solidaire. Merci de votre soutien.';
		$headers = 'From: contact@etoiledemartin.com' . "\r\n" .
		'Reply-To: contact@etoiledemartin.com' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();

		return mail($to, $subject, $message, $headers);
	}
}