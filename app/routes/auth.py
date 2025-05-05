from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.core.database import get_db
from app.core.security import crear_token, verificar_contraseña
from app.models.usuario import Usuario
from app.models.rol import Rol
from app.models.relaciones import usuarios_roles

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Buscar el usuario por nombre de usuario
    usuario = db.query(Usuario).filter(Usuario.username == form_data.username).first()

    if not usuario:
        raise HTTPException(status_code=400, detail="Credenciales inválidas (usuario)")

    # Verificar contraseña
    if not verificar_contraseña(form_data.password, usuario.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciales inválidas (contraseña)")

    # Obtener roles asociados
    roles_query = db.query(Rol.nombre).join(
        usuarios_roles, usuarios_roles.c.rol_id == Rol.id
    ).join(
        Usuario, usuarios_roles.c.usuario_id == Usuario.id
    ).filter(Usuario.id == usuario.id)

    roles = [r[0] for r in roles_query.all()]

    # Generar token
    access_token = crear_token(data={"sub": usuario.username, "roles": roles})

    return {"access_token": access_token, "token_type": "bearer"}
