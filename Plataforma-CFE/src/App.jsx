import { LoadScript } from '@react-google-maps/api';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from "./components/includes/Dashboard";
import Sidebar from "./components/includes/Sidebar";
import NewReport from "./modules/reports/NewReport";
import AddUser from "./modules/users/AddUser";
import EditUser from "./modules/users/EditUser";
import ProfileDetails from "./modules/profile/ProfileDetails";
import ReportTables from "./modules/reports/ReportTables";
import ChangePassword from "./modules/profile/ChangePassword";
import Login from "./components/includes/Login";
import UserTables from './modules/users/UserTables';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });
    const [userType, setUserType] = useState(() => {
        return localStorage.getItem("userType") || null;
    });

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
        if (userType) {
            localStorage.setItem("userType", userType);
        }
    }, [isAuthenticated, userType]);

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" replace />;
    };

    const PublicRoute = ({ children }) => {
        return !isAuthenticated ? children : <Navigate to="/" replace />;
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyC-g_SwMSxKdoeYDhbXPdgC6VFBSnf3yJo">
            <div className="relative flex h-screen overflow-hidden">
                {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
                <div className={`flex-grow overflow-auto bg-transparent ${isAuthenticated ? "pt-10" : "h-screen"}`}>
                    <Routes>
                        {/* Ruta de login */}
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login
                                        onLogin={(user) => {
                                            setIsAuthenticated(true);
                                            setUserType(user.tipoUsuario); // Guarda el tipo de usuario
                                            localStorage.setItem("userData", JSON.stringify(user));
                                            console.log(user); // Guarda los datos del usuario en localStorage
                                        }}
                                    />
                                </PublicRoute>
                            }
                        />
                        {/* Rutas privadas */}
                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/nuevo/reporte" element={<PrivateRoute><NewReport /></PrivateRoute>} />
                        <Route path="/perfil" element={<PrivateRoute><ProfileDetails /></PrivateRoute>} />
                        <Route path="/cambiar/contraseña" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
                        <Route path="/reportes" element={<PrivateRoute><ReportTables /></PrivateRoute>} />
                        <Route path="/usuarios" element={<PrivateRoute><UserTables /></PrivateRoute>} />

                        {/* Rutas restringidas a administradores */}
                        {userType === "1" && (
                            <>
                                <Route path="/nuevo/usuario" element={<PrivateRoute><AddUser/></PrivateRoute>} />
                                <Route path="/editar/usuario/:id" element={<PrivateRoute><EditUser/></PrivateRoute>} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </LoadScript>
    );
}

export default App;