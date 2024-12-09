import React from "react";
import { useNavigate } from "react-router-dom";
import { GeneraFormularioLogin } from "../../components/global/GlobalForms";
import { loginFields } from "../../data/formConfig";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLoginSuccess = (formData) => {
        setIsAuthenticated(true);
        // Decidir dónde guardar la sesión según el valor del checkbox
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("isAuthenticated", "true");
        navigate("/"); // Redirigir al Dashboard
    };

    return (
        <GeneraFormularioLogin
            data={loginFields}
            initValues={{ numeroTrabajador: "", password: "", rememberMe: false }} // Valor inicial para el checkbox
            title="Inicio de Sesión"
            description="Ingrese sus credenciales para acceder al sistema"
            titleBtn="Entrar"
            sendData="/auth/login"
            msgSuccess="Inicio de sesión exitoso"
            msgError="Credenciales incorrectas"
            onSuccess={handleLoginSuccess}
        />
    );
};

export default Login;
