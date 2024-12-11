import React, { useState, useRef } from "react";
import Snackbar from "../global/Snackbar";
import { Dropdown, TextField, Checkbox, TextArea, Range, ImageInput } from "../Misc/MiscDesings";
import MapWithInputs from "../Misc/MapWithInputs"; 



export const GeneraFormularioReporte = ({
    data = [],
    initValues = {},
    title,
    description,
    titleBtn,
    msgSuccess,
    msgError,
    sendData,
}) => {
    const [formData, setFormData] = useState(initValues);
    const [currentSection, setCurrentSection] = useState(0);
    const [snackbar, setSnackbar] = useState(null);
    const [errors, setErrors] = useState({});
    const fieldRefs = useRef({});

    // Función para calcular el VSWR
    const calculateVSWR = (incidentPower, reflectedPower) => {
        if (incidentPower === 0) return 0; // Avoid division by zero
        const ratio = Math.sqrt(reflectedPower / incidentPower);
        return ((1 + ratio) / (1 - ratio)).toFixed(3); // Limit to 3 decimal places
    };

    // Manejador de cambios en los campos
    const handleChange = (e, fieldName) => {
        const { type, checked, value } = e.target;
        setFormData((prev) => {
            const updatedData = {
                ...prev,
                [fieldName]: type === "checkbox" ? (checked ? 1 : 0) : value,
            };

            // Actualización dinámica de VSWR
            if (["potenciaIncidente", "potenciaReflejada"].includes(fieldName)) {
                const incidentPower = parseFloat(updatedData.potenciaIncidente) || 0;
                const reflectedPower = parseFloat(updatedData.potenciaReflejada) || 0;
                updatedData.vswr = calculateVSWR(incidentPower, reflectedPower);
            }

            return updatedData;
        });

        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    // Validación de la sección actual
    const validateCurrentSection = () => {
        const currentFields = data[currentSection]?.fields || [];
        const newErrors = {};

        currentFields.forEach((field) => {
            const value = formData[field.name];
            if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
                newErrors[field.name] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setSnackbar({
                message: "Faltan campos obligatorios en esta sección.",
                type: "error",
            });
            return false;
        }
        return true;
    };

    // Manejo de navegación entre secciones
    const handleNextSection = (e) => {
        e.preventDefault();
        if (validateCurrentSection()) {
            setCurrentSection((prev) => prev + 1);
        }
    };

    const handlePreviousSection = (e) => {
        e.preventDefault();
        setCurrentSection((prev) => Math.max(prev - 1, 0));
    };

    // Envío del formulario
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateCurrentSection()) return;

        // Asegurar que todos los checkboxes no marcados estén en 0
        const updatedFormData = { ...formData };
        data.forEach((section) => {
            section.fields.forEach((field) => {
                if (field.type === "checkbox" && !updatedFormData[field.name]) {
                    updatedFormData[field.name] = 0;
                }
            });
        });

        try {
            const response = await sendData(updatedFormData);
            if (response.success) {
                setSnackbar({ message: msgSuccess, type: "success" });
                setFormData(initValues); // Resetear formulario tras éxito
                setCurrentSection(0); // Volver a la primera sección
            } else {
                setSnackbar({ message: msgError, type: "error" });
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setSnackbar({ message: msgError, type: "error" });
        }
    };

    // Renderizado de campos
    const renderField = (field) => {
        const value = formData[field.name] || (field.type === "map" ? { lat: 0, lng: 0 } : "");
        const hasError = errors[field.name];

        switch (field.type) {
            case "text":
            case "number":
            case "date":
            case "time":
                return (
                    <TextField
                        key={field.name}
                        {...field}
                        value={value}
                        error={hasError}
                        onChange={(e) => handleChange(e, field.name)}
                    />
                );
            case "textarea":
                return (
                    <TextArea
                        key={field.name}
                        {...field}
                        value={value}
                        error={hasError}
                        onChange={(e) => handleChange(e, field.name)}
                    />
                );
            case "select":
                return (
                    <Dropdown
                        key={field.name}
                        {...field}
                        value={value}
                        error={hasError}
                        onSelect={(selectedValue) =>
                            setFormData((prev) => ({ ...prev, [field.name]: selectedValue }))
                        }
                    />
                );
            case "checkbox":
                return (
                    <Checkbox
                        key={field.name}
                        {...field}
                        checked={!!value}
                        error={hasError}
                        onChange={(e) => handleChange(e, field.name)}
                    />
                );
            case "range":
                return (
                    <Range
                        key={field.name}
                        {...field}
                        value={value}
                        error={hasError}
                        onChange={(e) => handleChange(e, field.name)}
                    />
                );
            case "image":
                return (
                    <ImageInput
                        key={field.name}
                        {...field}
                        error={hasError}
                        onChange={(e) => handleFileChange(e, field.name)}
                    />
                );
            case "map":
                return (
                    <MapWithInputs
                        key={field.name}
                        {...field}
                        value={value}
                        onChange={(location) => handleMapChange(location, field.name)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="max-w-5xl mx-auto p-8 bg-white rounded-lg space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-emerald-600">{title}</h1>
                <p className="text-gray-500">{description}</p>
            </div>

            <div className="space-y-4">
                {data[currentSection]?.fields.map((field) => renderField(field))}
            </div>

            <div className="flex justify-between">
                {currentSection > 0 && (
                    <button
                        type="button"
                        onClick={handlePreviousSection}
                        className="px-6 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
                    >
                        Anterior
                    </button>
                )}
                {currentSection < data.length - 1 ? (
                    <button
                        type="button"
                        onClick={handleNextSection}
                        className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                        {titleBtn}
                    </button>
                )}
            </div>

            {snackbar && snackbar.message && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    duration={3000}
                    onClose={() => setSnackbar(null)}
                />
            )}
        </form>
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
            [fieldName]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Ensure all checkboxes are set to 0 if not selected
        const updatedFormData = { ...formData };
        data.forEach(section => {
            section.fields.forEach(field => {
                if (field.type === "checkbox" && !updatedFormData[field.name]) {
                    updatedFormData[field.name] = 0;
                }
            });
        });
        try {
            console.log("Enviando datos a:", sendData);
            console.log("Datos del formulario:", updatedFormData);
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

export const GeneraFormularioLogin = ({ data, initValues, handleFormSubmit }) => {
    const [formData, setFormData] = useState(initValues);

    const handleChange = (e, fieldName) => {
        const { type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [fieldName]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(formData); // Llama a la función proporcionada con los valores del formulario
    };

    return (
        <div className="bg-transparent flex justify-center items-center h-screen">
            {/* Left: Image */}
            <div className="w-1/2 h-screen hidden lg:block">
                <img
                    src="/LoginCFE.png"
                    alt="Login"
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Right: Form */}
            <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4 text-center">{data.title}</h1>
                <form onSubmit={onSubmit}>
                    {data.fields.map((field) => (
                        <div key={field.name} className="mb-4">
                            <label htmlFor={field.name} className="block text-gray-600">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ""}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-emerald-500"
                                onChange={(e) => handleChange(e, field.name)}
                            />
                        </div>
                    ))}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        {data.titleBtn}
                    </button>
                </form>
            </div>
        </div>
    );
};

