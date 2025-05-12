import React from "react";

export default function AdapterCard({ title, description }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
