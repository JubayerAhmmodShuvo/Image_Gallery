import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import images from "../../images";

const Gallery = () => {
  const [imageData, setImageData] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFeatureClick = (index) => {
    const newImageData = [...imageData];
    const [clickedImage] = newImageData.splice(index, 1);
    newImageData.unshift(clickedImage);
    setImageData(newImageData);
  };

  const toggleImageSelection = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const deleteSelectedImages = () => {
    const newData = imageData.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImageData(newData);
    setSelectedImages([]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = [...imageData];
    const [reorderedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, reorderedItem);

    setImageData(reorderedData);
  };

  return (
    <div>
      <div className="selected-count">
        {selectedImages.length > 0 && (
          <p>
            {selectedImages.length} image(s) selected
            <button
              onClick={deleteSelectedImages}
              className="bg-red-500 text-white py-2 px-4 ml-4"
            >
              Delete
            </button>
          </p>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-5 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {imageData.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative col-span-1 row-span-1 ${
                        index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                      }`}
                    >
                      <div className="relative">
                        <div className="absolute top-0 left-0 p-1 bg-red-500 text-white">
                          <input
                            type="checkbox"
                            checked={selectedImages.includes(image.id)}
                            onChange={() => toggleImageSelection(image.id)}
                          />
                        </div>
                        <img
                          src={image.url}
                          alt={image.title}
                          className={`w-full h-auto rounded ${
                            index === 0 ? "lg:h-96" : "md:h-36"
                          } ${
                            index !== 0 && snapshot.isDragging
                              ? "filter brightness-75"
                              : ""
                          }`}
                          onClick={() => handleFeatureClick(index)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Gallery;
