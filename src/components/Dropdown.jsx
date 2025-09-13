import React from "react";

const Dropdown = ({ options = {} }) => {
  return (
    <div
      style={{
        position: "absolute",
        // top: "115%",
        marginTop: "0.25rem",
        right: 0,
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "0.375rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        zIndex: 10,
        minWidth: "140px",
        overflow: "hidden", // ensures rounded corners look clean
      }}
    >
      {Object.entries(options).map(([label, handler], index) => (
        <button
          key={index}
          type="button"
          style={{
            width: "100%",
            padding: "0.5rem 1rem",
            background: "none",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            transition: "background 0.2s ease, color 0.2s ease",
            borderRadius: index === 0 ? "0.375rem 0.375rem 0 0" : index === Object.entries(options).length - 1 ? "0 0 0.375rem 0.375rem" : "0",
          }}
          onClick={handler}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9"; // light gray hover
            e.currentTarget.style.color = "#111";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "inherit";
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
