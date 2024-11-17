import React, { useState } from "react";
import Dropdown from "../components/globals/Dropdown"; // Ajusta la ruta según tu estructura
import TextInput from "../components/globals/TextInput";
import DatePicker from "../components/globals/DatePicker";
import TimePicker from "../components/globals/TimePicker";
import RangeInput from "../components/globals/RangeInput";
import ToggleYesNo from "../components/globals/ToggleYesNo";
import ImageUploader from "../components/globals/ImageUploader";
import TextArea from "../components/globals/TextArea";

const Formulario = () => {
  const [formData, setFormData] = useState({
    tipoMantto: "",
    licencia: "",
    fecha: "",
    horaInicio: "",
    rssi: -120,
    fotografiaMantto: false,
    imagenEstructura: null,
    observaciones: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Dropdown
        label="Tipo de mantenimiento:"
        options={["Mantenimiento preventivo", "Mantenimiento correctivo"]}
        value={formData.tipoMantto}
        onChange={(value) => handleInputChange("tipoMantto", value)}
      />
      <TextInput
        label="Licencia:"
        value={formData.licencia}
        onChange={(value) => handleInputChange("licencia", value)}
        required
      />
      <DatePicker
        label="Fecha:"
        value={formData.fecha}
        onChange={(value) => handleInputChange("fecha", value)}
      />
      <TimePicker
        label="Hora de inicio:"
        value={formData.horaInicio}
        onChange={(value) => handleInputChange("horaInicio", value)}
      />
      <RangeInput
        label="RSSI (dBm):"
        value={formData.rssi}
        min={-120}
        max={0}
        onChange={(value) => handleInputChange("rssi", value)}
      />
      <ToggleYesNo
        label="Fotografías del mantenimiento:"
        value={formData.fotografiaMantto}
        onChange={(value) => handleInputChange("fotografiaMantto", value)}
      />
      <ImageUploader
        label="Estructura completa:"
        onImageChange={(file) => handleInputChange("imagenEstructura", file)}
      />
      <TextArea
        label="Observaciones:"
        value={formData.observaciones}
        onChange={(value) => handleInputChange("observaciones", value)}
        required
      />
      <button
        type="submit"
        className="px-7 py-2 text-base font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
      >
        Enviar Formulario
      </button>
    </form>
  );
};

export default Formulario;