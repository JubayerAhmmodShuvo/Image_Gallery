import React from "react";

const AddPhotoButton = ({ onClick, imageInputRef, handlePhotoUpload }) => {
  return (
    <>
      <div
        className="add-photo-box cursor-pointer flex justify-center items-center text-lg font-serif text-red-500 align-middle rounded box-border h-48 w-48 p-8 border-2 border-gray-300 "
        onClick={onClick}
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
    </>
  );
};

export default AddPhotoButton;
