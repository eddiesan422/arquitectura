from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from app.models.solicitud import Solicitud
from app.models.evaluacion import Evaluacion
from app.models.usuario import Usuario

class SolicitudRepository:

    @staticmethod
    def get_all_filtered(
        db: Session,
        identificacion: Optional[str] = None,
        estado: Optional[str] = None,
        fecha_inicio: Optional[datetime] = None,
        fecha_fin: Optional[datetime] = None
    ) -> List[Solicitud]:
        query = db.query(Solicitud)
        if identificacion:
            query = query.filter(Solicitud.identificacion == identificacion)
        if estado:
            query = query.filter(Solicitud.estado == estado)
        if fecha_inicio and fecha_fin:
            query = query.filter(Solicitud.fecha_registro.between(fecha_inicio, fecha_fin))
        return query.all()

    @staticmethod
    def get_by_id(db: Session, solicitud_id: UUID) -> Optional[Solicitud]:
        return db.query(Solicitud).filter(Solicitud.id == solicitud_id).first()

    @staticmethod
    def get_by_creator(
        db: Session,
        username: str,
        identificacion: Optional[str] = None,
        estado: Optional[str] = None,
        fecha_inicio: Optional[datetime] = None,
        fecha_fin: Optional[datetime] = None
    ) -> List[Solicitud]:
        usuario = db.query(Usuario).filter(Usuario.username == username).first()
        if not usuario:
            return []

        query = db.query(Solicitud).filter(Solicitud.usuario_id == usuario.id)
        if identificacion:
            query = query.filter(Solicitud.identificacion == identificacion)
        if estado:
            query = query.filter(Solicitud.estado == estado)
        if fecha_inicio and fecha_fin:
            query = query.filter(Solicitud.fecha_registro.between(fecha_inicio, fecha_fin))
        return query.all()

    @staticmethod
    def evaluar_solicitud(
        db: Session,
        solicitud: Solicitud,
        datacredito: str,
        cifin: str,
        antecedentes: str,
        resultado_final: str
    ) -> str:
        evaluacion = Evaluacion(
            solicitud_id=solicitud.id,
            datacredito=datacredito,
            cifin=cifin,
            antecedentes=antecedentes,
            resultado_final=resultado_final
        )
        solicitud.estado = resultado_final
        db.add(evaluacion)
        db.commit()
        return resultado_final
