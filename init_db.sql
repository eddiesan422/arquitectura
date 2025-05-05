-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

-- Crear tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla intermedia usuarios_roles
CREATE TABLE IF NOT EXISTS usuarios_roles (
    usuario_id UUID REFERENCES usuarios(id),
    rol_id UUID REFERENCES roles(id),
    PRIMARY KEY (usuario_id, rol_id)
);

-- Crear tabla de solicitudes
CREATE TABLE IF NOT EXISTS solicitudes (
    id UUID PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    correo VARCHAR(100) NOT NULL,
    tipo_persona VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id UUID REFERENCES usuarios(id) NOT NULL
);

-- Crear tabla de evaluaciones
CREATE TABLE IF NOT EXISTS evaluaciones (
    id UUID PRIMARY KEY,
    solicitud_id UUID REFERENCES solicitudes(id),
    datacredito VARCHAR(20) NOT NULL,
    cifin VARCHAR(20) NOT NULL,
    antecedentes VARCHAR(20) NOT NULL,
    resultado_final VARCHAR(20) NOT NULL,
    fecha_evaluacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserts de ejemplo

-- Roles
INSERT INTO roles (id, nombre) VALUES
('00000000-0000-0000-0000-000000000001', 'ADMIN'),
('00000000-0000-0000-0000-000000000002', 'ANALISTA'),
('00000000-0000-0000-0000-000000000003', 'INVITADO');

-- Usuarios
INSERT INTO usuarios (id, username, hashed_password) VALUES
('00000000-0000-0000-0000-000000000011', 'admin', '$2b$12$WIUK4N62sgdWuwQ9phzdKuP1Tq3VJtjxP.CTE3.5CoEsuR2TrDsg6'),
('00000000-0000-0000-0000-000000000012', 'analista', '$2b$12$OT3/PHJiaXr4sZo8Kv7oxuXbH7r6Bt9mJgIXFtQl3jhEuc9nbiyJC'),
('00000000-0000-0000-0000-000000000013', 'invitado', '$2b$12$gYaaOlzI3krkqOPWYBjJsO6sqOiRS5Fyc0zMEsfjBsdyRm4ZMoH7C');

-- Usuarios-Roles
INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES
('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002'),
('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000003');

-- Solicitudes de prueba
INSERT INTO solicitudes (id, nombres, apellidos, identificacion, correo, tipo_persona, estado, usuario_id)
VALUES
(gen_random_uuid(), 'Carlos', 'Gómez', '1010101010', 'carlos@example.com', 'NATURAL', 'PENDIENTE', '00000000-0000-0000-0000-000000000012'),
(gen_random_uuid(), 'Ana', 'Martínez', '2020202020', 'ana@example.com', 'JURIDICA', 'PENDIENTE', '00000000-0000-0000-0000-000000000012');

-- Evaluación de ejemplo
-- Esto se puede añadir luego de tener una solicitud concreta evaluada