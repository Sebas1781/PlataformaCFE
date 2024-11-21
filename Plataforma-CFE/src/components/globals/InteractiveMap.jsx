import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaLocationArrow } from 'react-icons/fa'; // Import the location icon

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 20.11539523069836,
  lng: -98.75894980668329,
};

const InteractiveMap = ({ onChange }) => {
  const [marker, setMarker] = useState(null);
  const [latLng, setLatLng] = useState({ lat: '', lng: '' });

  const onMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      setLatLng({ lat, lng });

      // Comunica las coordenadas al componente padre
      if (onChange) {
        onChange({ lat, lng });
      }
    },
    [onChange]
  );

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMarker({ lat, lng });
          setLatLng({ lat, lng });

          if (onChange) {
            onChange({ lat, lng });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <LoadScript googleMapsApiKey="AIzaSyC-g_SwMSxKdoeYDhbXPdgC6VFBSnf3yJo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={onMapClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </LoadScript>
      <div className="mt-4 flex flex-col sm:flex-row">
        <label className="mb-2 sm:mb-0">
          Latitud:
          <input type="text" value={latLng.lat} readOnly className="ml-2 p-1 border rounded" />
        </label>
        <label className="sm:ml-4">
          Longitud:
          <input type="text" value={latLng.lng} readOnly className="ml-2 p-1 border rounded" />
        </label>
      </div>
      <button
        onClick={handleGetLocation}
        className="mt-4 p-2 bg-emerald-600 text-white rounded flex items-center"
      >
        <FaLocationArrow className="mr-2" />
        Obtener Ubicación
      </button>
    </div>
  );
};

export default InteractiveMap;
