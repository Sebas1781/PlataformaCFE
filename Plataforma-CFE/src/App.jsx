import { LoadScript } from '@react-google-maps/api';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/includes/Dashboard";
import Sidebar from "./components/includes/Sidebar";
import NewReport from "./modules/reports/NewReport";

import { checkBackendConnection } from './system/Config';

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
                    </Routes>
                </div>
            </div>
        </LoadScript>
    );
}

export default App;
