const apiURL = 'http://localhost';
const apiPORT = '1433';
const apiSubDIR = 'api';
export const API_URL = `${apiURL}:${apiPORT}/${apiSubDIR}`;

console.log('APP ejecutándose en entorno:', API_URL);

export const fetchConfigData = async () => {
    try {
        const response = await fetch(`${API_URL}/health-check`);
        if (!response.ok) {
            throw new Error(`Error al obtener configuración: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Datos de Configuración de la Aplicación:', data);
        return data[0];
    } catch (error) {
        console.error('Error al obtener datos de configuración:', error);
        return null;
    }
};