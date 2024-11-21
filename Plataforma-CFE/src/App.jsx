import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import AddUser from "./modules/users/AddUser";
import Sidebar from "./components/includes/Sidebar";
import FormTable from "./modules/reports/FormTable";
import Users from './modules/users/Users'; 
import Profile from './modules/profile/Profile';
import GlobalForms from './components/globals/GlobalForms'; // Corrected import path

function App() {
    const [formData, setFormData] = useState([]); // Inicializar como array vacío

    return (
        <div className="relative m-6 flex flex-col md:flex-row">
            <div className="absolute md:relative z-10 md:z-auto md:p-2" style={{ width: '16rem', flexShrink: 0 }}>
                <Sidebar />
            </div>
            
            <div className="flex-grow m-8 ml-5 md:ml-0">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
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
                        element={<GlobalForms formData={formData} setFormData={setFormData} />} 
                    />

                </Routes>
            </div>
        </div>
    );
}

export default App;
