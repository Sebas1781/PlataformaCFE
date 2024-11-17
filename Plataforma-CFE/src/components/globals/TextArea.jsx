import React from "react";

const TextArea = ({ label, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
        rows="4"
      />
    </div>
  );
};

export default TextArea;
