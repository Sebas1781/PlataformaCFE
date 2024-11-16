import { FaHome, FaTable, FaUser, FaUsers } from "react-icons/fa";

const sidebarConfig = [
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
  }
];

export default sidebarConfig;