from fastapi import APIRouter, Response, status
from fastapi.responses import JSONResponse
from sqlalchemy import update
from src.database import models, schemas
from ..main import db_dependency
from src.configuration.config import Settings

import requests
# from src.crud.update import update_user_main_data

router = APIRouter()

@router.put('/api/user/update/main')
def update_user_main_data(user_data:schemas.UserMainData,  db:db_dependency):
    try:
        st = (update(models.Users).where(models.Users.id == user_data.id).values(username=user_data.username, email=user_data.email))
        db.execute(st)
        db.commit()
        return JSONResponse(status_code=status.HTTP_200_OK, content={
            'message':'Data have been succesfully updated'
        })
    except Exception as error:
        print(error)
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={
            'message':'Something went wrong'
        })
    
@router.put('/api/user/update/description')
def update_user_main_data(user_descr:schemas.UserDescription,  db:db_dependency):
    try:
        st = (update(models.Users).where(models.Users.id == user_descr.id).values(description=user_descr.description))
        db.execute(st)
        db.commit()
        return JSONResponse(status_code=status.HTTP_200_OK, content={
            'message':'Data have been succesfully updated'
        })
    except Exception as error:
        print(error)
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={
            'message':'Something went wrong'
        })
    
@router.post('/api/user/update/pfp')
def update_user_pfp(uid:str, image:bytes, db:db_dependency):
    host_api = Settings.IMAGE_HOST_API
    api_key = Settings.IMAGE_HOST_KEY

    response = requests.post(url=host_api, data={
        'key':api_key,
        'image':image
    })

    return JSONResponse(content = response)