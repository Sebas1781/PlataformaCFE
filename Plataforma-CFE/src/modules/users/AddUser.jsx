import { GeneraFormularioUsuarios } from "../../components/global/GlobalForms";
import { userFields } from "../../data/formConfig";

const AddUser = () => {
    const initValues = {
        numeroTrabajador: "",
        nombre: "",
        password: "",
        confirmPassword: "",
    };

    const formProps = {
        data: userFields,
        initValues,
        title: "Agregar Usuario",
        description: "Complete los campos para agregar un nuevo usuario",
        titleBtn: "Crear Usuario",
        msgSuccess: "Usuario creado exitosamente",
        msgError: "Error al crear el usuario",
        sendData: "agregarUsuario",
    };

    return <GeneraFormularioUsuarios {...formProps} />;
};

export default AddUser;
