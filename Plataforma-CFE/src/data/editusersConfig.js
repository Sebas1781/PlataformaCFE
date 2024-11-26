// src/data/reportForm.js
const reportForm = [
    {
        sectionName: "Datos del Usuario",
        fields: [
            { name: "numeroTrabajador", label: "Número de Trabajador", type: "text", required: true,},
            { name: "nombre", label: "Nombre", type: "text", required: true,},
            { name: "password", label: "Contraseña", type: "password", required: true,},
            { name: "confirmPassword", label: "Confirmar Contraseña", type: "password", required: true,},
        ],
    },
];

export default reportForm;


