import os
from dotenv import load_dotenv

from pathlib import Path
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

class Settings:
    PROJECT_NAME:str = "Illustartion"
    PROJECT_VERSION: str = "1.0.0"

    SERVER_HOST:str ='localhost'
    SERVER_PORT:str = 8000

    POSTGRES_USER : str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_SERVER : str = os.getenv("POSTGRES_SERVER","localhost")
    POSTGRES_PORT : str = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB : str = os.getenv("POSTGRES_DB","tdd")
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

    TOKEN_SECRET:str = os.getenv('JWT_SECRET')
    TOKEN_ALGORITHM:str = os.getenv('JWT_ALG')

settings = Settings()