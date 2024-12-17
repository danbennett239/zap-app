<?php

namespace App\Models;

use App\Config\Database;
use PDO;

class SightingModel
{
  private $db;

  public function __construct()
  {
    $this->db = (new Database())->getConnection();
  }

  public function getSightings($queryParams)
{
    // Extract query parameters
    $limit = isset($queryParams['limit']) ? (int)$queryParams['limit'] : 10;
    $offset = isset($queryParams['offset']) ? (int)$queryParams['offset'] : 0;
    $sortField = isset($queryParams['sortField']) ? $queryParams['sortField'] : 'created_at';
    $sortDirection = isset($queryParams['sortDirection']) && strtolower($queryParams['sortDirection']) === 'asc' ? 'ASC' : 'DESC';

    // Supported filter fields
    $filterableFields = ['id', 'latitude', 'longitude', 'created_at', 'updated_at', 'status', 'mortality_type', 'fence_type', 'road_type', 'additional_notes'];

    // Build dynamic WHERE clause for filters
    $whereClauses = [];
    $queryParamsBindings = [];
    foreach ($queryParams as $key => $value) {
        // Handle greater than / less than filters
        if (preg_match('/^(.*)_(gt|gte|lt|lte)$/', $key, $matches)) {
            $field = $matches[1];
            $operator = $matches[2] === 'gt' ? '>' : ($matches[2] === 'gte' ? '>=' : ($matches[2] === 'lt' ? '<' : '<='));
            if (in_array($field, $filterableFields)) {
                $whereClauses[] = "$field $operator :$key";
                $queryParamsBindings[$key] = $value;
            }
        }

        // Handle equals filters
        if (preg_match('/^(.*)_eq$/', $key, $matches)) {
            $field = $matches[1];
            if (in_array($field, $filterableFields)) {
                $whereClauses[] = "$field = :$key";
                $queryParamsBindings[$key] = $value;
            }
        }

        // Handle case-insensitive "includes" filters
        if (preg_match('/^(.*)_like$/', $key, $matches)) {
            $field = $matches[1];
            if (in_array($field, $filterableFields)) {
                $whereClauses[] = "LOWER($field) LIKE LOWER(:$key)";
                $queryParamsBindings[$key] = "%$value%";
            }
        }
    }

    // Combine WHERE clauses
    $whereSql = !empty($whereClauses) ? 'WHERE ' . implode(' AND ', $whereClauses) : '';

    // Build SQL for total count
    $countSql = "SELECT COUNT(*) as totalCount FROM sightings $whereSql";
    $countStmt = $this->db->prepare($countSql);
    foreach ($queryParamsBindings as $key => $value) {
        $countStmt->bindValue(":$key", $value);
    }
    $countStmt->execute();
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['totalCount'];

    // Build SQL for paginated data
    $sql = "SELECT * FROM sightings $whereSql ORDER BY $sortField $sortDirection LIMIT :limit OFFSET :offset";
    $stmt = $this->db->prepare($sql);
    foreach ($queryParamsBindings as $key => $value) {
        $stmt->bindValue(":$key", $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $sightings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return [
        'sightings' => $sightings,
        'totalCount' => (int)$totalCount
    ];
}

  public function getSightingById($id)
  {
    $sql = "SELECT * FROM sightings WHERE id = :id";
    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function createSighting($data)
  {
    $sql = "INSERT INTO sightings (photo, latitude, longitude, status, mortality_type, fence_type, road_type, additional_notes)
                  VALUES (:photo, :latitude, :longitude, :status, :mortality_type, :fence_type, :road_type, :additional_notes)";
    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':photo', $data['photo']);
    $stmt->bindParam(':latitude', $data['location']['latitude']);
    $stmt->bindParam(':longitude', $data['location']['longitude']);
    $stmt->bindParam(':status', $data['status']);
    $stmt->bindParam(':mortality_type', $data['mortalityType']);
    $stmt->bindParam(':fence_type', $data['metadata']['fenceType']);
    $stmt->bindParam(':road_type', $data['metadata']['roadType']);
    $stmt->bindParam(':additional_notes', $data['additionalNotes']);
    if ($stmt->execute()) {
      return $this->db->lastInsertId();
    } else {
      return false;
    }
  }
}
