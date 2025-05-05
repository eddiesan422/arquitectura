# scripts/insert_director.py

from sqlalchemy.orm import Session
from app.core.database import Base, engine, SessionLocal
from app.models.usuario import Usuario
from app.core.security import get_password_hash

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

def insertar_director():
    db: Session = SessionLocal()
    try:
        username = "director1"
        email = "director@example.com"
        password = "123456"
        rol = "DIRECTOR"

        existente = db.query(Usuario).filter(Usuario.username == username).first()
        if existente:
            print("Ya existe el usuario.")
            return

        nuevo = Usuario(
            username=username,
            email=email,
            hashed_password=get_password_hash(password),
            rol=rol
        )
        db.add(nuevo)
        db.commit()
        print("Usuario DIRECTOR insertado con éxito.")
    finally:
        db.close()

if __name__ == "__main__":
    insertar_director()
