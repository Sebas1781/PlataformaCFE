// src/data/formConfig.js

// src/data/formConfig.js

export const reportFields = [
    {
        sectionName: 'Información Básica:',
        fields: [
            { label: 'Tipo de mantenimiento:', name: 'tipoMantenimiento', type: 'select', options: ['Mantenimiento Preventivo', 'Mantenimiento Correctivo', 'Puesta en servicio'], required: true },
            { label: 'Modelo UTR:', name: 'modelo', type: 'select', options: [], required: true }, // Opciones dinámicas desde Modelos
            { label: 'Fecha de mantenimiento:', name: 'fecha', type: 'date', required: true },
            { label: 'Hora de inicio:', name: 'horaInicio', type: 'time', required: true },
            { label: 'Hora de Término:', name: 'horaTermino', type: 'time', required: true },
            { label: 'Responsable:', name: 'responsable', type: 'select', options: [], required: true }, // Opciones dinámicas desde Usuarios
            { label: 'Licencia:', name: 'licencia', type: 'number', placeholder: 'Licencia', required: true },
            { label: 'Registro:', name: 'registro', type: 'number', placeholder: 'Registro', required: true },
            { label: 'Restaurador:', name: 'restaurador', type: 'number', placeholder: 'Restaurador', required: true },
            { label: 'Circuito:', name: 'circuito', type: 'select', options: [], required: true }, // Opciones dinámicas desde Circuitos
            { label: 'Área:', name: 'area', type: 'select', options: ['Pachuca', 'Actopan', 'Cubitos', 'Tizayuca'], required: true },
            { label: 'Ubicación en el mapa:', name: 'ubicacionMapa', type: 'map', required: false }, 
            { label: 'Dirección:', name: 'direccion', type: 'text', required: true },
        ],
    },
    {
        sectionName: 'Información Básica del Sistema de Comunicaciones:',
        fields: [
            { label: 'Radio / Gabinete:', name: 'nsRadioGabinete', type: 'text', required: true },
            { label: 'Potencia de salida (W):', name: 'potenciaSalida', type: 'text', required: true },
            { label: 'RSSI (dBm):', name: 'rssi', type: 'range', min: -120, max: -50, required: true },
            { label: 'Umbral de recepción:', name: 'umbralRecepcion', type: 'range', min: -50, max: 0, required: true },
            { label: 'Frecuencia Mhz:', name: 'frecuencia', type: 'select', options: [], required: true }, // Opciones dinámicas desde Frecuencias
            { label: 'Rx:', name: 'rx', type: 'select', options: ['0002/0002', '0003/10003', '0004/10004', '0005/10005', '0006/0006', 'N/A'], required: true },
            { label: 'Tx:', name: 'tx', type: 'select', options: ['0002/0002', '0003/10003', '0004/10004', '0005/10005', '0006/0006', 'N/A'], required: true },
            { label: 'Cable pigtail:', name: 'cablePigtail', type: 'select', options: [], required: true }, // Opciones dinámicas desde CablesPigtail
            { label: 'Supresor:', name: 'supresor', type: 'select', options: [], required: true }, // Opciones dinámicas desde Supresores
            { label: 'Cable de L.T.:', name: 'cableLT', type: 'select', options: [], required: true }, // Opciones dinámicas desde CablesLT
            { label: 'Altura antena (m):', name: 'alturaAntena', type: 'number', placeholder: 'Altura antena', required: true },
            { label: 'Repetidor de enlace:', name: 'repetidorEnlace', type: 'select', options: [], required: true }, // Opciones dinámicas desde RepetidoresEnlace
            { label: 'Canal UCM:', name: 'canalUCM', type: 'select', options: [], required: true }, // Opciones dinámicas desde CanalesUCM
        ],
    },
    {
        sectionName: 'Mantenimiento de Sistema de Comunicaciones:',
        fields: [
            { label: 'Fotografías del Mantenimiento:', name: 'fotografiasMantto', type: 'checkbox' },
            { label: 'Mediciones de RF:', name: 'medicionRF', type: 'checkbox' },
            { label: 'Mediciones de fuente de CD:', name: 'medicionFuenteCD', type: 'checkbox' },
            { label: 'Medición de batería:', name: 'medicionBateria', type: 'checkbox' },
            { label: 'Limpieza de radio, conectores y supresor:', name: 'limpieza', type: 'checkbox' },
            { label: 'Ajuste de tornillería:', name: 'ajusteTornilleria', type: 'checkbox' },
            { label: 'Cambio de antena:', name: 'cambioAntena', type: 'checkbox' },
            { label: 'Impermeabilización de conectores:', name: 'impermeabilizacionConectores', type: 'checkbox' },
            { label: 'Redireccionamiento de entrada:', name: 'redireccionamientoAntena', type: 'checkbox' },
            { label: 'Cambio de L.T.:', name: 'cambioLT', type: 'checkbox' },
            { label: 'Cambio de supresor:', name: 'cambioSupresor', type: 'checkbox' },
            { label: 'Cambio de radio:', name: 'cambioRadio', type: 'checkbox' },
            { label: 'Cambio de pigtail:', name: 'cambioPigtail', type: 'checkbox' },
            { label: 'Cambio de Conectores:', name: 'cambioConectores', type: 'checkbox' },
        ],
    },
    {
        sectionName: 'Mediciones:',
        fields: [
            { label: 'Potencia de radio W:', name: 'potenciaRadio', type: 'number', placeholder: 'Potencia Radio', required: true },
            { label: 'Potencia Incidente:', name: 'potenciaIncidente', type: 'number', required: true },
            { label: 'Potencia Reflejada:', name: 'potenciaReflejada', type: 'number', required: true },
            { label: 'VSWR:', name: 'vswr', type: 'number', required: true, readOnly: true },
            { label: 'Voltaje acometida Vca:', name: 'voltajeAcometida', type: 'number', placeholder: 'Voltaje Acometida', required: true },
            { label: 'Resistencia de Tierra:', name: 'resistenciaTierra', type: 'number', placeholder: 'Resistencia Tierra', required: true },
            { label: 'Voltaje fuente Vcd:', name: 'voltajeFuente', type: 'number', placeholder: 'Voltaje Fuente Vcd', required: true },
            { label: 'Resistencia de batería:', name: 'resitenciaBateria', type: 'number', unit: 'Ohms', placeholder: 'Resistencia Bateria', required: true },
            { label: 'Porcentaje de vida de la batería:', name: 'porcentajeBateria', type: 'number', unit: '%', placeholder: 'Porcentaje de vida de batería', required: true },
            { label: 'Ángulo de Azimut:', name: 'anguloAzimut', type: 'number', unit: '°', placeholder: 'Ángulo de azimut', required: true },
        ],
    },
    {
        sectionName: 'Instalación de Equipo:',
        fields: [
            { label: 'Placa con nomenclatura:', name: 'placaNomeclatura', type: 'checkbox' },
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
        sectionName: 'Imágenes y Configuración:',
        fields: [
            { label: 'Estructura Completa:', name: 'imagenEstructura', type: 'image', required: true },
            { label: 'Gabinete:', name: 'imagenGabinete', type: 'image', required: true },
            { label: 'Radio:', name: 'imagenRadio', type: 'image', required: true },
            { label: 'Supresor:', name: 'imagenSupresor', type: 'image', required: true },
            { label: 'Restaurador:', name: 'imagenRestaurador', type: 'image', required: true },
            { label: 'Terminal de tierra:', name: 'imagenTerminalTierra', type: 'image', required: true },
            { label: 'Bajante de tierra:', name: 'imagenBajanteTierra', type: 'image', required: true },
            { label: 'Placa:', name: 'imagenPlaca', type: 'image', required: true },
            { label: 'Imagen adicional:', name: 'imagenAdicional', type: 'image' },
            { label: 'Código de Radio:', name: 'configuracionRadio', type: 'textarea', required: true },
        ],
    },
];


//TODO aki ponen sus formularios

export const userFields = [
    { name: "numeroTrabajador", label: "Número de Trabajador", type: "text", placeholder: "Ingrese el número",},
    { name: "nombre", label: "Nombre", type: "text", placeholder: "Ingrese el nombre",},
    { name: "password", label: "Contraseña", type: "password", placeholder: "Ingrese la contraseña",},
    { name: "confirmPassword", label: "Confirmar Contraseña", type: "password", placeholder: "Confirme la contraseña",},
];

export const passwordFields = [
    { label: 'Contraseña', name: 'password', type: 'password', required: true,validations:{pattern:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    errorMessage:"La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial" },},
    { label: 'Confirmar Contraseña', name: 'confirmPassword', type: 'password', required: true,validations:{matchField:"password",errorMessage:"Las contraseñas no coinciden."} },
    { label: 'Contraseña Antigua', name: 'confirmPassword', type: 'password', required: true,validations:{matchField:"password",errorMessage:"Las contraseñas no coinciden."} },
];

export const loginFields = [
    { label: "Número de Trabajador", name: "numeroTrabajador", type: "text", placeholder: "Ingrese su número de trabajador", required: true },
    { label: "Contraseña", name: "password", type: "password", placeholder: "Ingrese su contraseña", required: true },
    { label: "Mantener la sesión iniciada", name: "rememberMe", type: "checkbox" }, 
];
