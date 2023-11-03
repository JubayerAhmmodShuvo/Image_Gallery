import React, { useState, useEffect } from "react";

export function Grid({ children }) {
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setColumns(2); 
      } else if (window.innerWidth <= 1024) {
        setColumns(3); 
      } else {
        setColumns(5); 
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: "10px",
        padding: "10px",
        width: "100%",
        overflow: "hidden",
        height: "100%",
      
      }}
    >
      {children}
    </div>
  );
}
