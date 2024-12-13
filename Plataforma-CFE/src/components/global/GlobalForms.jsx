import React, { useState, useRef } from "react";
import Snackbar from "../global/Snackbar";
import { Dropdown, TextField, Checkbox, TextArea, Range, ImageInput } from "../Misc/MiscDesings";
import MapWithInputs from "../Misc/MapWithInputs";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const GeneraFormularioReporte = ({
  data = [],
  initValues = {},
  title,
  description,
  titleBtn,
  msgSuccess,
  msgError,
  sendData = async () => ({ success: false }), // Default value
}) => {
  const [formData, setFormData] = useState(initValues);
  const [currentSection, setCurrentSection] = useState(0);
  const [snackbar, setSnackbar] = useState(null);
  const [errors, setErrors] = useState({});

  // Guarda refs de todos los campos
  const fieldRefs = useRef({});

  // Función para calcular el VSWR
  const calculateVSWR = (incidentPower, reflectedPower) => {
    if (incidentPower === 0) return 0; // Evita división por cero
    const ratio = Math.sqrt(reflectedPower / incidentPower);
    return ((1 + ratio) / (1 - ratio)).toFixed(3);
  };

  // Manejador de cambios
  const handleChange = (e, fieldName) => {
    const { type, checked, value } = e.target;
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [fieldName]: type === "checkbox" ? (checked ? 1 : 0) : value,
      };

      // VSWR dinámico
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
      // Si es required y está vacío (excepto para 0 en checkboxes)
      if (field.required && (!value && value !== 0)) {
        newErrors[field.name] = true;
      }
      // Si es array y está vacío
      if (field.required && Array.isArray(value) && value.length === 0) {
        newErrors[field.name] = true;
      }
    });

    setErrors(newErrors);

    // Si hay errores, enfocar el primer campo y mostrar snackbar
    if (Object.keys(newErrors).length > 0) {
      // Muestra Snackbar
      setSnackbar({
        message: "Faltan campos obligatorios en esta sección.",
        type: "error",
      });

      // Enfoca el primer campo con error
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField && fieldRefs.current[firstErrorField]) {
        fieldRefs.current[firstErrorField].focus();
      }

      return false;
    }
    return true;
  };

  // Manejo de navegación
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

    // Asegurar checkboxes no marcados -> 0
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
        setFormData(initValues);
        setCurrentSection(0);
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
    const value = formData[field.name] ?? (field.type === "checkbox" ? 0 : "");
    const hasError = errors[field.name];

    switch (field.type) {
      case "text":
      case "number":
      case "date":
      case "time":
        return (
          <TextField
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)} // <--- Guardar ref
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
            ref={(el) => (fieldRefs.current[field.name] = el)}
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
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            value={value}
            error={hasError}
            onSelect={(selectedValue) =>
              setFormData((prev) => ({ ...prev, [field.name]: selectedValue }))
            }
          />
        );
      case "checkbox":
        // El "focus" para un checkbox es menos común, pero lo guardamos igual
        return (
          <Checkbox
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            checked={value === 1}
            error={hasError}
            onChange={(e) => handleChange(e, field.name)}
          />
        );
      case "range":
        return (
          <Range
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
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
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            error={hasError}
            onChange={(e) => handleFileChange(e, field.name)}
          />
        );
      case "map":
        // Para un mapa, el "focus" es diferente, pero igual guardamos la ref
        return (
          <MapWithInputs
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            value={value}
            onChange={(location) => handleMapChange(location, field.name)}
          />
        );
      default:
        return null;
    }
  };

  const handleMapChange = (location, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: { lat: location.lat, lng: location.lng },
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
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
  const [snackbar, setSnackbar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e, fieldName) => {
    const { type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = await handleFormSubmit(formData);
      if (!isValid) {
        setSnackbar({ message: "Credenciales incorrectas", type: "error" });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSnackbar({ message: "Error al procesar la solicitud", type: "error" });
    }
  };

  return (
    <div className="bg-transparent flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="/LoginCFE.png"
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4 text-center">{data.title}</h1>
        <form onSubmit={onSubmit}>
          {data.fields.map((field) => {
            // Checkbox
            if (field.type === "checkbox") {         
                return (
                  <div key={field.name} className="mb-4">
                      <Checkbox
                          label={field.label}
                          name={field.name}
                          checked={formData[field.name] || 0}
                          onChange={(e) => handleChange(e, field.name)}
                      />
                  </div>
              );
          }

            // Password con ícono de ojo
            if (field.type === "password") {
              return (
                <div key={field.name} className="mb-4">
                  <label htmlFor={field.name} className="block text-gray-600 mb-1">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(e, field.name)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3
                                 focus:outline-none focus:border-emerald-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-6 w-5" />
                      ) : (
                        <FaEye className="h-6 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            }

            // Campos normales (text, etc.)
            return (
              <div key={field.name} className="mb-4">
                <label htmlFor={field.name} className="block text-gray-600 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-emerald-500"
                  onChange={(e) => handleChange(e, field.name)}
                />
              </div>
            );
          })}

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {data.titleBtn}
          </button>
        </form>

         {/* Usamos tu Snackbar personalizado */}
         {snackbar && snackbar.message && (
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            duration={3000}
            onClose={() => setSnackbar(null)}
          />
        )}
      </div>
    </div>
  );
};
