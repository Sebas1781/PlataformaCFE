import React, { useState, useRef } from "react";
import Snackbar from "../global/Snackbar";
import { Dropdown, TextField, Checkbox, TextArea, Range, ImageInput } from "../Misc/MiscDesings";
import MapWithInputs from "../Misc/MapWithInputs"; // Asegúrate de que la ruta sea correcta



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

    const calculateVSWR = (incidentPower, reflectedPower) => {
        if (incidentPower === 0) return 0; // Avoid division by zero
        const ratio = Math.sqrt(reflectedPower / incidentPower);
        return ((1 + ratio) / (1 - ratio)).toFixed(3); // Limit to 3 decimal places
    };

    const handleChange = (e, fieldName) => {
        const { type, checked, value } = e.target;
        setFormData((prev) => {
            const updatedData = {
                ...prev,
                [fieldName]: type === "checkbox" ? (checked ? 1 : 0) : value,
            };

            if (fieldName === "potenciaIncidente" || fieldName === "potenciaReflejada") {
                const incidentPower = parseFloat(updatedData["potenciaIncidente"]) || 0;
                const reflectedPower = parseFloat(updatedData["potenciaReflejada"]) || 0;
                updatedData["vswr"] = calculateVSWR(incidentPower, reflectedPower);
            }

            return updatedData;
        });

        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    const handleMapChange = (location, fieldName) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: location, // Actualizamos el objeto completo (latitud y longitud)
        }));
        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            [fieldName]: file,
        }));
        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    const validateCurrentSection = () => {
        const currentFields = data[currentSection]?.fields || [];
        const newErrors = {};
        let firstErrorField = null;

        currentFields.forEach((field) => {
            const value = formData[field.name];
            if (field.required) {
                if (!value || (Array.isArray(value) && value.length === 0)) {
                    newErrors[field.name] = true;
                    if (!firstErrorField) firstErrorField = field.name;
                }
            }
        });

        setErrors(newErrors);

        if (firstErrorField && fieldRefs.current[firstErrorField]) {
            fieldRefs.current[firstErrorField].focus();
        }

        if (Object.keys(newErrors).length > 0) {
            setSnackbar({
                message: "Faltan campos por llenar. Por favor, revisa la sección.",
                type: "error",
            });
            return false;
        }

        return true;
    };

    const handleNextSection = (e) => {
        e.preventDefault();
        if (!validateCurrentSection()) return;
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
        if (!validateCurrentSection()) return;
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

    const renderField = (field) => {
        const value = formData[field.name] || (field.type === "map" ? { lat: 0, lng: 0 } : ""); // Ensure valid LatLngLiteral
        const hasError = errors[field.name];

        const baseStyles = "border rounded-lg";
        const errorStyles = hasError ? "border-red-500" : "border-gray-300";

        const refCallback = (el) => {
            fieldRefs.current[field.name] = el;
        };

        switch (field.type) {
            case "text":
            case "number":
            case "date":
            case "time":
                return (
                    <TextField
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => handleChange(e, field.name)}
                        className={`${baseStyles} ${errorStyles}`}
                        ref={refCallback}
                        readOnly={field.name === "vswr"}
                    />
                );
            case "textarea":
                return (
                    <TextArea
                        label={field.label}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => handleChange(e, field.name)}
                        className={`${baseStyles} ${errorStyles}`}
                        ref={refCallback}
                    />
                );
            case "select":
                return (
                    <Dropdown
                        label={field.label}
                        options={field.options}
                        value={value}
                        onSelect={(selectedValue) =>
                            setFormData((prev) => ({
                                ...prev,
                                [field.name]: selectedValue,
                            }))
                        }
                        className={`${baseStyles} ${errorStyles}`}
                        ref={refCallback}
                    />
                );
            case "checkbox":
                return (
                    <Checkbox
                        label={field.label}
                        name={field.name}
                        checked={value}
                        onChange={(e) => handleChange(e, field.name)}
                        className={`${baseStyles} ${errorStyles}`}
                        ref={refCallback}
                    />
                );
            case "range":
                return (
                    <Range
                        label={field.label}
                        name={field.name}
                        min={field.min}
                        max={field.max}
                        value={value}
                        onChange={(e) => handleChange(e, field.name)}
                        className={`${baseStyles} ${errorStyles}`}
                        ref={refCallback}
                    />
                );
            case "image":
                return (
                    <ImageInput
                        label={field.label}
                        name={field.name}
                        onChange={(e) => handleFileChange(e, field.name)}
                        className={`${baseStyles} ${errorStyles}`}
                        ref={refCallback}
                    />
                );
            case "map":
                return (
                    <MapWithInputs
                        value={value}
                        onChange={(location) => handleMapChange(location, field.name)}
                        className={`${baseStyles} ${errorStyles}`}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="max-w-5xl mx-auto p-8 bg-white rounded-lg space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-emerald-600">{title}</h1>
                    <p className="text-gray-500">{description}</p>
                </div>

                {data[currentSection]?.fields.map((field, index) => (
                    <div key={index} className="flex flex-col space-y-4">
                        {renderField(field)}
                    </div>
                ))}

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
            </form>

            {snackbar && snackbar.message && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    duration={3000}
                    onClose={() => setSnackbar(null)}
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

export const GeneraFormularioLogin = ({
    data = [],
    initValues = {},
    title,
    description,
    titleBtn,
    msgSuccess,
    msgError,
    sendData,
    onSuccess,
}) => {
    const [formData, setFormData] = useState(initValues);
    const [snackbar, setSnackbar] = useState(null);

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
            console.log("Datos enviados:", formData); // Simula envío
            setSnackbar({ message: msgSuccess, type: "success" });
            if (onSuccess) onSuccess(formData); // Llama a la función de éxito
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setSnackbar({ message: msgError, type: "error" });
        }
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
                <h1 className=" text-2xl font-semibold mb-4 text-center">{title}</h1>
                <p className="text-gray-600 mb-6 text-center">{description}</p>
                <form onSubmit={handleFormSubmit}>
                    {data.map((field) => {
                        if (field.type === "checkbox") {
                            return (
                                <div key={field.name} className="mb-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        id={field.name}
                                        name={field.name}
                                        className="h-4 w-4 border border-gray-300 rounded"
                                        checked={formData[field.name] || false}
                                        onChange={(e) => handleChange(e, field.name)}
                                    />
                                    <label
                                        htmlFor={field.name}
                                        className="text-green-900 ml-2"
                                    >
                                        {field.label}
                                    </label>
                                </div>
                            );
                        } else {
                            return (
                                <div key={field.name} className="mb-4">
                                    <label
                                        htmlFor={field.name}
                                        className="block text-gray-600"
                                    >
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
                            );
                        }
                    })}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        {titleBtn}
                    </button>
                </form>
                {/* Optional Snackbar */}
                {snackbar && (
                    <div
                        className={`mt-4 p-4 rounded ${
                            snackbar.type === "success"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                        }`}
                    >
                        {snackbar.message}
                    </div>
                )}
            </div>
        </div>
    );
};
