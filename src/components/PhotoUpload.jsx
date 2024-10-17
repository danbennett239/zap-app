import React from 'react';

const PhotoUpload = ({ setPhoto }) => {
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);  // Set the photo as base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label>Upload a Photo:</label>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
    </div>
  );
};

export default PhotoUpload;
