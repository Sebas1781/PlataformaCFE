import { useState, useEffect } from 'react';
import { loginFields } from '../../data/formConfig';
import { API_URL, fetchConfigData } from '../../system/config';
import { getPostData } from '../../system/getData';
import { GeneraFormularioLogin } from '../global/GlobalForms';

const Login = ({ onLogin }) => {
    // Configuración del formulario
    const dataConfig = {
        title: "Iniciar sesión",
        colorBtn: "#1D74D3",
        titleBtn: "Iniciar sesión",
        fields: loginFields,
        showPasswordLink: true,
    };

    const initValues = {
        numeroTrabajador: '', 
        password: '',
    };

    const [configData, setConfigData] = useState(null);

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchConfigData();
            setConfigData(config);
        };
        loadConfig();
    }, []);

    const handleFormSubmit = async (values) => {
        try {
            const response = await getPostData(`${API_URL}/iniciarSesion`, values);
    
            if (response && response.idTrabajador) {
                const user = response;
    
                if (user.status === 2) {
                    console.log('Este usuario está desactivado. No puedes iniciar sesión.');
                } else {
                    // Pasa todos los datos relevantes del usuario al callback `onLogin`
                    onLogin({
                        idTrabajador: user.idTrabajador,
                        numeroTrabajador: user.numeroTrabajador,
                        nombre: user.nombre,
                        tipoUsuario: user.tipoUsuario,
                    });
    
                    console.log(`Inicio de sesión exitoso: Bienvenido, ${user.nombre}`);
                }
            } else {
                console.log('Usuario o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
        }
    };
    
    return (
        <GeneraFormularioLogin
            data={dataConfig}
            initValues={initValues}
            handleFormSubmit={handleFormSubmit}
        />
    );
};

export default Login;
