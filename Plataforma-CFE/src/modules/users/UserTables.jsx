import { UsersTable } from "../../components/global/DataTables";
import { userHeader } from "../../data/userHeaders";

const UserTables = () => {
    const formProps = {
      header: userHeader, // Encabezados correctos
      title: "Usuarios Registrados",
      description: "Esta tabla muestra todos los usuarios registrados.",
      titleBtn: "Agregar Usuario",
      sendData: "agregarReporte",
      data: [
        { id: 1, employeeNumber: "12345", fullName: "Juan Pérez López" },
        { id: 2, employeeNumber: "67890", fullName: "María González Díaz" },
      ],
    };
    
    return <UsersTable {...formProps} />;
}
export default UserTables;
