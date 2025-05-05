# Sistema de Gestión de Solicitudes con FastAPI

Este proyecto es una arquitectura base para gestionar solicitudes en una aplicación web. Implementa autenticación con JWT, roles de usuario (ADMIN, ANALISTA, INVITADO), operaciones CRUD sobre solicitudes, evaluación y control de acceso por roles.

## Características

- Autenticación segura con JWT.
- Gestión de usuarios y roles.
- CRUD y evaluación de solicitudes.
- Protección de endpoints según roles.
- Base de datos relacional (PostgreSQL).
- Uso de SQLAlchemy, Pydantic y FastAPI.

## Estructura del Proyecto

```
app/
│
├── models/          # Modelos SQLAlchemy
├── schemas/         # Esquemas Pydantic
├── repositories/    # Lógica de acceso a datos
├── routes/          # Endpoints de la API
├── core/            # Seguridad y base de datos
├── services/        # Servicios adicionales
└── main.py          # Punto de entrada principal
```

## Requisitos

- Python 3.10+
- PostgreSQL
- pip

## Instalación

```bash
git clone https://github.com/eddiesan422/arquitectura.git
cd arquitectura
python -m venv venv
source venv/bin/activate  # En Windows usa: venv\Scripts\activate
pip install -r requirements.txt
```

## Variables de Entorno

Configura tu archivo `.env` con la cadena de conexión a la base de datos:

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mi_bd
SECRET_KEY=clave_super_secreta
```

## Iniciar la Aplicación

```bash
uvicorn app.main:app --reload
```

Accede a la documentación interactiva en:

- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/redoc

## Notas

- Se incluyen scripts de inserción masiva y creación de relaciones.
- Los roles definen el comportamiento de acceso:
  - `ADMIN`: puede listar todas las solicitudes y evaluarlas.
  - `ANALISTA`: puede ver solo sus solicitudes.
  - `INVITADO`: acceso restringido o de solo lectura.

---

Desarrollado por [Eddie Santiago Hernández](https://github.com/eddiesan422)