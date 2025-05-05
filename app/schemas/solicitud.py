from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional

# Esquema para listar solicitudes resumidas
class SolicitudResumenDTO(BaseModel):
    id: UUID
    nombres: str
    apellidos: str
    identificacion: str
    correo: EmailStr
    estado: str
    fecha_registro: datetime

    class Config:
        orm_mode = True

# Esquema para ver el detalle completo de una solicitud
class SolicitudDetalleDTO(SolicitudResumenDTO):
    tipo_persona: Optional[str] = None

# Esquema para evaluar una solicitud
class SolicitudEvaluacionDTO(BaseModel):
    datacredito: str
    cifin: str
    antecedentes: str
    resultado_final: str
