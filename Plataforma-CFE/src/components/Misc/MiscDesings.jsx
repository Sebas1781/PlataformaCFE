// src/components/Misc/MiscDesigns.jsx

import React, { useState, forwardRef, useRef, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

// TextField
export const TextField = forwardRef(
  ({ label, name, placeholder, type = "text", value, onChange, className }, ref) => (
    <div className="flex flex-col space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-emerald-600"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-12 px-4 border rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 
        focus:ring-2 focus:ring-emerald-600 focus:outline-none hover:shadow-md transition-all duration-300 ${className}`}
      />
    </div>
  )
);

// TextArea
export const TextArea = forwardRef(
  ({ label, name, placeholder, value, onChange, className }, ref) => (
    <div className="flex flex-col space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-emerald-600"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-32 px-4 py-3 border rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 
        focus:ring-2 focus:ring-emerald-600 focus:outline-none hover:shadow-md transition-all duration-300 ${className}`}
      />
    </div>
  )
);

// Dropdown
export const Dropdown = forwardRef(
  (
    { label, options, placeholder = "Seleccione una opción", onSelect, value, className },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleOptionClick = (option) => {
      onSelect(option);
      setIsOpen(false);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="flex flex-col space-y-2" ref={dropdownRef}>
        {label && (
          <label className="text-sm font-medium text-gray-700 hover:text-emerald-600">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={ref}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full h-12 bg-white border text-gray-700 px-4 rounded-lg shadow-sm flex justify-between items-center 
            focus:ring-2 focus:outline-none transition-all duration-300 ${className} ${className.includes("border-red-500") ? "border-red-500" : ""}`}
          >
            <span className={`${!value ? "text-gray-400" : ""}`}>{value || placeholder}</span>
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-lg shadow-lg bg-white border max-h-60 overflow-y-auto">
              <ul className="py-2 text-gray-700 text-sm">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-200"
                  >
                    {option.nombre || option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Checkbox
export const Checkbox = forwardRef(({ label, name, checked, onChange }, ref) => (
  <div className="flex items-center space-x-3">
    <input
      ref={ref}
      id={name}
      name={name}
      type="checkbox"
      checked={checked} // boolean
      onChange={onChange}
      className="peer relative h-5 w-5 appearance-none rounded-md border border-gray-300 transition-all 
                 cursor-pointer before:absolute before:top-2/4 before:left-2/4 before:h-12 before:w-12 
                 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-emerald-500 
                 before:opacity-0 before:transition-opacity checked:border-emerald-600 checked:bg-emerald-600 
                 checked:before:bg-emerald-600 hover:before:opacity-10 focus:outline-none"
    />
    {label && (
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label}
      </label>
    )}
  </div>
));

// Range
export const Range = forwardRef(
  ({ label, name, min = 0, max = 100, value, onChange, className }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const handleInputChange = (e) => {
      const newValue = Math.min(Math.max(Number(e.target.value), min), max);
      onChange({ target: { name, value: newValue } });
    };

    return (
      <div className="flex flex-col space-y-3 w-full">
        {label && (
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {/* Range bar */}
          <div className="relative bg-gray-300 h-2 rounded-full">
            <span
              className="absolute bg-emerald-500 h-2 rounded-full"
              style={{ width: `${percentage}%` }}
            ></span>
            <span
              className="absolute bg-white h-4 w-4 -ml-2 -mt-1 top-0 z-10 shadow rounded-full cursor-pointer"
              style={{ left: `${percentage}%` }}
            ></span>
          </div>
          <input
            ref={ref}
            id={name}
            name={name}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            className={`absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer ${className}`}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">{min}</span>
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-16 h-10 px-2 border border-gray-300 rounded-lg text-center text-gray-700 shadow-sm focus:ring-emerald-500 focus:ring-2 focus:outline-none"
          />
          <span className="text-sm text-gray-600">{max}</span>
        </div>
      </div>
    );
  }
);

// ImageInput
export const ImageInput = forwardRef(({ label, name, onChange, className, error }, ref) => (
  <div className="flex flex-col space-y-2">
    {label && (
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label} {error && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      ref={ref}
      id={name}
      name={name}
      type="file"
      accept="image/*"
      onChange={onChange}
      className={`file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
                 file:bg-emerald-100 file:text-emerald-600 hover:file:bg-emerald-200 ${className} ${error ? "border-red-500" : ""
        }`}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
));

// (Opcional) GoogleMaps
export const GoogleMaps = ({ markers = [], onMapClick }) => (
  <GoogleMap
    mapContainerStyle={{ width: "100%", height: "400px" }}
    center={{ lat: 20.115417, lng: -98.758944 }}
    zoom={10}
    onClick={onMapClick}
  >
    {markers.map((marker, index) => (
      <Marker key={index} position={marker} />
    ))}
  </GoogleMap>
);
