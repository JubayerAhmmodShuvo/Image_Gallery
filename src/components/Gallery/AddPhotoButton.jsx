import React from "react";

const AddPhotoButton = ({ onClick, imageInputRef, handlePhotoUpload }) => {
  return (
    <div
      className="grid-cell"
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "100%", 
      }}
    >
      <div
        className="add-photo-box cursor-pointer flex justify-center items-center text-lg font-serif text-red-500 align-middle rounded box-border p-8 border-2 border-gray-300 "
        onClick={onClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
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

export default AddPhotoButton;
