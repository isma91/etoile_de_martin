<?php
namespace model;
/**
 * Class Bdd
 *
 * @category Class
 * @package  Model
 * @author   raph, aydogm_i
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 * @link     /model/Bdd.php
 */

/**
 * User Class Doc Comment
 *
 * @category Class
 * @package  Model
 * @author   raph, aydogm_i
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 * @link     /model/Bdd.php
 */
Class Bdd
{
    private $_bdd;

    /**
    * __construct de Bdd
    */
    public function __construct ()
    {
        $config = include '../config.php';
        try {
            $this->_bdd = new \PDO('mysql:host=' . $config['db']['host'] . ';dbname=' . $config['db']['dbname'], $config['db']['username'], $config['db']['password']);
        }
        catch (\PDOException $e) {
            die('Erreur : '.$e->getMessage());
        }
    }
    /** 
     * Fonction getEmail
     *
     * @return $_bdd return pdo
     */
    public function getBdd () 
    {
        return $this->_bdd;
    }
    
}