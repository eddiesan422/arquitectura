# app/repositories/usuario_repository.py

from sqlalchemy.orm import Session
from app.models.usuario import Usuario

class UsuarioRepository:
    @staticmethod
    def get_by_username(db: Session, username: str) -> Usuario:
        return db.query(Usuario).filter(Usuario.username == username).first()
