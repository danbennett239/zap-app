import React, { useEffect, useRef } from 'react';
import useMediaDevice from '../hooks/useMediaDevice';

const PhotoCapture = ({ setPhoto, setShowPhotoOptions }) => {

  // const {
  //   videoRef,
  //   devices,
  //   selectedDeviceId,
  //   setSelectedDeviceId,
  //   error: mediaError,
  // } = useMediaDevice();

  const { videoRef, devices, selectedDeviceId, setSelectedDeviceId, error, hasPermission, initializingPermissions, loadingCamera } = useMediaDevice();

  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    let animationFrameId;

    const drawVideoToCanvas = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(drawVideoToCanvas);
    };

    const startDrawing = () => {
      // Start drawing frames to the canvas
      drawVideoToCanvas();
    };

    if (video.readyState >= 2) {
      // Video is ready
      startDrawing();
    } else {
      // Wait for the video to be ready
      video.addEventListener('loadeddata', startDrawing);
    }

    return () => {
      // Clean up
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadeddata', startDrawing);
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
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
      {/* {devices.length > 0 ? (
        <select
          value={selectedDeviceId || ''}
          onChange={handleDeviceSelect}
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
      ) : (
        <p>No cameras available</p>
      )} */}
      {loadingCamera && <p>Loading camera...</p>}
      {initializingPermissions && <p>Requesting camera permissions, please wait...</p>}
      {error && <p>{error === 'Media device access denied'
        ? 'Please enable camera permissions in your browser settings.'
        : error}</p>}
      {/* {!loading && !error && !hasPermission && <p>Please allow camera access...</p>} */}
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
          {/* Show Take Photo button, video, etc. */}
        </>
      )}
      <label>Take a Photo:</label>
      {/* {mediaError && <p>{mediaError}</p>} */}
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
      <canvas ref={canvasRef} width="300" height="200" />
      <button type="button" onClick={handleTakePhoto}>Capture Photo</button>
    </div>
  );
};

export default PhotoCapture;
