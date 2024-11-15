// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./modules/Dashboard";

function App() {
    return (
        <div className="bg-gray-100 text-gray-800 flex">

            <div className="flex-1 ml-64 p-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
