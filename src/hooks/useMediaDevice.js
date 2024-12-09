import { useState, useEffect, useRef } from 'react';

const useMediaDevice = () => {
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(localStorage.getItem('preferredDeviceId') || null);
  const [hasPermission, setHasPermission] = useState(false);
  const [initializingPermissions, setInitializingPermissions] = useState(true); // true before permission known
  const [loadingCamera, setLoadingCamera] = useState(false); // true when setting up camera stream
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Initially, request permission with either preferred device or generic
        const constraints = selectedDeviceId
          ? { video: { deviceId: { exact: selectedDeviceId } } }
          : { video: true };

        const testStream = await navigator.mediaDevices.getUserMedia(constraints);
        testStream.getTracks().forEach(t => t.stop());
        if (isMounted) {
          setHasPermission(true);
        }
      } catch (err) {
        // If failed with a preferred device, try fallback
        if (selectedDeviceId) {
          setSelectedDeviceId(null);
          try {
            const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
            fallbackStream.getTracks().forEach(t => t.stop());
            if (isMounted) {
              setHasPermission(true);
            }
          } catch (fallbackErr) {
            if (isMounted) {
              setError('Media device access denied.');
            }
          }
        } else {
          if (isMounted) {
            setError('Media device access denied.');
          }
        }
      } finally {
        if (isMounted) {
          setInitializingPermissions(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      if (!hasPermission || initializingPermissions) return;
      try {
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = deviceInfos.filter(d => d.kind === 'videoinput');
        setDevices(videoDevices);
        // If no preferred device or not found, set default
        if (!selectedDeviceId || !videoDevices.some(d => d.deviceId === selectedDeviceId)) {
          if (videoDevices.length > 0) {
            setSelectedDeviceId(videoDevices[0].deviceId);
          } else {
            setError('No cameras available');
          }
        }
      } catch (err) {
        setError('Error enumerating devices.');
      }
    };

    fetchDevices();
  }, [hasPermission, initializingPermissions, selectedDeviceId]);

  useEffect(() => {
    let isMounted = true;
    const getMediaStream = async () => {
      if (!hasPermission || !selectedDeviceId || initializingPermissions) return;
      try {
        setLoadingCamera(true);
        const constraints = { video: { deviceId: { exact: selectedDeviceId } } };
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (isMounted && videoRef.current) {
          streamRef.current = mediaStream;
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        if (isMounted) {
          setError('Media device access denied or unsupported device selected.');
        }
      } finally {
        if (isMounted) {
          setLoadingCamera(false);
        }
      }
    };
    getMediaStream();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [hasPermission, selectedDeviceId, initializingPermissions]);

  useEffect(() => {
    if (selectedDeviceId) {
      localStorage.setItem('preferredDeviceId', selectedDeviceId);
    }
  }, [selectedDeviceId]);

  return { videoRef, devices, selectedDeviceId, setSelectedDeviceId, error, hasPermission, initializingPermissions, loadingCamera };
};

export default useMediaDevice;
