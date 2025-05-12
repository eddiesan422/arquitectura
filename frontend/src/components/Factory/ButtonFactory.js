import React from "react";

export default function ButtonFactory({ type, label, onClick }) {
    let style = {};

    switch (type) {
        case "primary":
            style = { backgroundColor: "#007bff", color: "#ffffff" };
            break;
        case "secondary":
            style = { backgroundColor: "#6c757d", color: "#ffffff" };
            break;
        case "danger":
            style = { backgroundColor: "#dc3545", color: "#ffffff" };
            break;
        default:
            style = { backgroundColor: "#f8f9fa", color: "#333" };
    }

    return (
        <button className="button" onClick={onClick} style={style}>
            {label}
        </button>
    );
}
