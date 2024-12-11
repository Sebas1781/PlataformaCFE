import { useState, useEffect } from 'react';
import { loginFields } from '../../data/formConfig';
import { API_URL, fetchConfigData } from '../../system/config';
import { getPostData } from '../../system/getData';
import { GeneraFormularioLogin } from '../global/GlobalForms';

const Login = ({ onLogin }) => {
    const dataConfig = {
        title: "Iniciar sesión",
        titleBtn: "Iniciar sesión",
        fields: loginFields,
    };

    const initValues = {
        numeroTrabajador: '',
        password: '',
        rememberMe: 1, // Checkbox predeterminado
    };

    const handleFormSubmit = async (values) => {
        try {
            const response = await getPostData(`${API_URL}/iniciarSesion`, values);
            if (response && response.idTrabajador) {
                const user = response;
                if (user.status === 2) {
                    console.log('Usuario desactivado.');
                    return false;
                } else {
                    onLogin({
                        idTrabajador: user.idTrabajador,
                        numeroTrabajador: user.numeroTrabajador,
                        nombre: user.nombre,
                        tipoUsuario: user.tipoUsuario,
                    });
                    console.log(`Bienvenido, ${user.nombre}`);
                    return true;
                }
            } else {
                console.log('Credenciales incorrectas.');
                return false;
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return false;
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
