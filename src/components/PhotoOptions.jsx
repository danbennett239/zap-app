import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload';
import PhotoCapture from './PhotoCapture';

const PhotoOptions = ({ setPhoto }) => {
  const [option, setOption] = useState(null);  // Manages whether to upload or capture

  return (
    <div>
      {!option && (
        <div>
          <button onClick={() => setOption('upload')}>Upload from Device</button>
          <button onClick={() => setOption('camera')}>Take a Photo</button>
        </div>
      )}

      {option === 'upload' && <PhotoUpload setPhoto={setPhoto} />}
      {option === 'camera' && <PhotoCapture setPhoto={setPhoto} />}
    </div>
  );
};

export default PhotoOptions;
