import React from "react";

const TimePicker = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
      />
    </div>
  );
};

export default TimePicker;
