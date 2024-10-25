// useMediaDevice.js

import { useState, useEffect, useRef } from 'react';

const useMediaDevice = (constraints = { video: true, audio: false }) => {
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (isMounted) {
          streamRef.current = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Media device access denied');
        }
      }
    };

    getMediaStream();

    // Cleanup stream on unmount
    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [constraints]);

  return { videoRef, error };
};

export default useMediaDevice;
