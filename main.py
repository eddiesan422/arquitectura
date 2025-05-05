# main.py
from fastapi import FastAPI
from app.routes import solicitudes, auth

app = FastAPI()

# Registrar rutas de autenticación y solicitudes
app.include_router(auth.router)
app.include_router(solicitudes.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando correctamente"}
