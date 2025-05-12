import React from "react";

export default function AdapterButton({ label, onClick, style }) {
    return (
        <button className="button" onClick={onClick} style={style}>
            {label}
        </button>
    );
}
