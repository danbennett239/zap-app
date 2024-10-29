<?php
// Include the database configuration file
require_once 'database.php';  // Adjust path if `database.php` is in a different location

use App\Config\Database;

// Instantiate the Database object
$db = new Database();
$connection = $db->getConnection();

// Test the connection
if ($connection) {
  echo "Database connection successful!";
} else {
  echo "Failed to connect to the database.";
}
