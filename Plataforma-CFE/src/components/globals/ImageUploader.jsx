import React from "react";

const ImageUploader = ({ label, onImageChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageChange(e.target.files[0])}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
      />
    </div>
  );
};

export default ImageUploader;
