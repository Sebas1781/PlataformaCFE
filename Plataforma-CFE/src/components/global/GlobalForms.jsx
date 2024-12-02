import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../global/Snackbar"; // Ajustar ruta según tu estructura
import { Dropdown, TextField, Checkbox, TextArea, Range, ImageInput } from "../Misc/MiscDesings";
import MapWithInputs from "../Misc/MapWithInputs"; // Asegúrate de que la ruta sea correcta

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

    const handleMapChange = (location) => {
        setFormData((prev) => ({
            ...prev,
            ubicacionMapa: location,
        }));
    };

    const handleNextSection = (e) => {
        e.preventDefault();
        if (currentSection < data.length - 1) {
            setCurrentSection((prev) => prev + 1);
        }
    };

    const handlePreviousSection = (e) => {
        e.preventDefault();
        if (currentSection > 0) {
            setCurrentSection((prev) => prev - 1);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Enviando datos a:", sendData);
            console.log("Datos del formulario:", formData);
            setSnackbar({ message: msgSuccess, type: "success" });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setSnackbar({ message: msgError, type: "error" });
        }
    };

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="max-w-5xl mx-auto space-y-8 p-8 bg-gradient-to-br from-white rounded-lg flex flex-col"
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
                        <div className="grid grid-cols-1 gap-6">
                            {data[currentSection].fields.map((field, fieldIndex) => (
                                <div key={fieldIndex} className="flex flex-col">
                                    {/* Renderizado dinámico de campos */}
                                    {field.type === "select" && (
                                        <Dropdown
                                            label={field.label}
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
                                    {field.type === "map" && (
                                        <MapWithInputs
                                            value={formData[field.name] || {}}
                                            onChange={(location) => handleMapChange(location)}
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

export const GeneraFormularioUsuarios = ({
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
    const [snackbar, setSnackbar] = useState({ message: "", type: "success" });

    const handleChange = (e, fieldName) => {
        const { type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [fieldName]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Enviando datos a:", sendData);
            console.log("Datos del formulario:", formData);
            setSnackbar({ message: msgSuccess, type: "success" });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setSnackbar({ message: msgError, type: "error" });
        }
    };

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="max-w-3xl mx-auto space-y-8 p-8 bg-gradient-to-br from-white rounded-lg shadow-md"
            >
                {/* Encabezado */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-emerald-600 tracking-tight">{title}</h1>
                    <p className="text-gray-500 mt-3 text-lg">{description}</p>
                </div>

                {/* Campos del formulario */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="flex flex-col">
                            {/* Renderizado dinámico de campos */}
                            {field.type === "select" && (
                                <Dropdown
                                    label={field.label}
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
                                field.type === "password" ||
                                field.type === "number") && (
                                <TextField
                                    label={field.label}
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
                        </div>
                    ))}
                </div>

                {/* Botón de enviar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-emerald-600 text-white font-medium text-sm md:text-base px-6 py-3 rounded-full hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                    >
                        {titleBtn}
                    </button>
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
