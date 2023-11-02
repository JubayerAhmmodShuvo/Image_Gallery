import React, { useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Grid } from "../Grid";
import SortablePhoto from "../SortablePhoto/SortablePhoto";
import photos from "../../photos.json";
import GalleryHeader from "./GalleryHeader";

const Gallery = () => {
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [selectedImages, setSelectedImages] = useState([]);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const imageInputRef = useRef(null);

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
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

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
      <h1 className="text-2xl text-center font-serif my-4">Image Gallery</h1>
      <GalleryHeader
        selectedImages={selectedImages}
        deleteVisible={deleteVisible}
        handleDelete={handleDelete}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid>
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
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Gallery;
