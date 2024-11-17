import React, { useState } from "react";
import Dropdown from "../components/Dropdown";
import TextInput from "../components/TextInput";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import RangeInput from "../components/RangeInput";
import ToggleYesNo from "../components/ToggleYesNo";
import ImageUploader from "../components/ImageUploader";
import TextArea from "../components/TextArea";
import Checkbox from "../components/Checkbox";
import RadioButton from "../components/RadioButton";
import FileUploader from "../components/FileUploader";
import Select from "../components/Select";

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
