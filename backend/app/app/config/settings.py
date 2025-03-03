"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""

from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    PROJECT_NAME: str
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    
    # FRONTEND_URL: str

    
    # Database details
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_DATABASE: str
    DATABASE_URI: Optional[str] = None
    
    #geofence radius
    GEOFENCE_RADIUS: float

    @validator("DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return f"postgresql+asyncpg://{values.get('POSTGRES_USER')}:{values.get('POSTGRES_PASSWORD')}@{values.get('POSTGRES_HOST')}:" \
               f"{values.get('POSTGRES_PORT')}/{values.get('POSTGRES_DATABASE')}"
    
    # Security
    JWT_SETTINGS: Optional[Dict[str, Any]] = None
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    JWT_TOKEN_PREFIX: str
    JWT_AUDIENCE: str

    @validator('JWT_SETTINGS', pre=True)
    def assemble_jwt_settings(cls, v: Optional[str], values: Dict[str, Any]) -> Dict[str, Any]:
        if isinstance(v, str):
            return v
        return {
            "JWT_SECRET_KEY": values.get("JWT_SECRET_KEY"),
            "JWT_ALGORITHM": values.get("JWT_ALGORITHM"),
            "ACCESS_TOKEN_EXPIRE_MINUTES": values.get("ACCESS_TOKEN_EXPIRE_MINUTES"),
            "JWT_TOKEN_PREFIX": values.get("JWT_TOKEN_PREFIX"),
            "JWT_AUDIENCE": values.get("JWT_AUDIENCE"),
        }
    
    
    
    POOL_SIZE : int
    MAX_OVERFLOW : int
    POOL_TIMEOUT : int
    POOL_RECYCLE : int

   

    class Config:
        case_sensitive = True
        # env_file = ".env"
        env_file = os.path.join(os.path.dirname(__file__), "../.env")
    

settings = Settings()


print(f"🔍 DATABASE_URI: {settings.DATABASE_URI}")
