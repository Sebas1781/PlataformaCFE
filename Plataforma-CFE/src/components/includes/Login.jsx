import React from "react";
import { GeneraFormularioLogin } from "../../components/global/GlobalForms";
import { loginFields } from "../../data/formConfig";

const Login = ({ setIsAuthenticated }) => {
    const handleLoginSuccess = (formData) => {
        setIsAuthenticated(true);
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("isAuthenticated", "true");
    };

    return (
        <GeneraFormularioLogin
            data={loginFields}
            initValues={{ username: "", password: "", rememberMe: false }}
            title="Iniciar Sesión"
            description="Ingresa tus datos para iniciar sesión"
            titleBtn="Iniciar sesión"
            msgSuccess="Sesión iniciada correctamente"
            msgError="Numero de trabajador o contraseña incorrectos, intenta de nuevo"
            sendData="/auth/login"
            onSuccess={handleLoginSuccess}
        />
    );
};

export default Login;
