import React, { useEffect, useRef } from 'react';
import useMediaDevice from '../hooks/useMediaDevice';

const PhotoCapture = ({ setPhoto, setShowPhotoOptions }) => {

  const { videoRef, devices, selectedDeviceId, setSelectedDeviceId, error, hasPermission, initializingPermissions, loadingCamera } = useMediaDevice();

  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
  
    if (!video || !canvas) return;
  
    let animationFrameId;
    const context = canvas.getContext('2d');
  
    const drawVideoToCanvas = () => {
      // Only draw if dimensions are set correctly
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(drawVideoToCanvas);
    };
  
    const setCanvasSize = () => {
      // Set canvas size to match video aspect ratio
      // e.g., match video exactly:
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      // Now start drawing
      drawVideoToCanvas();
    };
  
    if (video.readyState >= 2) {
      // Video is already ready
      setCanvasSize();
    } else {
      // Wait for video to load metadata to get correct dimensions
      video.addEventListener('loadedmetadata', setCanvasSize);
    }
  
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadedmetadata', setCanvasSize);
      if (context) context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [videoRef]);

  const handleTakePhoto = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const photoData = canvas.toDataURL('image/png');
    setPhoto(photoData); // Pass the photo back to the parent component

    setShowPhotoOptions(false);
  };

  const handleDeviceSelect = (e) => {
    setSelectedDeviceId(e.target.value);
  };

  return (
    <div>
      {loadingCamera || initializingPermissions && <p>Loading camera...</p>}
      {error && <p>{error === 'Media device access denied'
        ? 'Please enable camera permissions in your browser settings.'
        : error}</p>}
      {hasPermission && devices.length === 0 && <p>No cameras available</p>}
      {hasPermission && devices.length > 0 && (
        <>
          <select
            value={selectedDeviceId || ''}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>

        </>
      )}

      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
      <canvas ref={canvasRef} width="300" height="200" />
      <button type="button" onClick={handleTakePhoto}>Capture Photo</button>
    </div>
  );
};

export default PhotoCapture;
