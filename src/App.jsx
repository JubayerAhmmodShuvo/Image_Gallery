import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Grid } from "./components/Grid";

import photos from "./photos.json";

import "./App.css";
import SortablePhoto from "./components/SortablePhoto/SortablePhoto";

const App = () => {
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [selectedImages, setSelectedImages] = useState([]);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleCheckboxChange = (url) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(url)) {
        return prevSelectedImages.filter((image) => image !== url);
      } else {
        return [...prevSelectedImages, url];
      }
    });
    setDeleteVisible(true);
  };

  const handleDelete = () => {
    setItems((prevItems) =>
      prevItems.filter((url) => !selectedImages.includes(url))
    );
    setSelectedImages([]);
    setDeleteVisible(false);
  };

  const toggleDeleteButton = () => {
    if (selectedImages.length > 0) {
      setDeleteVisible(true);
    } else {
      setDeleteVisible(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 border border-gray-300 mt-12 ">
      <h1 className="text-2xl text-center font-serif my-4">Image Gallery</h1>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="text-xl font-semibold mx-4 mt-2 font-serif my-auto border-b  "
      >
        {selectedImages.length > 0
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid >
            {items.map((url, index) => (
              <SortablePhoto
                key={url}
                url={url}
                index={index}
                checked={selectedImages.includes(url)}
                onChange={handleCheckboxChange}
                toggleDeleteButton={toggleDeleteButton}
                selectedImages={selectedImages}
              />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;
