import { useState, useEffect, useRef } from 'react';

const useMediaDevice = (constraints = { video: true, audio: false }) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let isMounted = true;  // Ensure the component is still mounted before setting stream

    const getMediaStream = async () => {
      try {
        if (!stream) {
          const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          if (isMounted) {
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Media device access denied');
        }
      }
    };

    getMediaStream();

    // Cleanup stream on unmount or if it needs to be stopped
    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [constraints, stream]);

  return { videoRef, error };
};

export default useMediaDevice;
