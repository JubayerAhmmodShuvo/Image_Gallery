import React from "react";

function Checkbox({ id, checked, onChange }) {
  return (
    <input
      type="checkbox"
      id={`checkbox-${id}`}
      checked={checked}
      onChange={() => onChange(id)}
    />
  );
}

export default Checkbox;
