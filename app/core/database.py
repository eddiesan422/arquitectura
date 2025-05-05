# app/core/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Cambia la URL de acuerdo a tu configuración de PostgreSQL
DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/proyecto_arquitectura"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ✅ Agrega esta función:
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
