// src/components/globals/GlobalForms.jsx
import React, { useEffect, useState, useRef } from 'react';
import reportForm from '../../data/reportForm';
import InteractiveMap from './InteractiveMap';
import CustomAlert from './CustomAlert'; // Import the custom alert component
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import CustomNotification from './CustomNotification'; // Import the custom notification component
import loginCFE from '../../public/loginCFE.png'; // Ajusta la ruta según tu estructura.

export const GlobalForms = ({ setNotification, notification }) => {
    const [formData, setFormData] = useState({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [errors, setErrors] = useState([]);
    const mapRef = useRef(null);
    const [initialLatLng, setInitialLatLng] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate(); // Initialize useNavigate
    const fileInputRef = useRef(null); // Add this line

    useEffect(() => {
        navigate('/login');
    }, [navigate]);

    const currentSection = reportForm[currentSectionIndex];
    const handleInputChange = (sectionName, name, value) => {
        setFormData(prevData => {
            const updatedData = {
                ...prevData,
                [sectionName]: {
                    ...prevData[sectionName],
                    [name]: value,
                },
            };

            // Calcular VSWR si se cambian potenciaIncidente o potenciaReflejada
            if (name === 'potenciaIncidente' || name === 'potenciaReflejada') {
                const potenciaIncidente = parseFloat(updatedData[sectionName].potenciaIncidente) || 0;
                const potenciaReflejada = parseFloat(updatedData[sectionName].potenciaReflejada) || 0;

                if (potenciaIncidente > 0) {
                    const vswr = (1 + Math.sqrt(potenciaReflejada / potenciaIncidente)) / (1 - Math.sqrt(potenciaReflejada / potenciaIncidente));
                    updatedData[sectionName].vswr = vswr.toFixed(3); // Redondear a 2 decimales
                } else {
                    updatedData[sectionName].vswr = 0;
                }
            }

            return updatedData;
        });
    };

    const validateSection = () => {
        const sectionErrors = [];
        currentSection.fields.forEach(field => {
            if (field.required && !formData[currentSection.sectionName]?.[field.name]) {
                sectionErrors.push(`${field.label} es requerido.`);
            }
        });

        setErrors(sectionErrors);
        return sectionErrors.length === 0;
    };

    const validateAllSections = () => {
        const allErrors = [];
        reportForm.forEach(section => {
            section.fields.forEach(field => {
                if (field.required && !formData[section.sectionName]?.[field.name]) {
                    allErrors.push(`${field.label} es requerido en la sección ${section.sectionName}.`);
                }
            });
        });

        setErrors(allErrors);
        return allErrors.length === 0;
    };

    const handleNext = () => {
        if (validateSection()) {
            setCurrentSectionIndex(prevIndex => prevIndex + 1);
            setErrors([]);
        }
    };

    const handlePrevious = () => {
        setCurrentSectionIndex(prevIndex => {
            const newIndex = Math.max(prevIndex - 1, 0);
            const previousSection = reportForm[newIndex];
            const previousCoords = formData[previousSection.sectionName]?.ubicacionMapa;
            if (previousCoords) {
                setInitialLatLng(previousCoords);
            }
            return newIndex;
        });
    };

    const handleSubmit = async () => {
        if (!validateAllSections()) {
            return;
        }

        const formDataToSend = new FormData();
    
        // Recorrer los datos del formulario para agregar campos y archivos
        Object.entries(formData).forEach(([sectionName, sectionFields]) => {
            console.log(`Sección: ${sectionName}`); // Log section name
            Object.entries(sectionFields).forEach(([key, value]) => {
                const section = reportForm.find(section => section.sectionName === sectionName);
                const field = section ? section.fields.find(f => f.name === key) : null;
                if (field && field.type === 'image' && value instanceof File) {
                    // Si es un archivo de imagen, lo agregamos al FormData
                    formDataToSend.append(key, value);
                    console.log(`${key}:`, { name: value.name, type: value.type, size: value.size }); // Log file details
                } else {
                    // Si es un campo normal, lo agregamos como texto
                    const fieldValue = typeof value === 'object' ? JSON.stringify(value) : value;
                    formDataToSend.append(key, field && field.unit ? `${fieldValue} ${field.unit}` : fieldValue);
                    console.log(`${key}: ${value}`); // Log field key and value
                }
            });
        });

        // Ensure checkbox fields are included even if not checked
        reportForm.forEach(section => {
            section.fields.forEach(field => {
                if (field.type === 'checkbox' && !(field.name in formData[section.sectionName])) {
                    formDataToSend.append(field.name, 0); // Default to 0 if not checked
                }
            });
        });
    
        // Imprime los datos enviados
        console.log('Datos enviados (FormData):');
        for (let pair of formDataToSend.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }
    
        try {
            // Enviar datos al endpoint de Beeceptor
            const response = await fetch('https://preuabaplataforma.free.beeceptor.com', {
                method: 'POST', // Enviar como POST
                body: formDataToSend, // FormData incluye todos los campos y archivos
            });
    
            console.log('Formulario enviado con éxito.');
            setNotification({ show: true, message: 'Reporte guardado correctamente.' });

            navigate('/reportes'); // Navigate to /reportes immediately after showing notification

            // Keep the notification visible for a longer duration even after navigation
            setTimeout(() => {
                setNotification({ show: false, message: '' });
            }, 4000); // Notification visible for 6 seconds in total
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setAlert({ show: true, message: 'Error al enviar el formulario', type: 'error' });
        }
    };

    const renderInputField = (field, sectionName) => {
        const isFilled = formData[sectionName]?.[field.name] || '';

        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder=" "
                            value={isFilled}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm"
                            readOnly={field.readOnly || false} // Asegurarse de que VSWR sea de solo lectura
                            id={`input_${sectionName}_${field.name}`} // Add id for label to reference
                        />
                        {field.unit && (
                            <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">{field.unit}</div>
                        )}
                        <label
                            htmlFor={`input_${sectionName}_${field.name}`} // Add htmlFor to link label to input
                            className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500 ${isFilled ? 'scale-75 -translate-y-6 text-emerald-600' : ''}`}
                        >
                            {field.label}
                        </label>
                    </div>
                );
            case 'select':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <select
                            name={field.name}
                            value={isFilled}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm"
                        >
                            <option value="" disabled>
                                Seleccione una opción
                            </option>
                            {field.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 scale-75 -translate-y-6 text-emerald-600">
                            {field.label}
                        </label>
                    </div>
                );
            case 'date':
            case 'time':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder=" "
                            value={isFilled}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm"
                        />
                        <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 scale-75 -translate-y-6 text-emerald-600">
                            {field.label}
                        </label>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={formData[sectionName]?.[field.name] === 1}
                                onChange={e => handleInputChange(sectionName, field.name, e.target.checked ? 1 : 0)}
                                className="mr-2 sm:text-sm"
                            />
                            {field.label}
                        </label>
                    </div>
                );
            case 'image':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <div className="flex flex-col items-center space-y-4 justify-center">
                            <div className="shrink-0 mt-4">
                                <img
                                    id={`preview_img_${sectionName}_${field.name}`}
                                    className="h-16 w-16 object-cover rounded-full"
                                    src={formData[sectionName]?.[field.name] ? URL.createObjectURL(formData[sectionName][field.name]) : PreviewImage}
                                    alt="Current profile photo"
                                />
                            </div>
                            <label className="block text-xl">
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    type="file"
                                    name={field.name}
                                    onChange={e => {
                                        handleInputChange(sectionName, e.target.name, e.target.files[0]);
                                        loadFile(e, sectionName, field.name);
                                    }}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-200"
                                />
                            </label>
                        </div>
                        <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 scale-75 -translate-y-6 text-emerald-600">{field.label}</label>
                    </div>
                );
            case 'textarea':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <textarea
                            name={field.name}
                            placeholder=" "
                            value={isFilled}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm"
                            rows={4}
                        />
                        <label className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500 ${isFilled ? 'scale-75 -translate-y-6 text-emerald-600' : ''}`}>
                            {field.label}
                        </label>
                    </div>
                );
            case 'map':
                return <InteractiveMap ref={mapRef} onChange={coords => handleInputChange(sectionName, 'ubicacionMapa', coords)} initialLatLng={initialLatLng || formData[sectionName]?.ubicacionMapa} />;
            case 'range':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <label className="block text-gray-500 mb-2 text-emerald-600">
                            {field.label}
                        </label>
                        <input
                            type="range"
                            name={field.name}
                            min={field.min}
                            max={field.max}
                            value={isFilled || field.min}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                            [&::-webkit-slider-thumb]:w-2.5
                            [&::-webkit-slider-thumb]:h-2.5
                            [&::-webkit-slider-thumb]:-mt-0.5
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:bg-white
                            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(16,185,129,1)]
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:transition-all
                            [&::-webkit-slider-thumb]:duration-150
                            [&::-webkit-slider-thumb]:ease-in-out
                            [&::-moz-range-thumb]:w-2.5
                            [&::-moz-range-thumb]:h-2.5
                            [&::-moz-range-thumb]:appearance-none
                            [&::-moz-range-thumb]:bg-white
                            [&::-moz-range-thumb]:border-4
                            [&::-moz-range-thumb]:border-emerald-600
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:transition-all
                            [&::-moz-range-thumb]:duration-150
                            [&::-moz-range-thumb]:ease-in-out
                            [&::-webkit-slider-runnable-track]:w-full
                            [&::-webkit-slider-runnable-track]:h-2
                            [&::-webkit-slider-runnable-track]:bg-gray-100
                            [&::-webkit-slider-runnable-track]:rounded-full
                            [&::-moz-range-track]:w-full
                            [&::-moz-range-track]:h-2
                            [&::-moz-range-track]:bg-gray-100
                            [&::-moz-range-track]:rounded-full"
                            id="basic-range-slider-usage"
                            aria-orientation="horizontal"
                        />
                        <span className="block text-sm text-gray-500">Valor: {isFilled || field.min}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    const loadFile = (event, sectionName, fieldName) => {
        const input = event.target;
        const file = input.files[0];
        const output = document.getElementById(`preview_img_${sectionName}_${fieldName}`);
        
        output.src = URL.createObjectURL(file);
        output.onload = () => {
            URL.revokeObjectURL(output.src); // free memory
        };
    };

    return (
        <div className="max-w-2xl mx-auto mt-6">
            {alert.show && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert({ show: false, message: '', type: '' })} />}
            {notification.show && <CustomNotification message={notification.message} />}
            <h2 className="text-xl font-bold mb-4">{currentSection.sectionName}</h2>
            {errors.length > 0 && (
                <div className="mb-4 p-2 border border-red-500 bg-red-100 text-red-700">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            {currentSection.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="mb-3">
                    {renderInputField(field, currentSection.sectionName)}
                </div>
            ))}
            <div className="flex justify-between mt-8 space-x-2 sm:space-x-4">
                {currentSectionIndex > 0 && (
                    <button
                        onClick={handlePrevious}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 w-full sm:w-auto"
                    >
                        Anterior
                    </button>
                )}
                {currentSectionIndex < reportForm.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 w-full sm:w-auto"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 w-full sm:w-auto"
                    >
                        Enviar
                    </button>
                )}
            </div>
        </div>
    );
};


//login

export const FormularioLogin = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/dashboard'); // Navigate to /dashboard on login
    };

    return (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
            {/* Left: Image */}
            <div className="w-1/2 h-full hidden lg:block">
                <img src={loginCFE} alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            {/* Right: Login Form */}
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 h-full flex items-center justify-center">
                <div className="w-full">
                    <h1 className="text-2xl font-semibold mb-4">Iniciar Sesión</h1>
                    <form onSubmit={handleLogin}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">Numero de trabajador:</label>
                            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-emerald-500" autoComplete="off" />
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Contraseña</label>
                            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-emerald-500" autoComplete="off" />
                        </div>
                        
                        {/* Login Button */}
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md py-2 px-4 w-full">Iniciar Sesión</button>
                    </form>
                    {/* Sign up Link */}
                
                </div>
            </div>
        </div>
    );
};
