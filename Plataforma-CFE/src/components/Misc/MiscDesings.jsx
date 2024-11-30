import { useState } from "react";

// Dropdown Component
export const Dropdown = ({ label, options, placeholder = "Seleccione una opción", onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="flex flex-col space-y-2">
            {label && (
                <label className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-emerald-600">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full h-12 bg-white border border-gray-300 text-gray-700 px-4 rounded-lg shadow-sm flex justify-between items-center 
                               hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 
                               hover:shadow-md transition-all duration-300"
                >
                    <span className={`${!selectedOption ? "text-gray-400" : ""}`}>
                        {selectedOption || placeholder}
                    </span>
                    <svg
                        className="ml-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full rounded-lg shadow-lg bg-white border border-gray-300">
                        <ul className="py-2 text-gray-700 text-sm">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className="px-4 py-2 cursor-pointer hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-200"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// TextField Component
export const TextField = ({ label, name, placeholder, type = "text", value, onChange }) => (
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
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="h-12 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 
                       focus:ring-2 focus:ring-emerald-600 focus:outline-none focus:border-emerald-600 
                       hover:shadow-md hover:border-emerald-600 transition-all duration-300"
        />
    </div>
);

// TextArea Component
export const TextArea = ({ label, name, placeholder, value, onChange }) => (
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
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="h-32 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400
                       focus:ring-2 focus:ring-emerald-600 focus:outline-none focus:border-emerald-600
                       hover:shadow-md hover:border-emerald-600 transition-all duration-300"
        />
    </div>
);

// Checkbox Component
export const Checkbox = ({ label, name, checked, onChange }) => (
    <div className="flex items-center space-x-3">
        <label
            htmlFor={name}
            className="relative flex cursor-pointer items-center p-3 rounded-full"
        >
            <input
                id={name}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer relative h-5 w-5 appearance-none rounded-md border border-gray-300 transition-all 
                           cursor-pointer before:absolute before:top-2/4 before:left-2/4 before:h-12 before:w-12 
                           before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-emerald-500 
                           before:opacity-0 before:transition-opacity checked:border-emerald-600 checked:bg-emerald-600 
                           checked:before:bg-emerald-600 hover:before:opacity-10 focus:outline-none"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
        </label>
        {label && (
            <label htmlFor={name} className="text-sm font-medium text-gray-800">
                {label}
            </label>
        )}
    </div>
);


// Range Component
export const Range = ({ label, name, min = 0, max = 100, value, onChange }) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const handleInputChange = (e) => {
        const newValue = Math.min(Math.max(Number(e.target.value), min), max);
        onChange({ target: { name, value: newValue } });
    };

    return (
        <div className="flex flex-col space-y-3 w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <div className="relative w-full">
                {/* Range bar */}
                <div className="relative bg-gray-300 h-2 rounded-full">
                    {/* Progress */}
                    <span
                        className="absolute bg-teal-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                    ></span>
                    {/* Thumb */}
                    <span
                        className="absolute bg-white h-4 w-4 -ml-2 -mt-1 top-0 z-10 shadow rounded-full cursor-pointer"
                        style={{ left: `${percentage}%` }}
                    ></span>
                </div>
                {/* Range slider input */}
                <input
                    id={name}
                    name={name}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                />
            </div>
            {/* Input and Min/Max Labels */}
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
};






// Image Input Component
export const ImageInput = ({ label, name, onChange }) => (
    <div className="flex flex-col space-y-2">
        <label htmlFor={name} className="text-sm font-medium text-gray-800">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type="file"
            accept="image/*"
            onChange={onChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-600 hover:file:bg-emerald-200"
        />
    </div>
);


