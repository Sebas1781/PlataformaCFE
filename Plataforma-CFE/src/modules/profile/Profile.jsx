import React, { useState, useEffect } from "react";
import FormInput from "../../components/globals/FormInput";

function Profile() {
  const [formData, setFormData] = useState({
    numeroTrabajador: "",
    nombre: "",
    contrasenaAnterior: "",
    nuevaContrasena: "",
    confirmarContrasena: "",
  });

  const [formErrors, setFormErrors] = useState({
    contrasenaAnterior: "",
    nuevaContrasena: "",
    confirmarContrasena: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Valida el formulario en cada cambio de estado
  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validar la contraseña anterior
    if (!formData.contrasenaAnterior) {
      errors.contrasenaAnterior = "La contraseña anterior es requerida.";
      isValid = false;
    }
    // Validar la nueva contraseña
    if (!formData.nuevaContrasena) {
      errors.nuevaContrasena = "La nueva contraseña es requerida.";
      isValid = false;
    }
     // Validar la confirmar contraseña
     if (!formData.confirmarContrasena) {
        errors.confirmarContrasena = "La nueva contraseña es requerida.";
        isValid = false;
     }
    // Validar la confirmación de la contraseña
    if (formData.nuevaContrasena !== formData.confirmarContrasena) {
      errors.confirmarContrasena = "Las contraseñas no coinciden.";
      isValid = false;
    }
    setFormErrors(errors);
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (isFormValid) {
      // Submit form
      console.log("Formulario válido, enviando datos...");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <main className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Perfil</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="numeroTrabajador"
            label="Número de trabajador"
            type="text"
            value={formData.numeroTrabajador}
            onChange={handleChange}
          />
          <FormInput
            id="nombre"
            label="Nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
          />
          <FormInput
            id="contrasenaAnterior"
            label="Contraseña Anterior"
            type="password"
            value={formData.contrasenaAnterior}
            onChange={handleChange}
            errorMessage={formErrors.contrasenaAnterior}
          />
          <FormInput
            id="nuevaContrasena"
            label="Nueva Contraseña"
            type="password"
            value={formData.nuevaContrasena}
            onChange={handleChange}
            errorMessage={formErrors.nuevaContrasena}
          />
          <FormInput
            id="confirmarContrasena"
            label="Confirmar Contraseña"
            type="password"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            errorMessage={formErrors.confirmarContrasena}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 px-8 text-xl rounded hover:bg-green-700"
            disabled={!isFormValid}
          >
            Cambiar Contraseña
          </button>
        </form>
      </main>
    </div>
  );
}

export default Profile;
