export function getDistanceInKm(x1, y1, x2, y2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(x2 - x1);
  const dLon = deg2rad(y2 - y1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(x1)) * Math.cos(deg2rad(x2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // Round to 2 DP
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
