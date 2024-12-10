import { LoadScript } from '@react-google-maps/api';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from "./components/includes/Dashboard";
import Sidebar from "./components/includes/Sidebar";
import NewReport from "./modules/reports/NewReport";
import AddUser from './modules/users/AddUser';
import EditUser from './modules/users/EditUser';
import ProfileDetails from './modules/profile/ProfileDetails';
import ReportTables from './modules/reports/ReportTables';
import ChangePassword from './modules/profile/ChangePassword';
import { GeneraFormularioLogin } from './components/includes/Login';
import { checkBackendConnection } from './system/Config';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    useEffect(() => {
        checkBackendConnection(); // Verificar conexión con el backend
    }, []);

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    const PublicRoute = ({ children }) => {
        return !isAuthenticated ? children : <Navigate to="/" />;
    };

    const loginFormProps = {
        data: [
            { label: "Usuario", name: "username", type: "text", required: true },
            { label: "Contraseña", name: "password", type: "password", required: true },
            { label: "Mantener sesión iniciada", name: "rememberMe", type: "checkbox" },
        ],
        initValues: { username: "", password: "", rememberMe: false },
        title: "Iniciar Sesión",
        description: "Ingresa tus credenciales para acceder a la plataforma.",
        titleBtn: "Iniciar Sesión",
        msgSuccess: "Sesión iniciada correctamente.",
        msgError: "Credenciales incorrectas.",
        onSuccess: () => setIsAuthenticated(true),
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyC-g_SwMSxKdoeYDhbXPdgC6VFBSnf3yJo">
            <div className="relative flex h-screen overflow-hidden">
                {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
                <div className={`flex-grow overflow-auto bg-transparent ${isAuthenticated ? "pt-10" : "h-screen"}`}>
                    <Routes>
                        {/* Ruta de login */}
                        <Route path="/login" element={
                            <PublicRoute>
                                <GeneraFormularioLogin {...loginFormProps} />
                            </PublicRoute>
                        } />
                        {/* Rutas privadas */}
                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/nuevo/reporte" element={<PrivateRoute><NewReport /></PrivateRoute>} />
                        <Route path="/nuevo/usuario" element={<PrivateRoute><AddUser /></PrivateRoute>} />
                        <Route path="/editar/usuario" element={<PrivateRoute><EditUser /></PrivateRoute>} />
                        <Route path="/perfil" element={<PrivateRoute><ProfileDetails /></PrivateRoute>} />
                        <Route path="/cambiar/contraseña" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
                        <Route path="/reportes" element={<PrivateRoute><ReportTables /></PrivateRoute>} />
                    </Routes>
                </div>
            </div>
        </LoadScript>
    );
}

export default App;
