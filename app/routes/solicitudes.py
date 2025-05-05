from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from app.core.database import get_db
from app.core.security import obtener_usuario_actual
from app.repositories.solicitud_repository import SolicitudRepository
from app.models.usuario import Usuario
from app.schemas.solicitud import SolicitudResumenDTO, SolicitudDetalleDTO, SolicitudEvaluacionDTO
from app.models.solicitud import Solicitud

router = APIRouter(prefix="/solicitudes", tags=["Solicitudes"])


@router.get("/", response_model=List[SolicitudResumenDTO])
def listar_solicitudes(
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(obtener_usuario_actual),
    identificacion: Optional[str] = Query(None),
    estado: Optional[str] = Query(None),
    fecha_inicio: Optional[datetime] = Query(None),
    fecha_fin: Optional[datetime] = Query(None)
):
    roles = [r.upper() for r in usuario_actual["roles"]]

    if "ADMIN" in roles:
        return SolicitudRepository.get_all_filtered(db, identificacion, estado, fecha_inicio, fecha_fin)
    else:
        return SolicitudRepository.get_by_creator(
            db=db,
            username=usuario_actual["username"],
            identificacion=identificacion,
            estado=estado,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin
        )


@router.get("/{solicitud_id}", response_model=SolicitudDetalleDTO)
def obtener_detalle_solicitud(
    solicitud_id: UUID,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(obtener_usuario_actual)
):
    solicitud = SolicitudRepository.get_by_id(db, solicitud_id)
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    roles = [r.upper() for r in usuario_actual["roles"]]
    if "ADMIN" not in roles and solicitud.usuario.username != usuario_actual["username"]:
        raise HTTPException(status_code=403, detail="No tienes permiso para ver esta solicitud")

    return solicitud


@router.post("/", response_model=SolicitudResumenDTO)
def crear_solicitud(
    solicitud_data: SolicitudDetalleDTO,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(obtener_usuario_actual)
):
    usuario = db.query(Usuario).filter(Usuario.username == usuario_actual["username"]).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    nueva_solicitud = Solicitud(
        nombres=solicitud_data.nombres,
        apellidos=solicitud_data.apellidos,
        identificacion=solicitud_data.identificacion,
        correo=solicitud_data.correo,
        tipo_persona=solicitud_data.tipo_persona,
        usuario_id=usuario.id
    )

    db.add(nueva_solicitud)
    db.commit()
    db.refresh(nueva_solicitud)

    return nueva_solicitud


@router.post("/{solicitud_id}/evaluar")
def evaluar_solicitud(
    solicitud_id: UUID,
    evaluacion_data: SolicitudEvaluacionDTO,
    db: Session = Depends(get_db),
    usuario_actual: dict = Depends(obtener_usuario_actual)
):
    roles = [r.upper() for r in usuario_actual["roles"]]
    if "ADMIN" not in roles:
        raise HTTPException(status_code=403, detail="No tienes permisos para evaluar solicitudes")

    solicitud = SolicitudRepository.get_by_id(db, solicitud_id)
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    return SolicitudRepository.evaluar_solicitud(
        db,
        solicitud,
        evaluacion_data.datacredito,
        evaluacion_data.cifin,
        evaluacion_data.antecedentes,
        evaluacion_data.resultado_final
    )
