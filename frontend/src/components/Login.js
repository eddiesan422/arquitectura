import React, { useState } from 'react';
import SolicitudFacade from '../facades/SolicitudFacade';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SolicitudFacade.login(username, password);
            alert('Inicio de sesión exitoso.');
            onLoginSuccess();
        } catch (error) {
            setError('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
        }
    };

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre de Usuario</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" required />
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                <button type="submit">Iniciar Sesión</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;