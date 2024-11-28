// src/data/reportForm.js
const reportForm = [
    {
        sectionName: 'Información Básica:',
        fields: [
            { label: 'Tipo de mantenimiento:', name: 'tipoMantenimiento', type: 'select', options: ['Mantenimiento Preventivo', 'Mantenimiento Correctivo', 'Puesta en servicio'], required: true },
            { label: 'Modelo UTR:', name: 'modelo', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
            { label: 'Fecha de mantenimiento:', name: 'fecha', type: 'date', required: true},
            { label: 'Hora de inicio:', name: 'horaInicio', type: 'time', required: true },
            { label: 'Responsable:', name: 'responsable', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
            { label: 'Licencia:', name: 'licencia', type: 'number', placeholder: 'Licencia', required: true },
            { label: 'Registro:', name: 'registro', type: 'number', placeholder: 'Regisgtro', required: true },
            { label: 'Restaurador:', name: 'restaurador', type: 'number', placeholder: 'Restaurador', required: true },
            { label: 'Circuito:', name: 'circuito', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', ''], required: true },
            { label: 'Area:', name: 'area', type: 'select', options: ['Pachuca', 'Actopan', 'Cubitos', 'Tizayuca'], required: true },
            { label: 'Ubicación en el mapa', name: 'ubicacionMapa', type: 'map', required: true }, // Campo de mapa
            { label: 'Dirección', name: 'direccion', type: 'text', required: true },
            // { label: 'Potencia Incidente', name: 'potenciaIncidente', type: 'number', required: true },
            // { label: 'Potencia Reflejada', name: 'potenciaReflejada', type: 'number', required: true },
            // { label: 'VSWR', name: 'vswr', type: 'number', required: true, readOnly: true },
        ],
    },
    {
        sectionName: 'Información Basica del sistema de comunicaciónes:',
        fields: [
            
            { label: 'Radio / Gabinete:', name: 'nsRadioGabinete', type: 'text', required: true },
            { label: 'Potencia de salida (W):', name: 'potenciaSalida', type: 'text', required: true },
            { label: 'RSSI (dBm):', name: 'rssi', type: 'range', min: -120, max: -50, required: true },
            { label: 'Umbral de recepción:', name: 'umbralRecepcion', type: 'range', min: -50, max: 0, required: true },
            { label: 'Frecuencia Mhz:', name: 'frecuencia', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
            { label: 'Rx:', name: 'rx', type: 'select', options: ['0002/0002', '0003/10003', '0004/10004', '0005/10005', '0006/0006','N/A'], required: true },
            { label: 'Tx:', name: 'tx', type: 'select', options: ['0002/0002', '0003/10003', '0004/10004', '0005/10005', '0006/0006','N/A'], required: true },
            { label: 'Cable pigtail:', name: 'cablePigtail', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
            { label: 'Supresor:', name: 'supresor', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
            { label: 'Cable de L.T. :', name: 'cableLT', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
            { label: 'Altura antena (m):', name: 'alturaAntena', type: 'number', placeholder: 'Asltura antena', required: true },
            { label: 'Repetidor de enlace:', name: 'repetidorEnlace', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
            { label: 'Canal UCM:', name: 'canalUCM', type: 'select', options: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4', 'Opcion 5'], required: true },
        ],
    },
    {
        sectionName: 'Mantenimiento de sistema de comunicaciónes:',
        fields: [
            { label: 'Fotografias del Mantenimiento:', name: 'fotografiasMantto', type: 'checkbox' },
            { label: 'Mediciones de RF:', name: 'medicionRF', type: 'checkbox' },
            { label: 'Mediciones de fuente de CD:', name: 'medicionFuenteCD', type: 'checkbox' },
            { label: 'Medición de bateria:', name: 'medicionBateria', type: 'checkbox' },
            { label: 'Limpieza de radio, conectores y supresor:', name: 'limpieza', type: 'checkbox' },
            { label: 'Ajuste de tornilleria:', name: 'ajusteTornilleria', type: 'checkbox' },
            { label: 'Cambio de antena:', name: 'cambioAntena', type: 'checkbox' },
            { label: 'Impermeabilizacion de conectores:', name: 'impermeabilizacionConectores', type: 'checkbox' },
            { label: 'Redireccionamiento de entrada:', name: 'redireccionamientoAntena', type: 'checkbox' },
            { label: 'Cambio de L.T. :', name: 'cambioLT', type: 'checkbox' },
            { label: 'Cambio de supresor:', name: 'cambioSupresor', type: 'checkbox' },
            { label: 'Cambio de pigtail:', name: 'cambioRadio', type: 'checkbox' },
            { label: 'Cambio de radio:', name: 'cambioPigtail', type: 'checkbox' },
            { label: 'Cambio de Conectores', name: 'cambioConectores', type: 'checkbox' },
       //     { label: 'Suba una foto de perfil', name: 'fotoPerfil', type: 'image', required: true }, // Campo de imagen
         //   { label: 'Describa su experiencia', name: 'experiencia', type: 'textarea', required: true }, // Texto largo
        ],
    },
    {
        sectionName: 'Mediciones:',
        fields: [
            { label: 'Potencia de radio W:', name: 'potenciaRadio', type: 'number', placeholder: 'Potencia Radio', required: true },
            { label: 'Potencia Incidente', name: 'potenciaIncidente', type: 'number', required: true },
            { label: 'Potencia Reflejada', name: 'potenciaReflejada', type: 'number', required: true },
            { label: 'VSWR', name: 'vswr', type: 'number', required: true, readOnly: true },
            { label: 'Voltaje acometida Vca:', name: 'voltajeAcometida', type: 'number', placeholder: 'Voltaje Acometida', required: true },
            { label: 'Resistencia de Tierra:', name: 'resistenciaTierra', type: 'number', placeholder: 'Resistencia Tierra', required: true },
            { label: 'Voltaje fuente Vcd:', name: 'voltajeFuente', type: 'number', placeholder: 'Voltaje Fuente Vcd', required: true },
            { label: 'Resistencia de bateria', name: 'resistenciaBateria', type: 'number', unit: 'Ohms', placeholder: 'Resistencia Bateria', required: true },
            { label: 'Porcentaje de vida de la bateria:', name: 'porcentajeBateria', type: 'number', unit: '%', placeholder: 'Porcentaje de vida de bateria', required: true },
            { label: 'Angulo de Azimut:', name: 'anguloAzimut', type: 'number', unit: '°', placeholder: 'Angulo de azimut', required: true },
        ],
    },
    {
        sectionName: 'Instalación de equipo:',
        fields: [
            { label: 'Placa con nomenclatura:', name: 'placaNomenclatura', type: 'checkbox' },
            { label: 'Sellado de gabinete:', name: 'selladoGabinete', type: 'checkbox' },
            { label: 'Protector antifauna:', name: 'protectorAntifauna', type: 'checkbox' },
            { label: 'Cuchillas de Bypass:', name: 'cuchillasByPass', type: 'checkbox' },
            { label: 'Cuchillas laterales:', name: 'cuchillasLaterale', type: 'checkbox' },
            { label: 'Bajante de tierra:', name: 'bajanteTierra', type: 'checkbox' },
            { label: 'Terminales PAT:', name: 'terminalPAT', type: 'checkbox' },
            { label: 'Apartarrayos:', name: 'apartarrayos', type: 'checkbox' },
            { label: 'Cable RF sujetado:', name: 'cableRF', type: 'checkbox' },
            { label: 'Calibre bajante:', name: 'calibreBajante', type: 'number', placeholder: 'Calibre Bajante:', required: true },
            { label: 'Observaciones:', name: 'Observaciones', type: 'textarea', required: true }, 
        ],
    },

    {
        sectionName: 'Mediciones:',
        fields: [
            { label: 'Estructura Completa:', name: 'imagenEstructura', type: 'image', required: true }, // Campo de imagen
            { label: 'Gabinete:', name: 'imagenGabinete', type: 'image', required: true }, // Campo de imagen
            { label: 'Radio:', name: 'imagenRadio', type: 'image', required: true }, // Campo de imagen
            { label: 'Supresor:', name: 'imagenSupresor', type: 'image', required: true }, // Campo de imagen
            { label: 'Restaurador:', name: 'imagenRestaurador', type: 'image', required: true }, // Campo de imagen
            { label: 'Terminal de tierra:', name: 'imagenTerminalTierra', type: 'image', required: true }, // Campo de imagen
            { label: 'Bajante de tierra:', name: 'imagenBajanteTierra', type: 'image', required: true }, // Campo de imagen
            { label: 'Placa:', name: 'imagenPlaca', type: 'image', required: true }, // Campo de imagen
            { label: 'Imagen adicional', name: 'imagenAdicional', type: 'image'}, // Campo de imagen
            { label: 'Codigo de Radio:', name: 'configuracionRadio', type: 'textarea', required: true }, 
            { label: 'Hora de Termino:', name: 'horaTermino', type: 'time', required: true },
     
        ],
    },
   
];

export default reportForm;
