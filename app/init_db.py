# app/init_db.py

from app.core.database import Base, engine
from app.models.usuario import Usuario
from app.models.rol import Rol
from app.models.usuario_rol import UsuarioRol
from app.models.solicitud import Solicitud
from app.models.evaluacion import Evaluacion

print("Creando tablas...")
Base.metadata.create_all(bind=engine)
print("✅ Tablas creadas correctamente.")
