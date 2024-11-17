// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import AddUser from "./modules/users/AddUser";
import Sidebar from "./components/includes/Sidebar";

function App() {
    return (
        <div className="relative m-5 flex">
            <div className="absolute z-10 md:relative md:p-2" style={{ width: '16rem', flexShrink: 0 }}>
                <Sidebar />
            </div>
            <div className="flex-grow m-8 ml-5 md:ml-0">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/usuario" element={<AddUser />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
