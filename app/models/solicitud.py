from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.core.database import Base

class Solicitud(Base):
    __tablename__ = "solicitudes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombres = Column(String, nullable=False)
    apellidos = Column(String, nullable=False)
    identificacion = Column(String, unique=True, nullable=False)
    correo = Column(String, nullable=False)
    tipo_persona = Column(String)
    estado = Column(String, default="PENDIENTE")
    fecha_registro = Column(DateTime, default=datetime.utcnow)
    
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id"), nullable=False)
    usuario = relationship("Usuario", back_populates="solicitudes")

    evaluaciones = relationship("Evaluacion", back_populates="solicitud")
