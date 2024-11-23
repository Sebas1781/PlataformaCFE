import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { FaLocationArrow } from 'react-icons/fa'; // Import the location icon

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 20.11539523069836,
  lng: -98.75894980668329,
};

const InteractiveMap = forwardRef(({ onChange, initialLatLng }, ref) => {
  const [marker, setMarker] = useState(initialLatLng || null);
  const [latLng, setLatLng] = useState(initialLatLng || { lat: '', lng: '' });
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (initialLatLng) {
      setMarker(initialLatLng);
      setLatLng(initialLatLng);
    }
  }, [initialLatLng]);

  useImperativeHandle(ref, () => ({
    getLatLng: () => latLng,
  }));

  const onMapClick = useCallback(
    (event) => {
      const newLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(newLatLng);
      setLatLng(newLatLng);
      if (onChange) {
        onChange(newLatLng);
      }
    },
    [onChange]
  );

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarker(newLatLng);
        setLatLng(newLatLng);
        if (onChange) {
          onChange(newLatLng);
        }
      });
    }
  };

  useEffect(() => {
    if (mapRef.current && marker) {
      const map = mapRef.current;

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new google.maps.Marker({
        position: marker,
        map: map,
        title: 'Selected Location',
      });
    }
  }, [marker]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
        onLoad={map => mapRef.current = map}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span>Latitud:</span>
          <input type="text" value={latLng.lat} readOnly className="ml-2 p-1 border rounded w-full sm:w-auto" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
          <span>Longitud:</span>
          <input type="text" value={latLng.lng} readOnly className="ml-2 p-1 border rounded w-full sm:w-auto" />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleGetLocation}
          className="p-2 bg-emerald-600 text-white rounded flex items-center"
        >
          <FaLocationArrow className="mr-2" />
          Obtener Ubicación
        </button>
      </div>
    </div>
  );
});

export default InteractiveMap;
