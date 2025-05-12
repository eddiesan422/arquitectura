import React, { useState } from "react";
import ApiFacade from "./ApiFacade";

export default function FacadeComponent() {
    const [message, setMessage] = useState("");
    const api = new ApiFacade();

    const handleLogin = () => {
        const result = api.login("admin", "admin123");
        setMessage(result);
    };

    return (
        <div className="facade-component">
            <button className="button" onClick={handleLogin}>Iniciar Sesión</button>
            {message && <p>{message}</p>}
        </div>
    );
}
