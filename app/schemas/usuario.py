# app/schemas/usuario.py
from pydantic import BaseModel, EmailStr
from uuid import UUID

class UsuarioLoginDTO(BaseModel):
    nombre_usuario: str
    contraseña: str

class UsuarioDTO(BaseModel):
    id: UUID
    nombre_usuario: str
    correo: EmailStr
    activo: bool

    class Config:
        orm_mode = True
