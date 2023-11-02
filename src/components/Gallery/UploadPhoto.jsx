import React, { useState, useRef } from "react";
import photos from "../../photos.json";
const UploadPhoto = () => {
  const [items, setItems] = useState(photos);
  const imageInputRef = useRef(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setItems([...items, imageUrl]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <div>
      <div
        className="add-photo-box flex justify-center items-center text-lg font-serif text-red-500 align-middle rounded box-border h-48 w-48 p-8 border-2 border-gray-300 "
        onClick={handleAddPhotoClick}
      >
        Add Photo
      </div>
      <input
        ref={imageInputRef}
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadPhoto;
