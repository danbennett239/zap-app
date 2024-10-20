import React from 'react';

const PhotoUpload = ({ setPhoto, setShowPhotoOptions }) => {
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
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
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
    </div>
  );
};

export default PhotoUpload;
