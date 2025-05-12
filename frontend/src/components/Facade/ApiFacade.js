export default class ApiFacade {
    login(username, password) {
        if (username === "admin" && password === "admin123") {
            return "Inicio de sesión exitoso";
        }
        return "Credenciales incorrectas";
    }

    fetchBasicData() {
        return { title: "Tarjeta Básica", description: "Descripción básica" };
    }

    fetchAdvancedData() {
        return { title: "Tarjeta Avanzada", description: "Descripción avanzada" };
    }
}
