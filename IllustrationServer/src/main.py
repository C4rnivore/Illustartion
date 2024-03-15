from typing import Annotated
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from src.database import models
from src.database.db import SessionLocal, engine

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
    allow_headers=["*"]
)

#python -m uvicorn src.main:app --reload

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

from src.routes.registration import router as reg_r
from src.routes.authorization import router as auth_r
from src.routes.userdata import router as userdata_r

app.include_router(reg_r, tags=['Registration'])
app.include_router(auth_r, tags=['Authorization'])
app.include_router(userdata_r, tags=['User'])