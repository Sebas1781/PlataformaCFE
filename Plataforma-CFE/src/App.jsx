import { LoadScript } from '@react-google-maps/api';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/includes/Dashboard";
import Sidebar from "./components/includes/Sidebar";
import NewReport from "./modules/reports/NewReport";
import AddUser from './modules/users/AddUser';
import EditUser from './modules/users/EditUser';
import ProfileDetails from './modules/profile/ProfileDetails';
import ReportTables from './modules/reports/ReportTables';

import { checkBackendConnection } from './system/Config';
import ChangePassword from './modules/profile/ChangePassword';

function App() {
    checkBackendConnection();
    return (
        <LoadScript googleMapsApiKey="AIzaSyC-g_SwMSxKdoeYDhbXPdgC6VFBSnf3yJo">
            <div className="relative flex h-screen">
                <Sidebar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/nuevo/reporte" element={<NewReport />} />
                        <Route path="/nuevo/usuario" element={<AddUser/>}/>
                        <Route path="/editar/usuario" element={<EditUser/>}/>
                        <Route path="/perfil" element={<ProfileDetails/>}/>
                        <Route path="/cambiar/contraseña" element={<ChangePassword/>}/>
                        <Route path="/reportes" element={<ReportTables/>}/>
                    </Routes>
                </div>
            </div>
        </LoadScript>
    );
}

export default App; 
