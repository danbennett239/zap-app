<?php

namespace App\Controllers;

use App\Models\SightingModel;
use App\Helpers\ResponseHelper;

class SightingController {
    public function getSightings($request) {
        $limit = $request['limit'] ?? 10;
        $offset = $request['offset'] ?? 0;
        $status = $request['status'] ?? null;

        $sightingModel = new SightingModel();
        $sightings = $sightingModel->getSightings($limit, $offset, $status);

        return ResponseHelper::jsonResponse($sightings);
    }

    public function getSightingById($id) {
        $sightingModel = new SightingModel();
        $sighting = $sightingModel->getSightingById($id);

        if ($sighting) {
            return ResponseHelper::jsonResponse($sighting);
        } else {
            return ResponseHelper::jsonResponse(['error' => 'Sighting not found'], 404);
        }
    }

    public function createSighting() {
        $data = json_decode(file_get_contents("php://input"), true);

        $sightingModel = new SightingModel();
        $result = $sightingModel->createSighting($data);

        if ($result) {
            return ResponseHelper::jsonResponse(['message' => 'Sighting created successfully'], 201);
        } else {
            return ResponseHelper::jsonResponse(['error' => 'Failed to create sighting'], 500);
        }
    }

    public function updateSighting($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        $sightingModel = new SightingModel();
        $result = $sightingModel->updateSighting($id, $data);

        if ($result) {
            return ResponseHelper::jsonResponse(['message' => 'Sighting updated successfully']);
        } else {
            return ResponseHelper::jsonResponse(['error' => 'Failed to update sighting'], 500);
        }
    }
}