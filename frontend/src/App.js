// src/App.js
import React from "react";
import ButtonFactory from "./components/Factory/ButtonFactory";
import CardFactory from "./components/Factory/CardFactory";
import FacadeComponent from "./components/Facade/FacadeComponent";
import AdapterButton from "./components/Adapter/AdapterButton";
import AdapterCard from "./components/Adapter/AdapterCard";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./hooks/useAuth";
import "./styles/styles.css";

function App() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="container">
            <h1>Sistema de Gestión</h1>
            
            {!isAuthenticated ? (
                <LoginForm />
            ) : (
                <>
                    <div>
                        <ButtonFactory type="primary" label="Botón Primario" onClick={() => alert("Primario")} />
                        <ButtonFactory type="secondary" label="Botón Secundario" onClick={() => alert("Secundario")} />
                        <ButtonFactory type="danger" label="Botón Peligro" onClick={() => alert("Peligro")} />
                    </div>
                    <div>
                        <CardFactory type="basic" title="Tarjeta Básica" description="Descripción básica" />
                        <CardFactory type="advanced" title="Tarjeta Avanzada" description="Descripción avanzada" />
                    </div>
                    <FacadeComponent />
                    <div>
                        <AdapterButton label="Botón de Adaptador" onClick={() => alert("Adaptador")} />
                        <AdapterCard title="Tarjeta de Adaptador" description="Descripción de Adaptador" />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <button onClick={logout} className="logout-button">
                            Cerrar Sesión
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
