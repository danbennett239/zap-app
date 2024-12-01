import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const PhotoUpload = ({ setPhoto, setShowPhotoOptions }) => {
  const fileInputRef = useRef(null);
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Unsupported file type. Please upload a JPEG, PNG or JPG image.');
        fileInputRef.current.value = '';
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setShowPhotoOptions(false);
      };
      reader.readAsDataURL(file);

    }
  };

  return (
    <div>
      <label>Upload a Photo:</label>
      <input type="file" ref={fileInputRef} accept="image/jpeg, image/png, image/jpg" onChange={handlePhotoUpload} />
    </div>
  );
};

export default PhotoUpload;
