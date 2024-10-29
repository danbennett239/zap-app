<?php

use App\Controllers\SightingController;

$controller = new SightingController();

// Determine route and call appropriate controller method
$requestMethod = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($uri === '/sightings' && $requestMethod === 'GET') {
    $controller->getSightings($_GET);
} elseif (preg_match('#^/sightings/(\d+)$#', $uri, $matches) && $requestMethod === 'GET') {
    $controller->getSightingById($matches[1]);
} elseif ($uri === '/zap-app/api/sightings' && $requestMethod === 'POST') {
    $controller->createSighting();
} elseif (preg_match('#^/sightings/(\d+)$#', $uri, $matches) && $requestMethod === 'PUT') {
    $controller->updateSighting($matches[1]);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
