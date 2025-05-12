import React from "react";

export default function CardFactory({ type, title, description }) {
    let style = {};

    switch (type) {
        case "basic":
            style = { backgroundColor: "#ffffff", borderColor: "#cccccc" };
            break;
        case "advanced":
            style = { backgroundColor: "#f0f0f0", borderColor: "#999999" };
            break;
        default:
            style = { backgroundColor: "#eeeeee", borderColor: "#dddddd" };
    }

    return (
        <div className="card" style={style}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
