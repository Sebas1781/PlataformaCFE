import { useState, useEffect } from "react";
import { UsersTable } from "../../components/global/DataTables";
import axios from "axios";
import { userHeader } from "../../data/userHeaders";

const UserTables = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:1433/api/ObtenerUsuarios");
      // Verificar que response.data sea un arreglo
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        throw new Error("La API no devolvió un arreglo.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al cargar los usuarios. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  const formProps = {
    header: userHeader,
    title: "Usuarios Registrados",
    description: "Esta tabla muestra todos los usuarios registrados.",
    titleBtn: "Agregar Usuario",
    data: users.map((user) => ({
      id: user.idTrabajador,
      employeeNumber: user.numeroTrabajador,
      fullName: user.nombre,
    })),
  };

  return <UsersTable {...formProps} />;
};

export default UserTables;
