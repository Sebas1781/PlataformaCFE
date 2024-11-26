// src/modules/reports/Formulario.jsx
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import GlobalTables from '../../components/globals/GlobalTables'; // Importar GlobalForms
import { columnsConfig, testData } from '../../data/userConfig'; // Importar configuración y datos de prueba

const Users = () => {
    const [formData, setFormData] = useState([]);

    // Cargar datos de prueba al inicializar
    useEffect(() => {
        setFormData(testData);
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
            <GlobalTables columns={columnsConfig} data={formData} />
        </div>
    );
};

Users.propTypes = {
    formData: PropTypes.arrayOf(PropTypes.object),
    setFormData: PropTypes.func,
};

export default Users;
