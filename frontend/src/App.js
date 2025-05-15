import React, { useState } from 'react';
import ComponentFactory from './factories/ComponentFactory';
import './styles.css';

function App() {
    const [view, setView] = useState('Login');
    const [selectedSolicitudId, setSelectedSolicitudId] = useState(null);

    const handleLoginSuccess = () => {
        setView('SolicitudesList');
    };

    const handleViewDetail = (solicitudId) => {
        setSelectedSolicitudId(solicitudId);
        setView('SolicitudDetalle');
    };

    const handleBackToList = () => {
        setSelectedSolicitudId(null);
        setView('SolicitudesList');
    };

    const handleEvaluationComplete = () => {
        alert('Evaluación registrada correctamente.');
        setView('SolicitudesList');
    };

    return (
        <div>
            {view === 'Login' && ComponentFactory.create('Login', { onLoginSuccess: handleLoginSuccess })}
            {view === 'SolicitudesList' && ComponentFactory.create('SolicitudesList', { onViewDetail: handleViewDetail })}
            {view === 'SolicitudDetalle' && selectedSolicitudId && ComponentFactory.create('SolicitudDetalle', { solicitudId: selectedSolicitudId, onBack: handleBackToList })}
            {view === 'EvaluarSolicitud' && selectedSolicitudId && ComponentFactory.create('EvaluarSolicitud', { solicitudId: selectedSolicitudId, onEvaluationComplete: handleEvaluationComplete, onBack: handleBackToList })}
        </div>
    );
}

export default App;