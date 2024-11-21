// src/components/globals/GlobalForms.jsx
import React, { useState } from 'react';
import reportForm from '../../data/reportForm';
import InteractiveMap from './InteractiveMap';

const GlobalForms = () => {
    const [formData, setFormData] = useState({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [errors, setErrors] = useState([]);

    const currentSection = reportForm[currentSectionIndex];

    const handleInputChange = (sectionName, name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [sectionName]: {
                ...prevData[sectionName],
                [name]: value,
            },
        }));
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

    const handleNext = () => {
        if (validateSection()) {
            setCurrentSectionIndex(prevIndex => prevIndex + 1);
            setErrors([]);
        }
    };

    const handlePrevious = () => {
        setCurrentSectionIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
    
        // Recorrer los datos del formulario para agregar campos y archivos
        Object.entries(formData).forEach(([sectionName, sectionFields]) => {
            Object.entries(sectionFields).forEach(([key, value]) => {
                const field = reportForm.find(section => section.sectionName === sectionName).fields.find(f => f.name === key);
                if (key === 'fotoPerfil' && value instanceof File) {
                    // Si es un archivo, lo agregamos al FormData
                    formDataToSend.append(key, value);
                } else {
                    // Si es un campo normal, lo agregamos como texto
                    const fieldValue = typeof value === 'object' ? JSON.stringify(value) : value;
                    formDataToSend.append(key, field.unit ? `${fieldValue} ${field.unit}` : fieldValue);
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
            alert('Formulario enviado correctamente. Revisa Beeceptor para los datos enviados.');
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };
    
    

    const renderInputField = (field, sectionName) => {
        const isFilled = formData[sectionName]?.[field.name];

        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder=" "
                            value={isFilled || ''}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm"
                        />
                        {field.unit && (
                            <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">{field.unit}</div>
                        )}
                        <label className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500 ${isFilled ? 'scale-75 -translate-y-6 text-emerald-600' : ''}`}>
                            {field.label}
                        </label>
                    </div>
                );
            case 'select':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <select
                            name={field.name}
                            value={isFilled || ''}
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
                            value={isFilled || ''}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm"
                        />
                        <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 scale-75 -translate-y-6 text-emerald-600">
                            {field.label}
                        </label>
                    </div>
                );
            case 'radio':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <label className="block text-gray-500 mb-2 text-emerald-600">
                            {field.label}
                        </label>
                        {field.options.map((option, index) => (
                            <label key={index} className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option}
                                    checked={formData[sectionName]?.[field.name] === option}
                                    onChange={e => handleInputChange(sectionName, field.name, e.target.value)}
                                    className="mr-2 sm:text-sm"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'image':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <input
                            type="file"
                            name={field.name}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.files[0])}
                            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 border-gray-200 sm:text-sm"
                        />
                        <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 scale-75 -translate-y-6 text-emerald-600">
                            {field.label}
                        </label>
                    </div>
                );
            case 'textarea':
                return (
                    <div className="relative z-0 w-full mb-5">
                        <textarea
                            name={field.name}
                            placeholder=" "
                            value={formData[sectionName]?.[field.name] || ''}
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
                return <InteractiveMap onChange={coords => handleInputChange(sectionName, 'ubicacionMapa', coords)} />;
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
                            value={formData[sectionName]?.[field.name] || field.min}
                            onChange={e => handleInputChange(sectionName, e.target.name, e.target.value)}
                            className="w-full sm:text-sm"
                        />
                        <span className="block text-sm text-gray-500">Valor: {formData[sectionName]?.[field.name] || field.min}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
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
            <div className="flex justify-between mt-4">
                {currentSectionIndex > 0 && (
                    <button
                        onClick={handlePrevious}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                    >
                        Anterior
                    </button>
                )}
                {currentSectionIndex < reportForm.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                    >
                        Enviar
                    </button>
                )}
            </div>
        </div>
    );
};

export default GlobalForms;
