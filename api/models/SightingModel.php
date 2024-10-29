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

  public function getSightings($limit, $offset, $status)
  {
    $sql = "SELECT * FROM sightings WHERE (:status IS NULL OR status = :status) ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->bindParam(':status', $status);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
    $stmt->bindParam(':latitude', $data['latitude']);
    $stmt->bindParam(':longitude', $data['longitude']);
    $stmt->bindParam(':status', $data['status']);
    $stmt->bindParam(':mortality_type', $data['mortality_type']);
    $stmt->bindParam(':fence_type', $data['fence_type']);
    $stmt->bindParam(':road_type', $data['road_type']);
    $stmt->bindParam(':additional_notes', $data['additional_notes']);
    return $stmt->execute();
  }

  public function updateSighting($id, $data)
  {
    $sql = "UPDATE sightings SET status = COALESCE(:status, status),
                                    mortality_type = COALESCE(:mortality_type, mortality_type),
                                    fence_type = COALESCE(:fence_type, fence_type),
                                    road_type = COALESCE(:road_type, road_type),
                                    additional_notes = COALESCE(:additional_notes, additional_notes),
                                    updated_at = CURRENT_TIMESTAMP
                WHERE id = :id";
    $stmt = $this->db->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':status', $data['status']);
    $stmt->bindParam(':mortality_type', $data['mortality_type']);
    $stmt->bindParam(':fence_type', $data['fence_type']);
    $stmt->bindParam(':road_type', $data['road_type']);
    $stmt->bindParam(':additional_notes', $data['additional_notes']);
    return $stmt->execute();
  }
}