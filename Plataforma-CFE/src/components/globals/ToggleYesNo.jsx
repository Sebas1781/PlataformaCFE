import React from "react";

const ToggleYesNo = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <label className="font-semibold text-gray-700 mr-4">{label}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-green-600"
      />
    </div>
  );
};

export default ToggleYesNo;
