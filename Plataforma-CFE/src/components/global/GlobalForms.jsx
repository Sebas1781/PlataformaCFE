
import React, { useState, useRef } from "react";
import Snackbar from "../global/Snackbar";
import { Dropdown, TextField, Checkbox, TextArea, Range, ImageInput } from "../Misc/MiscDesings";
import MapWithInputs from "../Misc/MapWithInputs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


// GeneraFormularioReporte Component
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
  const navigate = useNavigate();

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

      // Actualizar nombreReporte si cambian direccion, fecha o responsable
      if (["direccion", "fecha", "responsable"].includes(fieldName)) {
        const { direccion = "", fecha = "", responsable = "" } = updatedData;
        updatedData.nombreReporte = `${direccion}-${fecha}-${responsable}`;
      }

      return updatedData;
    });

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  // Manejo de cambios en el mapa
  const handleMapChange = (location, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: { lat: location.lat, lng: location.lng },
    }));
  };

  // Manejo de cambios en archivos (imágenes)
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validar el tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({ message: "La imagen excede el tamaño máximo permitido de 5MB.", type: "error" });
        // Resetear el campo de archivo
        setFormData((prev) => ({ ...prev, [fieldName]: null }));
        return;
      }

      // Validar el tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setSnackbar({ message: "Solo se permiten archivos de tipo JPEG, JPG, PNG y GIF.", type: "error" });
        // Resetear el campo de archivo
        setFormData((prev) => ({ ...prev, [fieldName]: null }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    }
  };

  // Validación de la sección actual
  const validateCurrentSection = () => {
    const currentFields = data[currentSection]?.fields || [];
    const newErrors = {};

    currentFields.forEach((field) => {
      const value = formData[field.name];
      // Validación general para campos requeridos
      if (field.required) {
        if (field.type === "image") {
          if (!value) {
            newErrors[field.name] = "Este campo es obligatorio.";
          }
        } else if (field.type === "map") {
          if (!value || (value.lat === 0 && value.lng === 0)) {
            newErrors[field.name] = "Este campo es obligatorio.";
          }
        } else if (!value && value !== 0) {
          newErrors[field.name] = "Este campo es obligatorio.";
        }
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
        navigate("/reportes");
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
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            value={value}
            onChange={(e) => handleChange(e, field.name)}
            className={hasError ? "border-red-500" : ""}
          />
        );
      case "textarea":
        return (
          <TextArea
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            value={value}
            onChange={(e) => handleChange(e, field.name)}
            className={hasError ? "border-red-500" : ""}
          />
        );
      case "select":
        return (
          <Dropdown
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            value={value}
            onSelect={(selectedValue) =>
              setFormData((prev) => ({ ...prev, [field.name]: selectedValue }))
            }
            className={hasError ? "border-red-500" : ""}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            checked={value === 1}
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
            onChange={(e) => handleChange(e, field.name)}
            className={hasError ? "border-red-500" : ""}
          />
        );
      case "image":
        return (
          <ImageInput
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            onChange={(e) => handleFileChange(e, field.name)}
            error={hasError ? errors[field.name] : null}
            className={hasError ? "border-red-500" : ""}
          />
        );
      case "map":
        return (
          <MapWithInputs
            key={field.name}
            ref={(el) => (fieldRefs.current[field.name] = el)}
            {...field}
            value={value}
            onChange={(location) => handleMapChange(location, field.name)}
            className={hasError ? "border-red-500" : ""}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-5xl mx-auto p-8 bg-white rounded-lg space-y-8"
    >
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
        // Simulación de envío
        console.log("Datos enviados:", formData);

        // Mensaje de éxito
        setSnackbar({ message: msgSuccess, type: "success" });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg">
        {/* Encabezado */}
        <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-600">{title}</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">{description}</p>
        </div>

        {/* Formulario */}
        <form
            onSubmit={handleFormSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            {data.map((field, index) => (
                <div key={index} className="flex flex-col">
                    <label
                        htmlFor={field.name}
                        className="text-sm md:text-base font-medium text-gray-700 mb-1"
                    >
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(e, field.name)}
                        className="border rounded-md px-4 py-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base"
                    />
                </div>
            ))}

            {/* Botón de enviar */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
                <button
                    type="submit"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-700 transition duration-300 text-sm md:text-base"
                >
                    {titleBtn}
                </button>
            </div>
        </form>

        {/* Snackbar */}
        {snackbar.message && (
            <div
                className={`mt-4 px-4 py-2 rounded-md text-white text-center ${
                    snackbar.type === "success"
                        ? "bg-emerald-600"
                        : "bg-red-600"
                }`}
            >
                {snackbar.message}
            </div>
        )}
    </div>
</div>

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
