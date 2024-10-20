import React, { useEffect } from 'react';
import useMediaDevice from '../hooks/useMediaDevice';

const PhotoCapture = ({ setPhoto, setShowPhotoOptions, canvasRef, setCanvasVisible }) => {
  const { videoRef, error: mediaError } = useMediaDevice();

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    setCanvasVisible(true);

    const drawVideoToCanvas = () => {
      if (videoRef.current) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawVideoToCanvas);
      }
    };

    drawVideoToCanvas();

    return () => {
      // Clean up the canvas when the component unmounts
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [videoRef, canvasRef, setCanvasVisible]);

  const handleTakePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the current video frame to the canvas and capture the photo
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL (the captured photo)
    const photoData = canvas.toDataURL('image/png');
    setPhoto(photoData);  // Store the photo in the parent component

    setCanvasVisible(false);
    setShowPhotoOptions(false);
  };

  return (
    <div>
      <label>Take a Photo:</label>
      {mediaError && <p>{mediaError}</p>}
      <video ref={videoRef} autoPlay style={{ display: 'none' }} /> {/* Hide the video element */}
      <button type="button" onClick={handleTakePhoto}>Capture Photo</button>
    </div>
  );
};

export default PhotoCapture;
