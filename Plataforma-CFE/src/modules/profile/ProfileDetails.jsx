import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Recupera los datos del usuario desde localStorage
        const userData = localStorage.getItem("userData");
        if (userData) {
            try {
                setUserProfile(JSON.parse(userData));
            } catch (error) {
                console.error("Error al parsear datos del usuario:", error);
            }
        }
    }, []);

    if (!userProfile) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <p className="text-gray-500">Cargando datos del perfil...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            {/* Tarjeta del perfil */}
            <div className="bg-white rounded-lg max-w-md w-full p-6 md:shadow-lg">
                {/* Encabezado del perfil */}
                <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center text-white text-4xl font-bold">
                        {userProfile?.nombre?.split(" ")[0]?.charAt(0) || "?"}
                    </div>
                </div>

                {/* Detalles del perfil */}
                <div className="mt-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{userProfile?.nombre || "Nombre no disponible"}</h2>
                    <p className="text-gray-600 mt-1">Número de Trabajador</p>
                    <p className="text-lg font-medium text-gray-700">{userProfile?.numeroTrabajador || "N/A"}</p>
                </div>

                {/* Información adicional opcional */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Información del Perfil</h3>
                    <p className="text-gray-600 text-sm"> {userProfile?.tipoUsuario === 1 ? "Administrador" : "Usuario" }</p>
                    <p className="text-gray-600 text-sm">
                        Este perfil es de solo lectura. Para realizar cambios, contacte al administrador.
                    </p>
                </div>

                {/* Botón para cambiar contraseña */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate("/cambiar/contraseña")}
                        className="bg-emerald-600 text-white font-medium text-sm md:text-base px-6 py-3 rounded-full hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                    >
                        Cambiar Contraseña
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
