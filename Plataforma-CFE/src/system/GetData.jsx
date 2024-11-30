import axios from 'axios';

export async function getPostData(url, params) {
	try {
		const response = await axios.post(url, params, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const jsonData = Array.isArray(response) ? response : response.data;
		return jsonData;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function sendPostData(url, params) {
	try {
		const response = await axios.post(url, params, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log('Solicitud POST exitosa:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error al enviar la solicitud POST:', error);
		throw error;
	}
}

export const getDataArray = async (url, payload) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...payload })
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const textData = await response.text();
        if (!textData) {
            throw new Error('La respuesta está vacía');
        }
		
        const data = JSON.parse(textData);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
