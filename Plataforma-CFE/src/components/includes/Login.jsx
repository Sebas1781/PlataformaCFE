import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../global/Snackbar"; // Import your custom snackbar component

export const GeneraFormularioLogin = ({
    data = [],
    initValues = {},
    title,
    description,
    titleBtn,
    msgSuccess,
    msgError,
    onSuccess,
}) => {
    const [formData, setFormData] = useState(initValues);
    const [snackbar, setSnackbar] = useState(null);
    const navigate = useNavigate();

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
            // Simular autenticación
            if (formData.username === "admin" && formData.password === "password") {
                localStorage.setItem("isAuthenticated", "true");
                setSnackbar({ message: msgSuccess, type: "success" });
                if (onSuccess) onSuccess(formData); // Notificar éxito
                navigate("/"); // Redirigir al menú principal
            } else {
                setSnackbar({ message: msgError || "Credenciales incorrectas, intenta denuevo", type: "error" });
            }
        } catch (error) {
            console.error("Error al procesar el login:", error);
            setSnackbar({ message: msgError || "Error al iniciar sesión", type: "error" });
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
                <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>
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
                    <Snackbar
                        message={snackbar.message}
                        type={snackbar.type}
                        onClose={() => setSnackbar(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default GeneraFormularioLogin;
