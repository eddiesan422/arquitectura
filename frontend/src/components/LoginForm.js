// src/components/LoginForm.js
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await login(username, password);
        if (success) {
            alert("¡Inicio de sesión exitoso!");
            window.location.reload(); // Para que actualice el estado global
        } else {
            alert("Error en el inicio de sesión, verifica tus credenciales");
        }
    };

    return (
        <div className="login-container">
            <h1>Sistema de Gestión</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label>Usuario</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginForm;
