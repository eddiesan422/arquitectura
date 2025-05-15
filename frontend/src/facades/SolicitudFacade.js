import ApiAdapter from '../adapters/ApiAdapter';


class SolicitudFacade {
    static async login(username, password) {
        try {
            const response = await ApiAdapter.login(username, password);
            // Almacenar token en el localStorage para futuras solicitudes
            localStorage.setItem('token', response.access_token);
            return response;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    static async listarSolicitudes(params = {}) {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado. Por favor, inicia sesión.');
            return await ApiAdapter.listarSolicitudes(token, params);
        } catch (error) {
            console.error('Error al listar solicitudes:', error);
            throw error;
        }
    }

    static async crearSolicitud(solicitudData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado. Por favor, inicia sesión.');
            return await ApiAdapter.crearSolicitud(token, solicitudData);
        } catch (error) {
            console.error('Error al crear solicitud:', error);
            throw error;
        }
    }

    static async obtenerDetalleSolicitud(solicitudId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado. Por favor, inicia sesión.');
            return await ApiAdapter.obtenerDetalleSolicitud(token, solicitudId);
        } catch (error) {
            console.error('Error al obtener detalle de solicitud:', error);
            throw error;
        }
    }

    static async evaluarSolicitud(solicitudId, evaluacionData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado. Por favor, inicia sesión.');
            return await ApiAdapter.evaluarSolicitud(token, solicitudId, evaluacionData);
        } catch (error) {
            console.error('Error al evaluar solicitud:', error);
            throw error;
        }
    }
}

export default SolicitudFacade;