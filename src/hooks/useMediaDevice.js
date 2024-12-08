import { useState, useEffect, useRef } from 'react';

const useMediaDevice = (initialConstraints = { video: true, audio: false }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Fetch available video input devices
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = deviceInfos.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);

        // Automatically set the first device as the default if none is selected
        if (videoDevices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (err) {
        setError('Error enumerating devices.');
      }
    };

    fetchDevices();
  }, [selectedDeviceId]);

  // Get media stream based on the selected device
  useEffect(() => {
    let isMounted = true;

    const getMediaStream = async () => {
      if (!selectedDeviceId) return;

      try {
        const constraints = {
          ...initialConstraints,
          video: { ...initialConstraints.video, deviceId: { exact: selectedDeviceId } },
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

        if (isMounted) {
          streamRef.current = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Media device access denied or unsupported device selected.');
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
  }, [selectedDeviceId, initialConstraints]);

  return { videoRef, devices, selectedDeviceId, setSelectedDeviceId, error };
};

export default useMediaDevice;
