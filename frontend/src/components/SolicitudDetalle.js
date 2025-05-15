import React, { useEffect, useState } from 'react';
import SolicitudFacade from '../facades/SolicitudFacade';

const SolicitudDetalle = ({ solicitudId, onBack }) => {
    const [solicitud, setSolicitud] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSolicitudDetalle = async () => {
            try {
                const data = await SolicitudFacade.obtenerDetalleSolicitud(solicitudId);
                setSolicitud(data);
            } catch (error) {
                setError('Error al cargar el detalle de la solicitud. Por favor, intenta de nuevo.');
            }
        };

        fetchSolicitudDetalle();
    }, [solicitudId]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!solicitud) {
        return <p>Cargando detalle...</p>;
    }

    return (
        <div className="container">
            <h2>Detalle de Solicitud</h2>
            <p><strong>Identificación:</strong> {solicitud.identificacion}</p>
            <p><strong>Nombres:</strong> {solicitud.nombres}</p>
            <p><strong>Apellidos:</strong> {solicitud.apellidos}</p>
            <p><strong>Correo:</strong> {solicitud.correo}</p>
            <p><strong>Estado:</strong> {solicitud.estado}</p>
            <p><strong>Tipo de Persona:</strong> {solicitud.tipo_persona || 'No especificado'}</p>
            <p><strong>Fecha de Registro:</strong> {new Date(solicitud.fecha_registro).toLocaleDateString()}</p>
            <button onClick={onBack}>Regresar</button>
        </div>
    );
};

export default SolicitudDetalle;