import React from "react";

function Radio({ name, value, checked, label, onChange = () => {} }) {
  return (
    <label
      style={{
        backgroundColor: checked ? "#4048d2" : "#25282c",
        width: "100%",
        borderRadius: "5px",
        marginBottom: "10px",
        textAlign: "left",
        padding: "10px",
        marginLeft: "20px",
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ marginRight: "10px" }}
      />
      {label}
    </label>
  );
}

export default Radio;
