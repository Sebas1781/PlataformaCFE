// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import AddUser from "./modules/users/AddUser";
import Sidebar from "./components/includes/Sidebar";

function App() {
    return (
        
        <div className="m-5">
            <div>
            <Sidebar />
            
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/usuario" element={<AddUser />} />
            </Routes>
            </div>
        </div>
    );
}

export default App;
