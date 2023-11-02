import React from "react";

const GalleryHeader = ({ selectedImages, deleteVisible, handleDelete }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between" }}
      className="text-xl font-semibold mx-4 mt-2 font-serif my-auto border-b"
    >
      {selectedImages?.length > 0
        ? `${selectedImages.length} files selected`
        : "Gallery"}
      {deleteVisible && (
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white !text-sm p-2 rounded !font-sans"
        >
          {selectedImages.length === 1
            ? "Delete File"
            : `Delete ${selectedImages.length} Files`}
        </button>
      )}
    </div>
  );
};

export default GalleryHeader;
