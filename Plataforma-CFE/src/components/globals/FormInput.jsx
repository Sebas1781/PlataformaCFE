import React, { useState } from "react";

const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  errorMessage,
  validate,
}) => {
  const [isTouched, setIsTouched] = useState(false); // Estado para saber si el campo fue tocado

  const handleBlur = () => {
    setIsTouched(true); // Cuando el usuario sale del campo, establecemos que fue tocado
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={handleBlur} // Evento onBlur para activar el mensaje al salir del campo
        className={`mt-1 block w-full border rounded-md p-2 
          ${isTouched && errorMessage ? 'border-red-500' : 'border-gray-300'}`} // Establecer borde rojo si hay un error
        placeholder={label}
      />
      {isTouched && errorMessage && (
        <span className="text-red-600 text-sm">{errorMessage}</span> // Mostrar mensaje de error si el campo fue tocado y tiene un error
      )}
    </div>
  );
};

export default FormInput;
