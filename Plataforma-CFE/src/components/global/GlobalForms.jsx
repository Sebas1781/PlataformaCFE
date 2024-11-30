import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../global/Snackbar"; // Ajustar ruta según tu estructura
import { Dropdown, TextField, Checkbox, TextArea, Range, ImageInput } from "../Misc/MiscDesings";

export const GeneraFormularioReporte = ({
    data = [],
    initValues,
    title,
    description,
    titleBtn,
    msgSuccess,
    msgError,
    sendData,
}) => {
    const [formData, setFormData] = useState(initValues);
    const [currentSection, setCurrentSection] = useState(0);
    const [snackbar, setSnackbar] = useState({ message: "", type: "success" });

    const handleChange = (e, fieldName) => {
        const { type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [fieldName]: type === "checkbox" ? checked : value,
        }));
    };

    const handleNextSection = () => {
        if (currentSection < data.length - 1) {
            setCurrentSection((prev) => prev + 1);
        }
    };

    const handlePreviousSection = () => {
        if (currentSection > 0) {
            setCurrentSection((prev) => prev - 1);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Enviando datos a:", sendData);
            console.log("Datos del formulario:", formData);
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="max-w-5xl mx-auto space-y-8 p-8 bg-gradient-to-br from-white rounded-lg shadow-md"
            >
                {/* Encabezado */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-emerald-600 tracking-tight">{title}</h1>
                    <p className="text-gray-500 mt-3 text-lg">{description}</p>
                </div>

                {/* Sección actual */}
                {Array.isArray(data) && data.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-emerald-600">
                            {data[currentSection].sectionName}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data[currentSection].fields.map((field, fieldIndex) => (
                                <div key={fieldIndex} className="flex flex-col">
                                    {/* Renderizado dinámico de campos */}
                                    {field.type === "select" && (
                                        <Dropdown
                                        label={field.label} // Renderiza el label sobre el Dropdown
                                        options={field.options}
                                        onSelect={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                [field.name]: value,
                                            }))
                                        }
                                    />
                                    
                                    )}
                                    {(field.type === "text" ||
                                        field.type === "number" ||
                                        field.type === "date" ||
                                        field.type === "time") && (
                                        <TextField
                                            label={field.label} // El `label` ya se maneja en el componente
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ""}
                                            onChange={(e) => handleChange(e, field.name)}
                                        />
                                    )}
                                    {field.type === "textarea" && (
                                        <TextArea
                                            label={field.label}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ""}
                                            onChange={(e) => handleChange(e, field.name)}
                                        />
                                    )}
                                    {field.type === "checkbox" && (
                                        <Checkbox
                                            label={field.label}
                                            name={field.name}
                                            checked={formData[field.name] || false}
                                            onChange={(e) => handleChange(e, field.name)}
                                        />
                                    )}
                                    {field.type === "range" && (
                                        <Range
                                            label={field.label}
                                            name={field.name}
                                            min={field.min}
                                            max={field.max}
                                            value={formData[field.name] || field.min}
                                            onChange={(e) => handleChange(e, field.name)}
                                        />
                                    )}
                                    {field.type === "image" && (
                                        <ImageInput
                                            label={field.label}
                                            name={field.name}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    [field.name]: e.target.files[0],
                                                }))
                                            }
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Controles de navegación */}
                <div className="flex justify-between items-center">
                    {currentSection > 0 && (
                        <button
                            type="button"
                            onClick={handlePreviousSection}
                            className="bg-gray-300 text-gray-800 font-medium text-sm md:text-base px-6 py-3 rounded-full hover:bg-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                        >
                            ← Anterior
                        </button>
                    )}
                    {currentSection < data.length - 1 ? (
                        <button
                            type="button"
                            onClick={handleNextSection}
                            className="bg-emerald-600 text-white font-medium text-sm md:text-base px-6 py-3 rounded-full hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                        >
                            Siguiente →
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-emerald-600 text-white font-medium text-sm md:text-base px-6 py-3 rounded-full hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                        >
                            {titleBtn}
                        </button>
                    )}
                </div>
            </form>

            {/* Snackbar */}
            {snackbar.message && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    duration={3000}
                    onClose={() => setSnackbar({ message: "", type: "" })}
                />
            )}
        </>
    );
};
