// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const response = await axios.post("http://localhost:8000/auth/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const token = response.data.access_token;
            localStorage.setItem("token", token);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Error al autenticar:", error);
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    const checkAuthStatus = () => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return { isAuthenticated, login, logout };
};
