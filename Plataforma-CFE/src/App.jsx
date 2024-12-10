import { LoadScript } from '@react-google-maps/api';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from "./components/includes/Dashboard";
import Sidebar from "./components/includes/Sidebar";
import NewReport from "./modules/reports/NewReport";
import AddUser from './modules/users/AddUser';
import EditUser from './modules/users/EditUser';
import ProfileDetails from './modules/profile/ProfileDetails';
import ReportTables from './modules/reports/ReportTables';
import ChangePassword from './modules/profile/ChangePassword';
import Login from './components/includes/Login';
import { checkBackendConnection } from './system/Config';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    checkBackendConnection();

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    const PublicRoute = ({ children }) => {
        return !isAuthenticated ? children : <Navigate to="/" />;
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyC-g_SwMSxKdoeYDhbXPdgC6VFBSnf3yJo">
            <div className="relative flex h-screen overflow-hidden">
                {isAuthenticated && <Sidebar />}
                <div className={`flex-grow overflow-auto bg-transparent ${isAuthenticated ? "pt-10" : "h-screen"}`}>
                    <Routes>
                        {/* Ruta de login (solo si no está autenticado) */}
                        <Route path="/login" element={<PublicRoute><Login setIsAuthenticated={setIsAuthenticated} /></PublicRoute>} />

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
