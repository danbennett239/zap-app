<?php

namespace App\Config;

use PDO;
use PDOException;

class Database {
    // private $host = 'localhost:3306';
    // private $db_name = 'db1087_zap_app';
    // private $username = 'db1087_zap_app';
    // private $password = 'XxkFUT5S5Sh5Un2';
    private $host = 'localhost';
    private $db_name = 'zap_app';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->db_name", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection error: " . $e->getMessage();
        }

        return $this->conn;
    }
}