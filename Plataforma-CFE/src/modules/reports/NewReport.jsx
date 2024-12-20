// src/pages/NewReport.jsx

import React, { useEffect, useState } from "react";
import { GeneraFormularioReporte } from "../../components/global/GlobalForms";
import { reportFields as initialReportFields } from "../../data/formConfig";
import { API_URL } from '../../system/config';
import { getPostData } from '../../system/getData';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Asegúrate de tener axios instalado

const NewReport = () => {
  const [fields, setFields] = useState(initialReportFields);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Valores iniciales del formulario
  const initValues = {
    nombreReporte: "",
    tipoMantenimiento: "",
    modelo: "",
    fecha: "",
    horaInicio: "",
    horaTermino: "",
    responsable: "",
    licencia: "",
    registro: "",
    restaurador: "",
    circuito: "",
    area: "",
    ubicacionMapa: { lat: 0, lng: 0 },
    direccion: "",
    nsRadioGabinete: "",
    potenciaSalida: "",
    rssi: -120,
    umbralRecepcion: -50,
    frecuencia: "",
    rx: "",
    tx: "",
    cablePigtail: "",
    supresor: "",
    cableLT: "",
    alturaAntena: "",
    repetidorEnlace: "",
    canalUCM: "",
    fotografiasMantto: false,
    medicionRF: false,
    medicionFuenteCD: false,
    medicionBateria: false,
    limpieza: false,
    ajusteTornilleria: false,
    cambioAntena: false,
    impermeabilizacionConectores: false,
    redireccionamientoAntena: false,
    cambioLT: false,
    cambioSupresor: false,
    cambioRadio: false,
    cambioPigtail: false,
    cambioConectores: false,
    potenciaRadio: "",
    potenciaIncidente: "",
    potenciaReflejada: "",
    vswr: "",
    voltajeAcometida: "",
    resistenciaTierra: "",
    voltajeFuente: "",
    resitenciaBateria: "",
    porcentajeBateria: "",
    anguloAzimut: "",
    placaNomeclatura: false,
    selladoGabinete: false,
    protectorAntifauna: false,
    cuchillasByPass: false,
    cuchillasLaterale: false,
    bajanteTierra: false,
    terminalPAT: false,
    apartarrayos: false,
    cableRF: false,
    calibreBajante: "",
    Observaciones: "",
    configuracionRadio: "",
    imagenEstructura: null,
    imagenGabinete: null,
    imagenRadio: null,
    imagenSupresor: null,
    imagenRestaurador: null,
    imagenTerminalTierra: null,
    imagenBajanteTierra: null,
    imagenPlaca: null,
    imagenAdicional: null
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar llamadas paralelas a todos los endpoints necesarios
        const [
          modelosResp,
          usuariosResp,
          frecuenciasResp,
          cablesPigtailResp,
          supresoresResp,
          cablesLTResp,
          circuitosResp,
          repetidoresResp,
          canalesUCMResp,
          antenasResp
        ] = await Promise.all([
          getPostData(`${API_URL}/ObtenerModelos`, {}),
          getPostData(`${API_URL}/ObtenerUsuariosRepresentantes`, {}),
          getPostData(`${API_URL}/ObtenerFrecuencias`, {}),
          getPostData(`${API_URL}/ObtenerCablesPigtail`, {}),
          getPostData(`${API_URL}/ObtenerSupresores`, {}),
          getPostData(`${API_URL}/ObtenerCablesLT`, {}),
          getPostData(`${API_URL}/ObtenerCircuitos`, {}),
          getPostData(`${API_URL}/ObtenerRepetidoresEnlace`, {}),
          getPostData(`${API_URL}/ObtenerCanalesUCM`, {}),
          getPostData(`${API_URL}/ObtenerAntenas`, {})
        ]);

        // Extraer solo los nombres de cada respuesta
        const modeloNames = modelosResp.map(item => item.Nombre);
        const usuarioNames = usuariosResp.map(item => item.nombre); 
        const frecuenciaNames = frecuenciasResp.map(item => item.Nombre);
        const pigtailNames = cablesPigtailResp.map(item => item.Nombre);
        const supresorNames = supresoresResp.map(item => item.Nombre);
        const cableLTNames = cablesLTResp.map(item => item.Nombre);
        const circuitoNames = circuitosResp.map(item => item.Nombre);
        const repetidorNames = repetidoresResp.map(item => item.Nombre);
        const canalUCMNames = canalesUCMResp.map(item => item.Nombre);
        const antenasNames = antenasResp.map(item => item.Nombre);

        // Actualizar las opciones en reportFields
        const updatedFields = fields.map(section => ({
          ...section,
          fields: section.fields.map(field => {
            switch (field.name) {
              case 'modelo':
                return { ...field, options: modeloNames };
              case 'responsable':
                return { ...field, options: usuarioNames };
              case 'frecuencia':
                return { ...field, options: frecuenciaNames };
              case 'cablePigtail':
                return { ...field, options: pigtailNames };
              case 'supresor':
                return { ...field, options: supresorNames };
              case 'cableLT':
                return { ...field, options: cableLTNames };
              case 'circuito':
                return { ...field, options: circuitoNames };
              case 'repetidorEnlace':
                return { ...field, options: repetidorNames };
              case 'canalUCM':
                return { ...field, options: canalUCMNames };
              // Si tienes un campo para antenas en formConfig.js, descomenta lo siguiente:
              // case 'antena':
              //   return { ...field, options: antenasNames };
              default:
                return field;
            }
          })
        }));

        setFields(updatedFields);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener datos para los dropdowns:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Definir las propiedades del formulario
  const formProps = {
    data: fields,
    initValues,
    title: "Nuevo Reporte",
    description: "Ingrese los datos necesarios para crear un nuevo reporte",
    titleBtn: "Crear Reporte",
    msgSuccess: "Reporte creado exitosamente",
    msgError: "Error al crear el reporte",
    sendData: async (data) => {
      try {
        // Crear una instancia de FormData
        const formData = new FormData();

        // Agregar todos los campos del formulario a FormData
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // Si el campo es una imagen y no es nulo, agregarlo
            if (
              key.startsWith('imagen') &&
              data[key] instanceof File
            ) {
              formData.append(key, data[key]);
            } else if (key === 'ubicacionMapa') {
              // Si es el campo de ubicación del mapa, convertirlo a string JSON
              formData.append(key, JSON.stringify(data[key]));
            } else {
              formData.append(key, data[key]);
            }
          }
        }

        // Realizar la solicitud POST con FormData
        const response = await axios.post(`${API_URL}/agregarReporte`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.message === 'Reporte agregado exitosamente') {
          // Redirigir o mostrar mensaje de éxito
          navigate("/reportes");
          return { success: true };
        } else {
          console.error("Error al crear el reporte:", response.data.message);
          return { success: false };
        }
      } catch (error) {
        console.error("Error al enviar datos:", error);
        return { success: false };
      }
    },
  };

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return <div className="text-center py-10">Cargando datos...</div>;
  }

  return <GeneraFormularioReporte {...formProps} />;
};

export default NewReport;
