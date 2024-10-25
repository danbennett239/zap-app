import React, { useEffect, useRef } from 'react';
import useMediaDevice from '../hooks/useMediaDevice';

const PhotoCapture = ({ setPhoto, setShowPhotoOptions }) => {
  const { videoRef, error: mediaError } = useMediaDevice();
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

  return (
    <div>
      <label>Take a Photo:</label>
      {mediaError && <p>{mediaError}</p>}
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
      <canvas ref={canvasRef} width="300" height="200" />
      <button type="button" onClick={handleTakePhoto}>Capture Photo</button>
    </div>
  );
};

export default PhotoCapture;
