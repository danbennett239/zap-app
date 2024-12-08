<?php

namespace App\Controllers;

use App\Models\SightingModel;
use App\Helpers\ResponseHelper;

class SightingController {
    public function getSightings($request) {
        // Sanitize and validate parameters
        $limit = isset($request['limit']) && filter_var($request['limit'], FILTER_VALIDATE_INT) ? (int)$request['limit'] : 10;
        $offset = isset($request['offset']) && filter_var($request['offset'], FILTER_VALIDATE_INT) ? (int)$request['offset'] : 0;
        $sortField = preg_replace('/[^a-zA-Z0-9_]/', '', $request['sortField'] ?? 'created_at'); // Allow only alphanumeric and underscore
        $sortDirection = isset($request['sortDirection']) && strtolower($request['sortDirection']) === 'asc' ? 'asc' : 'desc';
    
        // Sanitize filters
        $filters = [];
        foreach ($request as $key => $value) {
            if (preg_match('/^(id|latitude|longitude|created_at|updated_at|status|mortality_type|fence_type|road_type|additional_notes)_(gt|gte|lt|lte|eq|like)$/', $key)) {
                $filters[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); // Escape HTML entities
            }
        }
    
        // Merge filters with the other parameters for the model
        $params = array_merge(
            [
                'limit' => $limit,
                'offset' => $offset,
                'sortField' => $sortField,
                'sortDirection' => $sortDirection
            ],
            $filters
        );
    
        $sightingModel = new SightingModel();
        $sightings = $sightingModel->getSightings($params);
    
        // Return JSON response
        return ResponseHelper::jsonResponse($sightings);
    }
    

    public function getSightingById($id) {
        // Sanitize the ID
        $id = (int)$id;

        $sightingModel = new SightingModel();
        $sighting = $sightingModel->getSightingById($id);

        if ($sighting) {
            return ResponseHelper::jsonResponse($sighting);
        } else {
            return ResponseHelper::jsonResponse(['error' => 'Sighting not found'], 404);
        }
    }

    public function createSighting() {
        // Decode input data
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate and sanitize input data
        $data = $this->sanitizeSightingData($data);

        $sightingModel = new SightingModel();
        $result = $sightingModel->createSighting($data);

        if ($result) {
            return ResponseHelper::jsonResponse(['message' => 'Sighting created successfully'], 201);
        } else {
            return ResponseHelper::jsonResponse(['error' => 'Failed to create sighting'], 500);
        }
    }

    private function sanitizeSightingData($data) {
        // Sanitize each field
        $data['photo'] = htmlspecialchars($data['photo'] ?? '', ENT_QUOTES, 'UTF-8');
        $data['location']['latitude'] = filter_var($data['location']['latitude'] ?? null, FILTER_VALIDATE_FLOAT);
        $data['location']['longitude'] = filter_var($data['location']['longitude'] ?? null, FILTER_VALIDATE_FLOAT);
        $data['status'] = htmlspecialchars($data['status'] ?? '', ENT_QUOTES, 'UTF-8');
        $data['mortalityType'] = htmlspecialchars($data['mortalityType'] ?? '', ENT_QUOTES, 'UTF-8');
        $data['metadata']['fenceType'] = htmlspecialchars($data['metadata']['fenceType'] ?? '', ENT_QUOTES, 'UTF-8');
        $data['metadata']['roadType'] = htmlspecialchars($data['metadata']['roadType'] ?? '', ENT_QUOTES, 'UTF-8');
        $data['additionalNotes'] = htmlspecialchars($data['additionalNotes'] ?? '', ENT_QUOTES, 'UTF-8');

        return $data;
    }
}
