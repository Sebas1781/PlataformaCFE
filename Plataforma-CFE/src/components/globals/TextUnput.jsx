import React from "react";

const TextInput = ({ label, value, onChange, required = false, onlyNumbers = false }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <input
        type={onlyNumbers ? "number" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
      />
    </div>
  );
};

export default TextInput;
