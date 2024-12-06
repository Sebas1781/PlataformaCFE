import { LoadScript } from '@react-google-maps/api';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/includes/Dashboard";
import Sidebar from "./components/includes/Sidebar";
import NewReport from "./modules/reports/NewReport";
import AddUser from './modules/users/AddUser';
import EditUser from './modules/users/EditUser';
import ProfileDetails from './modules/profile/ProfileDetails';
import ReportTables from './modules/reports/ReportTables';
<<<<<<< HEAD


import { checkBackendConnection } from './system/Config';
=======
>>>>>>> 6949569bac9c70708927c214358fdb7b019e1136
import ChangePassword from './modules/profile/ChangePassword';
import { checkBackendConnection } from './system/Config';

function App() {
    checkBackendConnection();

    return (
        <LoadScript googleMapsApiKey="AIzaSyC-g_SwMSxKdoeYDhbXPdgC6VFBSnf3yJo">
            <div className="relative flex h-screen overflow-hidden">
                {/* Sidebar general */}
                <Sidebar />
                <div className="flex-grow overflow-auto bg-transparent pt-10 relative">
                    <Routes>
                        {/* Modificación SOLO para el Dashboard */}
                        <Route
                            path="/"
                            element={
                                <div className="flex h-full">
                                    <div className="flex-grow flex justify-center bg-transparent">
                                        <div className="w-full max-w-5xl p-6 pt-1 sm:pt-16 lg:pt-1">
                                            {/* pt-32: padding superior en móvil, pt-16 en tablet, pt-6 en escritorio */}
                                            <Dashboard />
                                        </div>
                                    </div>
                                </div>
                            }
                        />

                        {/* Los demás routes permanecen SIN cambios */}
                        <Route path="/nuevo/reporte" element={<NewReport />} />
                        <Route path="/nuevo/usuario" element={<AddUser />} />
                        <Route path="/editar/usuario" element={<EditUser />} />
                        <Route path="/perfil" element={<ProfileDetails />} />
                        <Route path="/cambiar/contraseña" element={<ChangePassword />} />
                        <Route path="/reportes" element={<ReportTables />} />
                    </Routes>
                </div>
            </div>
        </LoadScript>
    );
}

export default App;
