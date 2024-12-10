import { FaFileAlt, FaTable, FaUserAlt, FaHome, FaUser, FaUsers, FaSignOutAlt } from 'react-icons/fa';

export const dataMenu = [
    {
        label: "Generar nuevo reporte",
        link: "/nuevo/reporte",
        icon: FaFileAlt
    },
    {
        label: "Administrador de reportes",
        link: "/reportes",
        icon: FaTable
    },
    {
        label: "Administrador de usuarios",
        link: "/usuarios",
        icon: FaUserAlt,
        restrictedTo: "admin",
    },
];

export const dataSidebar = [
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
        restrictedTo: "admin", // Visible solo para administradores
    },
    {
        name: "Cerrar Sesión",
        icon: FaSignOutAlt,
        action: "logout",
    },
];
