import React from "react";

export default function ErrorBanner({ message }) {
  return (
    <div style={{
      backgroundColor: "#ff0033",
      color: "#fff",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "16px",
      fontWeight: "bold"
    }}>
      <span role="img" aria-label="warning">⚠️</span> {message}
    </div>
  );
}
