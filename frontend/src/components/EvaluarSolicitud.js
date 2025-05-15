import React, { useState } from 'react';
import SolicitudFacade from '../facades/SolicitudFacade';

const EvaluarSolicitud = ({ solicitudId, onEvaluationComplete, onBack }) => {
    const [datacredito, setDatacredito] = useState('');
    const [cifin, setCifin] = useState('');
    const [antecedentes, setAntecedentes] = useState('');
    const [resultadoFinal, setResultadoFinal] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await SolicitudFacade.evaluarSolicitud(solicitudId, {
                datacredito,
                cifin,
                antecedentes,
                resultado_final: resultadoFinal
            });
            setSuccess('Evaluación registrada correctamente.');
            setError('');
            onEvaluationComplete();
        } catch (error) {
            setError('Error al registrar la evaluación. Por favor, intenta de nuevo.');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <h2>Evaluar Solicitud</h2>
            <form onSubmit={handleSubmit}>
                <label>Datacrédito</label>
                <select value={datacredito} onChange={(e) => setDatacredito(e.target.value)} required>
                    <option value="">Seleccione</option>
                    <option value="Alta">Alta</option>
                    <option value="Advertencia">Advertencia</option>
                    <option value="Baja">Baja</option>
                </select>

                <label>CIFIN</label>
                <select value={cifin} onChange={(e) => setCifin(e.target.value)} required>
                    <option value="">Seleccione</option>
                    <option value="Alta">Alta</option>
                    <option value="Advertencia">Advertencia</option>
                    <option value="Baja">Baja</option>
                </select>

                <label>Antecedentes</label>
                <input type="text" value={antecedentes} onChange={(e) => setAntecedentes(e.target.value)} required />

                <label>Resultado Final</label>
                <select value={resultadoFinal} onChange={(e) => setResultadoFinal(e.target.value)} required>
                    <option value="">Seleccione</option>
                    <option value="APROBADA">APROBADA</option>
                    <option value="DEVUELTA">DEVUELTA</option>
                    <option value="RECHAZADA">RECHAZADA</option>
                </select>

                <button type="submit">Registrar Evaluación</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button onClick={onBack}>Regresar</button>
        </div>
    );
};

export default EvaluarSolicitud;