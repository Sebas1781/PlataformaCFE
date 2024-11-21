// src/data/reportForm.js
const reportForm = [
    {
        sectionName: 'Información Básica',
        fields: [
            { label: 'Nombre', name: 'nombre', type: 'text', required: true },
            { label: 'Edad', name: 'edad', type: 'number', placeholder: 'Edad', required: true },
            { label: 'Altura', name: 'altura', type: 'number', unit: 'cm', placeholder: 'Altura', required: true },
            { label: 'Ubicación en el mapa', name: 'ubicacionMapa', type: 'map', required: true }, // Campo de mapa
        ],
    },
    {
        sectionName: 'Información Opcional',
        fields: [
            { label: 'Seleccione su país', name: 'pais', type: 'select', options: ['México', 'EE.UU.', 'Canadá'], required: true },
            { label: 'Fecha de nacimiento', name: 'fechaNacimiento', type: 'date', required: true },
            { label: 'Hora preferida para contacto', name: 'horaContacto', type: 'time', required: true },
        ],
    },
    {
        sectionName: 'Preferencias',
        fields: [
            { label: 'Rango de satisfacción', name: 'satisfaccion', type: 'range', min: 0, max: 100, required: true },
            { label: '¿Acepta los términos?', name: 'aceptaTerminos', type: 'radio', options: ['Sí', 'No'], required: true },
            { label: 'Suba una foto de perfil', name: 'fotoPerfil', type: 'image', required: true }, // Campo de imagen
            { label: 'Describa su experiencia', name: 'experiencia', type: 'textarea', required: true }, // Texto largo
        ],
    },
];

export default reportForm;
