# app/models/evaluacion.py
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.core.database import Base

class Evaluacion(Base):
    __tablename__ = "evaluaciones"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    solicitud_id = Column(UUID(as_uuid=True), ForeignKey("solicitudes.id"), nullable=False)
    datacredito = Column(String, nullable=False)
    cifin = Column(String, nullable=False)
    antecedentes = Column(String, nullable=False)
    resultado_final = Column(String, nullable=False)
    fecha_evaluacion = Column(DateTime, default=datetime.utcnow)

    solicitud = relationship("Solicitud", back_populates="evaluaciones")