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
        
        if (!filter_var($id, FILTER_VALIDATE_INT)) {
            return ResponseHelper::jsonResponse([
                'message' => 'error',
                'error' => 'The ID must be a valid integer.'
            ], 400);
        }

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

        $errors = [];

        // Validate status
        if (empty($data['status'])) {
            $errors[] = 'status is required';
        } elseif (!in_array($data['status'], ['Alive', 'Dead'])) {
            $errors[] = 'status must be either "Alive" or "Dead"';
        }

        // Check latitude (either in "location" or standalone field)
        $latitude = $data['location']['latitude'] ?? $data['latitude'] ?? null;
        if (empty($latitude)) {
            $errors[] = 'latitude is required';
        } elseif (!is_numeric($latitude) || $latitude < -90 || $latitude > 90) {
            $errors[] = 'latitude must be a valid number between -90 and 90';
        } else {
            $data['latitude'] = $latitude; // Normalize
        }

        // Check longitude (either in "location" or standalone field)
        $longitude = $data['location']['longitude'] ?? $data['longitude'] ?? null;
        if (empty($longitude)) {
            $errors[] = 'longitude is required';
        } elseif (!is_numeric($longitude) || $longitude < -180 || $longitude > 180) {
            $errors[] = 'longitude must be a valid number between -180 and 180';
        } else {
            $data['longitude'] = $longitude; // Normalize
        }

        // Return errors if any
        if (!empty($errors)) {
            return ResponseHelper::jsonResponse([
                'message' => 'error',
                'errors' => $errors
            ], 400);
        }

        // Sanitize and validate the input
        $data = $this->sanitizeSightingData($data);

        // Process the request
        $sightingModel = new SightingModel();
        $insertedId = $sightingModel->createSighting($data);

        if ($insertedId) {
            return ResponseHelper::jsonResponse([
                'message' => 'success',
                'sightingId' => (int)$insertedId
            ], 201);
        } else {
            return ResponseHelper::jsonResponse([
                'message' => 'error',
                'sightingId' => null
            ], 500);
        }
    }


    private function sanitizeSightingData($data) {
        // Sanitize photo
        $data['photo'] = htmlspecialchars($data['photo'] ?? '', ENT_QUOTES, 'UTF-8');
    
        // Handle latitude and longitude (from 'location' or standalone fields)
        $latitude = $data['location']['latitude'] ?? $data['latitude'] ?? null;
        $longitude = $data['location']['longitude'] ?? $data['longitude'] ?? null;
    
        $data['latitude'] = filter_var($latitude, FILTER_VALIDATE_FLOAT);
        $data['longitude'] = filter_var($longitude, FILTER_VALIDATE_FLOAT);
    
        // Normalize location
        $data['location']['latitude'] = $data['latitude'];
        $data['location']['longitude'] = $data['longitude'];
    
        // Handle mortalityType (mortality_type) sanitization
        $data['mortalityType'] = htmlspecialchars(
            $data['mortalityType'] ?? $data['mortality_type'] ?? '', 
            ENT_QUOTES, 
            'UTF-8'
        );
    
        // Handle fenceType (fence_type) sanitization
        $fenceType = $data['metadata']['fenceType'] ?? $data['metadata']['fence_type'] ?? $data['fenceType'] ?? $data['fence_type'] ?? '';
        $data['metadata']['fenceType'] = htmlspecialchars($fenceType, ENT_QUOTES, 'UTF-8');
    
        // Handle roadType (road_type) sanitization
        $roadType = $data['metadata']['roadType'] ?? $data['metadata']['road_type'] ?? $data['roadType'] ?? $data['road_type'] ?? '';
        $data['metadata']['roadType'] = htmlspecialchars($roadType, ENT_QUOTES, 'UTF-8');
    
        // Handle additionalNotes (additional_notes) sanitization
        $additionalNotes = $data['additionalNotes'] ?? $data['additional_notes'] ?? '';
        $data['additionalNotes'] = htmlspecialchars($additionalNotes, ENT_QUOTES, 'UTF-8');
    
        return $data;
    }
    
}
