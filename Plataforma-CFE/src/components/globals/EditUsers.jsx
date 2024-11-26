import React, { useState } from 'react';
import CustomAlert from './CustomAlert';
import { useNavigate } from 'react-router-dom';
import CustomNotification from './CustomNotification';

const EditUsers = ({ setNotification, notification }) => {
    const [formData, setFormData] = useState({
        numeroTrabajador: '',
        nombre: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validatePassword = (password) => {
        const passwordErrors = [];
        if (password.length < 8) {
            passwordErrors.push("La contraseña debe tener al menos 8 caracteres.");
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrors.push("La contraseña debe incluir al menos una letra mayúscula.");
        }
        if (!/[a-z]/.test(password)) {
            passwordErrors.push("La contraseña debe incluir letras minúscula.");
        }
        if (!/[0-9]/.test(password)) {
            passwordErrors.push("La contraseña debe incluir al menos un número.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passwordErrors.push("La contraseña debe incluir al menos un carácter especial.");
        }
        if (/\s/.test(password)) {
            passwordErrors.push("La contraseña no debe contener espacios.");
        }
        return passwordErrors;
    };

    const validateFields = () => {
        const fieldErrors = [];
        if (!formData.numeroTrabajador) {
            fieldErrors.push("El número de trabajador es requerido.");
        }
        if (!formData.nombre) {
            fieldErrors.push("El nombre es requerido.");
        }

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            fieldErrors.push(...passwordErrors);
        }

        if (formData.password !== formData.confirmPassword) {
            fieldErrors.push("Las contraseñas no coinciden.");
        }

        setErrors(fieldErrors);
        return fieldErrors.length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            // Simulación de envío de datos
            console.log('Datos enviados:', formData);
            setNotification({ show: true, message: 'Usuario guardado correctamente.' });

            navigate('/usuarios'); // Navegar después de guardar

            setTimeout(() => {
                setNotification({ show: false, message: '' });
            }, 4000);
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            setAlert({ show: true, message: 'Error al guardar los datos', type: 'error' });
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-6">
            {alert.show && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert({ show: false, message: '', type: '' })} />}
            {notification.show && <CustomNotification message={notification.message} />}
            <h2 className="text-xl font-bold mb-6">Editar Usuario</h2>
            {errors.length > 0 && (
                <div className="mb-4 p-2 border border-red-500 bg-red-100 text-red-700">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            {/* Campo de Número de Trabajador */}
            <div className="relative z-0 w-full mb-8">
                <input
                    type="text"
                    name="numeroTrabajador"
                    value={formData.numeroTrabajador}
                    onChange={e => handleInputChange('numeroTrabajador', e.target.value)}
                    className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm ${
                        formData.numeroTrabajador ? 'valid' : ''
                    }`}
                />
                <label
                    htmlFor="numeroTrabajador"
                    className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500 ${
                        formData.numeroTrabajador ? 'scale-75 -translate-y-6 text-emerald-600' : ''
                    }`}
                >
                    Número de Trabajador
                </label>
            </div>
            {/* Campo de Nombre */}
            <div className="relative z-0 w-full mb-8">
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={e => handleInputChange('nombre', e.target.value)}
                    className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm ${
                        formData.nombre ? 'valid' : ''
                    }`}
                />
                <label
                    htmlFor="nombre"
                    className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500 ${
                        formData.nombre ? 'scale-75 -translate-y-6 text-emerald-600' : ''
                    }`}
                >
                    Nombre
                </label>
            </div>
            {/* Campo de Contraseña */}
            <div className="relative z-0 w-full mb-8">
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={e => handleInputChange('password', e.target.value)}
                    className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm ${
                        formData.password ? 'valid' : ''
                    }`}
                />
                <label
                    htmlFor="password"
                    className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500 ${
                        formData.password ? 'scale-75 -translate-y-6 text-emerald-600' : ''
                    }`}
                >
                    Contraseña 
                </label>
            </div>
            {/* Campo de Confirmar Contraseña */}
            <div className="relative z-0 w-full mb-8">
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                    className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm ${
                        formData.confirmPassword ? 'valid' : ''
                    }`}
                />
                <label
                    htmlFor="confirmPassword"
                    className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500 ${
                        formData.confirmPassword ? 'scale-75 -translate-y-6 text-emerald-600' : ''
                    }`}
                >
                    Confirmar Contraseña
                </label>
            </div>
            {/* Botón de Guardar */}
            <div className="flex justify-end mt-8">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 w-full sm:w-auto"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default EditUsers;


