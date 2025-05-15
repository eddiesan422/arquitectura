import axios from 'axios';

// Configuración básica del adaptador para interactuar con el backend
const BASE_URL = 'http://localhost:8000';

class ApiAdapter {
    // Método para manejar el login
    static async login(username, password) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                username,
                password
            }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    // Método para listar solicitudes
    static async listarSolicitudes(token, params = {}) {
        try {
            const response = await axios.get(`${BASE_URL}/solicitudes/`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error al listar solicitudes:', error);
            throw error;
        }
    }

    // Método para crear solicitudes
    static async crearSolicitud(token, solicitudData) {
        try {
            const response = await axios.post(`${BASE_URL}/solicitudes/`, solicitudData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear solicitud:', error);
            throw error;
        }
    }

    // Método para obtener el detalle de una solicitud
    static async obtenerDetalleSolicitud(token, solicitudId) {
        try {
            const response = await axios.get(`${BASE_URL}/solicitudes/${solicitudId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener detalle de solicitud:', error);
            throw error;
        }
    }

    // Método para evaluar una solicitud
    static async evaluarSolicitud(token, solicitudId, evaluacionData) {
        try {
            const response = await axios.post(`${BASE_URL}/solicitudes/${solicitudId}/evaluar`, evaluacionData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error al evaluar solicitud:', error);
            throw error;
        }
    }
}

export default ApiAdapter;