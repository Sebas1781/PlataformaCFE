import React, { useState } from "react";
import { GoogleMaps } from "./MiscDesings";

const MapWithInputs = () => {
    const [markers, setMarkers] = useState([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkers([{ lat, lng }]);
        setLatitude(lat);
        setLongitude(lng);
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setMarkers([{ lat, lng }]);
                setLatitude(lat);
                setLongitude(lng);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <GoogleMaps markers={markers} onMapClick={handleMapClick} />
            <div className="flex flex-col space-y-4 mt-4">
                <label className="text-sm font-medium text-gray-800">Latitud:</label>
                <input
                    type="text"
                    value={latitude}
                    readOnly
                    className="h-12 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 
                               focus:ring-2 focus:ring-emerald-600 focus:outline-none focus:border-emerald-600 
                               hover:shadow-md hover:border-emerald-600 transition-all duration-300"
                />
                <label className="text-sm font-medium text-gray-800">Longitud:</label>
                <input
                    type="text"
                    value={longitude}
                    readOnly
                    className="h-12 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 
                               focus:ring-2 focus:ring-emerald-600 focus:outline-none focus:border-emerald-600 
                               hover:shadow-md hover:border-emerald-600 transition-all duration-300"
                />
                <button
                    type="button"
                    onClick={handleGetLocation}
                    className="h-12 px-4 border  border-gray-300 rounded-lg shadow-sm bg-emerald-600 text-white font-medium 
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