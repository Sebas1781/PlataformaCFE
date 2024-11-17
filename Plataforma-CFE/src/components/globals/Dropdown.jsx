import React from "react";

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
      >
        <option value="">Seleccionar...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
