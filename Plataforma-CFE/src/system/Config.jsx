const apiURL = 'http://localhost';
const apiPORT = '1433';
const apiSubDIR = 'api';
export const API_URL = `${apiURL}:${apiPORT}/${apiSubDIR}`;

console.log('APP ejecutándose en entorno Local:', API_URL);

export const checkBackendConnection = async () => {
    try {
        const response = await fetch(`${API_URL}/health-check`);
        if (response.ok) {
            const data = await response.json();
            console.log('Conexión exitosa con el backend:', data.message);
        } else {
            console.error('Error al conectar con el backend:', response.statusText);
        }
    } catch (error) {
        console.error('Error al verificar conexión con el backend:', error);
    }
};
