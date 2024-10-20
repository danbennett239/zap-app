import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload';
import PhotoCapture from './PhotoCapture';

const PhotoOptions = ({ setPhoto, setShowPhotoOptions, canvasRef, setCanvasVisible }) => {
  const [option, setOption] = useState(null);

  return (
    <div>
      {!option && (
        <div>
          <button onClick={() => setOption('upload')}>Upload from Device</button>
          <button onClick={() => setOption('camera')}>Take a Photo</button>
        </div>
      )}

      {option === 'upload' && <PhotoUpload setPhoto={setPhoto} setShowPhotoOptions={setShowPhotoOptions} />}
      {option === 'camera' && <PhotoCapture setPhoto={setPhoto} setShowPhotoOptions={setShowPhotoOptions} canvasRef={canvasRef} setCanvasVisible={setCanvasVisible}/>}
    </div>
  );
};

export default PhotoOptions;
