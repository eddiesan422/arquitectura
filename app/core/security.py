# app/core/security.py

from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# Configuración del token
SECRET_KEY = "clave_super_secreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Generar hash
def hash_contraseña(contraseña: str) -> str:
    return bcrypt.hashpw(contraseña.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Verificar hash
def verificar_contraseña(contraseña: str, hash_almacenado: str) -> bool:
    return bcrypt.checkpw(contraseña.encode('utf-8'), hash_almacenado.encode('utf-8'))

# Crear token JWT
def crear_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Obtener usuario actual y sus roles desde el token
def obtener_usuario_actual(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        roles: list = payload.get("roles", [])

        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return {"username": username, "roles": roles}
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
from typing import Callable
from fastapi import Depends

def requiere_rol(rol_requerido: str):
    def dependencia(usuario: dict = Depends(obtener_usuario_actual)):
        if rol_requerido not in usuario["roles"]:
            raise HTTPException(
                status_code=403,
                detail=f"Acceso no autorizado. Se requiere rol: {rol_requerido}"
            )
        return usuario  # si se necesita el usuario en el endpoint
    return dependencia
