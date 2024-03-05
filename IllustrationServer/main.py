from typing import Annotated
from fastapi import Depends, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from config import settings
from database import engine, SessionLocal
from sqlalchemy.orm import Session

import uvicorn
import models
import schemas

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
    allow_headers=["*"]
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session,Depends(get_db)]

@app.get('/')
def hello():
    return{'Hello':'1'}

@app.post('/api/user/create')
def create_user(user_data:schemas.UserRegScheme, db:db_dependency):
    exists = db.query(models.Users).filter(models.Users.id == user_data.id).first()
    if exists:
        return JSONResponse(status_code=status.HTTP_409_CONFLICT, content = {'message' : 'User already exists'})
    
    user = models.Users(id=user_data.id, username = user_data.username, email = user_data.email, password = user_data.password)
    db.add(user)
    db.commit()
    db.refresh(user)

    return JSONResponse(status_code=status.HTTP_200_OK, content={'message' : 'User registred succesfully', 'uid':user_data.id})


if __name__ == '__main__':
    uvicorn.run("main:app", host='localhost', port=8000, reload=True)