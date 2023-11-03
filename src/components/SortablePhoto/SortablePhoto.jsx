import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Photo } from "../photo";
import styles from "./SortablePhoto.module.css";

const SortablePhoto = ({
  url,
  index,
  checked,
  onChange,
  toggleDeleteButton,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const sortable = useSortable({ id: url });
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let gridColumnSpan = "span 1";
  let gridRowSpan = "span 2";

  if (screenWidth > 768) {
    if (index === 0) {
      gridColumnSpan = "span 2";
      gridRowSpan = "span 3";
    } else if (index >= 1 && index <= 3) {
      gridColumnSpan = "span 1";
      gridRowSpan = "span 1";
    }
  } else if (screenWidth <= 768 && screenWidth > 1024) {
    if (index === 0) {
      gridColumnSpan = "span 2";
      gridRowSpan = "span 3";
    } else if (index >= 1 && index <= 3) {
      gridColumnSpan = "span 1";
      gridRowSpan = "span 1";
    }
  } else {
   
    gridColumnSpan = "span 1";
    gridRowSpan = "span 2";
  }

  const containerStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    margin: "0px",
    boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
  };

  const checkboxStyle = {
    position: "absolute",
    top: "5px",
    left: "5px",
    zIndex: 1,
    opacity: 0,
    transition: "opacity 0.3s",
  };

  return (
    <div
      className={`${styles["sortable-photo-container"]} ${
        url === "" ? styles["add-image-box"] : ""
      }`}
      style={{
        gridRow: gridRowSpan,
        gridColumn: gridColumnSpan,
        position: "relative",
        cursor: url === "" ? "pointer" : "auto",
        ...containerStyle,
      }}
      onClick={() => {
        if (url === "") {
          document.getElementById("image-input").click();
        }
      }}
      onMouseEnter={() => {
        if (url === "") return;
        const checkbox = document.getElementById(url);
        checkbox.style.opacity = "1";
        toggleDeleteButton();
      }}
      onMouseLeave={() => {
        if (url === "" || checked) return;
        const checkbox = document.getElementById(url);
        checkbox.style.opacity = "0";
      }}
    >
      {url !== "" && (
        <input
          type="checkbox"
          id={url}
          className="checkbox-visible"
          style={checkboxStyle}
          checked={checked}
          onChange={() => onChange(url)}
        />
      )}
      <Photo
        className={`${styles.Photo}`}
        ref={setNodeRef}
        style={style}
        url={url}
        index={index}
        {...attributes}
        {...listeners}
      />
    </div>
  );
};

export default SortablePhoto;
