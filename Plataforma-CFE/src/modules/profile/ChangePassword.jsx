import { GeneraFormularioUsuarios } from "../../components/global/GlobalForms";
import { passwordFields } from "../../data/formConfig";

const ChangePassword = () => {
    const initValues = {
        password: "",
        confirmPassword: "",
    };

    const formProps = {
        data: passwordFields,
        initValues,
        title: "Cambiar Contraseña",
        description: "Complete los campos para camnbiar contraseña",
        titleBtn: "Cambiar Contraseña",
        msgSuccess: "Contraseña actualizada exitosamente",
        msgError: "Error al cambiar contraseña",
        sendData: "agregarUsuario",
    };

    return <GeneraFormularioUsuarios {...formProps} />;
    
};

export default ChangePassword;