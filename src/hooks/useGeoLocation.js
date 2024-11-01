// Custom hook for getting user location
import { useState, useEffect } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
        (err) => {
          setLocationError(err.message);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser')
    }
  }, []);


  return { location, locationError }
}

export default useGeoLocation;