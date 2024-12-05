import React from "react";
import { GoogleMaps } from "./MiscDesings";

const MapWithInputs = ({ value = { lat: "", lng: "" }, onChange }) => {
    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const location = { lat, lng };
        onChange(location); // Actualizar coordenadas en el estado del componente principal
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const location = { lat, lng };
                onChange(location); // Actualizar coordenadas en el estado del componente principal
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <GoogleMaps markers={[value]} onMapClick={handleMapClick} />
            <div className="flex flex-col space-y-4 mt-4">
                <label className="text-sm font-medium text-gray-800">Latitud:</label>
                <input
                    type="text"
                    value={value.lat || ""}
                    readOnly
                    className="h-12 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 
                               focus:ring-2 focus:ring-emerald-600 focus:outline-none focus:border-emerald-600 
                               hover:shadow-md hover:border-emerald-600 transition-all duration-300"
                />
                <label className="text-sm font-medium text-gray-800">Longitud:</label>
                <input
                    type="text"
                    value={value.lng || ""}
                    readOnly
                    className="h-12 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 
                               focus:ring-2 focus:ring-emerald-600 focus:outline-none focus:border-emerald-600 
                               hover:shadow-md hover:border-emerald-600 transition-all duration-300"
                />
                <button
                    type="button"
                    onClick={handleGetLocation}
                    className="h-12 px-4 border border-gray-300 rounded-lg shadow-sm bg-emerald-600 text-white font-medium 
                               focus:ring-2 focus:ring-emerald-600 focus:outline-none focus:border-emerald-600 
                               hover:shadow-md hover:border-emerald-600 transition-all duration-300 mt-8 mb-10"
                >
                    Obtener Ubicación
                </button>
            </div>
        </div>
    );
};

export default MapWithInputs;
