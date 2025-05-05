# app/models/relaciones.py
from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

usuarios_roles = Table(
    'usuarios_roles',
    Base.metadata,
    Column('usuario_id', UUID(as_uuid=True), ForeignKey('usuarios.id')),
    Column('rol_id', UUID(as_uuid=True), ForeignKey('roles.id')),
    extend_existing=True  # ⚠️ Esta línea evita la redefinición
)
