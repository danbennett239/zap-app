import React from 'react';

import useMediaDevice from '../hooks/useMediaDevice';

const PhotoCapture = ({ setPhoto }) => {
  const { videoRef, error: mediaError } = useMediaDevice();

  const handleTakePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL('image/png');
    setPhoto(photoData);
  };

  return (
    <div>
      <label>Take a Photo:</label>
      {mediaError && <p>{mediaError}</p>}
      <video ref={videoRef} autoPlay width="300" height="200" />
      <button type="button" onClick={handleTakePhoto}>Capture Photo</button>
    </div>
  );
};

export default PhotoCapture;