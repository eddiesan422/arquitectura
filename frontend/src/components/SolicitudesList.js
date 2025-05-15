import React, { useEffect, useState } from 'react';
import SolicitudFacade from '../facades/SolicitudFacade';
import ComponentFactory from '../factories/ComponentFactory';

const SolicitudesList = ({ onViewDetail }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const data = await SolicitudFacade.listarSolicitudes();
                setSolicitudes(data);
            } catch (error) {
                setError('Error al cargar las solicitudes. Por favor, intenta de nuevo.');
            }
        };

        fetchSolicitudes();
    }, []);

    const handleViewDetail = (solicitudId) => {
        onViewDetail(solicitudId);
    };

    return (
        <div className="container">
            <h2>Solicitudes</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Identificación</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes.map((solicitud) => (
                        <tr key={solicitud.id}>
                            <td>{solicitud.identificacion}</td>
                            <td>{solicitud.nombres}</td>
                            <td>{solicitud.apellidos}</td>
                            <td>{solicitud.correo}</td>
                            <td>{solicitud.estado}</td>
                            <td>{new Date(solicitud.fecha_registro).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleViewDetail(solicitud.id)}>Ver Detalle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SolicitudesList;