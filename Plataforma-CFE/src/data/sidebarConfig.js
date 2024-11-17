import { FaHome, FaTable, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
export const sidebarConfig = [
  {
    name: "Dashboard",
    icon: FaHome,
    link: "/",
  },
  {
    name: "Perfil",
    icon: FaUser,
    link: "/perfil",
  },
  {
    name: "Reportes",
    icon: FaTable,
    link: "/reportes",
  },
  {
    name: "Usuarios",
    icon: FaUsers,
    link: "/usuarios",
  },
  {
    name:"Cerrar Sesión",
    icon: FaSignOutAlt,
    link:"/cerrarSesion",
  }
];
