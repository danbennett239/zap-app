<?php
// CORS headers to allow access from any origin (adjust as needed for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Autoload dependencies and include necessary files
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/SightingController.php';
require_once __DIR__ . '/models/SightingModel.php';
require_once __DIR__ . '/helpers/responseHelper.php';
require_once __DIR__ . '/routes/api.php';
