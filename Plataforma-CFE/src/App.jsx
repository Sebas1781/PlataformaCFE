// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import AddUser from "./modules/users/AddUser";

function App() {
    return (
        <div className="m-5">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/usuario" element={<AddUser />} />
            </Routes>

          
        </div>
    );
}

export default App;
