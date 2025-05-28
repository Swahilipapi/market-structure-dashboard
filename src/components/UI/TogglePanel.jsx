// ✅ TogglePanel.jsx
import React from "react";

export default function TogglePanel({ toggles, setToggles }) {
  return (
    <div style={{ color: "#fff", marginBottom: 10 }}>
      {Object.entries(toggles).map(([key, value]) => (
        <label key={key} style={{ marginRight: 15 }}>
          <input
            type="checkbox"
            checked={value}
            onChange={() => setToggles({ ...toggles, [key]: !value })}
          />{' '}
          {key}
        </label>
      ))}
    </div>
  );
}