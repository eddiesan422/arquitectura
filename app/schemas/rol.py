# app/schemas/rol.py
from pydantic import BaseModel
from uuid import UUID

class RolDTO(BaseModel):
    id: UUID
    nombre: str

    class Config:
        orm_mode = True
