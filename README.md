# Cadeau Solidaire
* Responsable et développeur Application : **Ismail**
* Responsable et développeur API : **Raphaël**

## Application mobile
* Requiert :
   * Apache Cordova

Apache Cordova ou plus anciennement Apache Callback ou PhoneGap, est un framework open-source développé par la Fondation Apache. Il permet de créer des applications pour différentes plateformes (Android, Firefox OS, iOS, Ubuntu, Windows 8...) en HTML, CSS et JavaScript.

[Documentation officielle](https://cordova.apache.org/docs/en/latest/)

Doc en cours

## API
* Requiert :
   * PHP >= 5.5.0 ou PHP 7.0
   * MySQL

### Configuration
La configuration de l'API se fera dans le fichier `/config.php`.

Pour des raisons de sécurité, il est conseillé de configurer le webroot sur `/public`.

```php
'db' => [
    'host' => 'ip',
    'username' => 'root',
    'password' => 'pass',
    'port' => 3306,
    'dbname' => 'etoile'
    ],
'mail' => [
    'SMTP' => 'smtp_server',
    'smtp_port' => 25,
    'sendmail_from' => 'contact@letoiledemartin.fr',
    ]
];
```
* ip : remplacer par l'adresse pointant vers la base de donnée mysql
* root : remplacer par le compte permettant de se connecter à la base de donnée
* pass : remplacer par le mot de passe permettant de se connecter à la base de donnée
* port : remplacer si necessaire
* etoile : remplacer si necessaire
* smtp_server : remplacer par le serveur smtp
* contact@letoiledemartin.fr : remplacer si necessaire

Doc à completer

## Contenu du repo
* **Application mobile**
   * /www `Contenu de l'application, partie visible`
   * /config.xml `Configuration de apache cordova`
   * /res `Media de application`

* **API**
   * /api

* **Autres**
   * /auteur
   * /.gitignore
