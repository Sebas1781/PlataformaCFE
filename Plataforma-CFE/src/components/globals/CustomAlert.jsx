import React from 'react';

const CustomAlert = ({ message, type, onClose }) => {
    return (
        <div className={`p-4 mb-4 text-sm ${type === 'success' ? 'text-emerald-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`} role="alert">
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-4 text-sm font-bold underline">Ir a reportes</button>
        </div>
    );
};

export default CustomAlert;