import { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from "./modules/Dashboard";
import AddUser from "./modules/users/AddUser";
import Sidebar from "./components/includes/Sidebar";
import FormTable from "./modules/reports/FormTable";
import Users from './modules/users/Users'; 
import Profile from './modules/profile/Profile';
import {GlobalForms} from './components/globals/GlobalForms'; // Corrected import path
import CustomNotification from './components/globals/CustomNotification';
import FormInput from './components/globals/FormInput';
import Login from './components/includes/Login'; // Corrected import path

function App() {
    const location = useLocation();
    const [formData, setFormData] = useState([]); // Inicializar como array vacío
    const [notification, setNotification] = useState({ show: false, message: '' });

    useEffect(() => {
        if (location.pathname === '/') {
            window.location.replace('/login');
        }
    }, [location]);

    const handleNotificationClose = () => {
        setNotification({ show: false, message: '' });
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyC-g_SwMSxKdoeYDhbXPdgC6VFBSnf3yJo">
            <div className="relative m-6 flex flex-col md:flex-row">
                {location.pathname !== '/login' && (
                    <div className="absolute md:relative z-10 md:z-auto md:p-2" style={{ width: '16rem', flexShrink: 0 }}>
                        <Sidebar />
                    </div>
                )}
                <div className="flex-grow m-8 ml-5 md:ml-0">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/usuario" element={<AddUser />} />
                        <Route 
                            path="/reportes" 
                            element={<FormTable formData={formData} setFormData={setFormData} />} 
                        />
                        <Route 
                            path="/usuarios" 
                            element={<Users formData={formData} setFormData={setFormData} />} 
                        />
                    
                        <Route 
                            path="/formulario-reporte" 
                            element={<GlobalForms formData={formData} setFormData={setFormData} setNotification={setNotification} notification={notification} />} 
                        />
                       
                       <Route 
                            path="/perfil" 
                            element={<Profile formData={formData }/>} 
                        />
                        <Route path="/login" element={<Login />} /> 
                    </Routes>
                </div>
            </div>
            {notification.show && <CustomNotification message={notification.message} onClose={handleNotificationClose} />}
        </LoadScript>
    );
}

export default App;
