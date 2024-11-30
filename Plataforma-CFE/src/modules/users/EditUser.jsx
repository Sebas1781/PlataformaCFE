import { GeneraFormularioUsuarios } from "../../components/global/GlobalForms";
import { userFields } from "../../data/formConfig";

const EditUser = () => {
    const initValues = {
        numeroTrabajador: "",
        nombre: "",
        password: "",
        confirmPassword: "",
    };

    const formProps = {
        data: userFields,
        initValues,
        title: "Editar Usuario",
        description: "Complete los campos para editar al usuario seleccionado",
        titleBtn: "Editar Usuario",
        msgSuccess: "Usuario editado exitosamente",
        msgError: "Error al editar el usuario",
        sendData: "editarUsuario",
    };

    return <GeneraFormularioUsuarios {...formProps} />;
};

export default EditUser;