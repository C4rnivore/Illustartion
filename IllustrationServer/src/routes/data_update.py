import base64
import json
from fastapi import APIRouter, Request, Response, status,  File, UploadFile
from typing import Annotated
from fastapi.responses import JSONResponse
from sqlalchemy import update
from src.crud.create import create_new_image
from src.crud.update import update_user_avatar, load_user_image
from src.utils.Token import DecodeToken
from src.configuration.config import settings
from src.database import models, schemas
from ..main import db_dependency

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
    
@router.post('/api/user/update/avatar',)
async def update_user_pfp(req:Request, db:db_dependency,  image:UploadFile = File(...)):
    try:
        imageb64 = base64.b64encode(image.file.read())
    except Exception:
        return {"message": "There was an error uploading the file"}

    try:
        access_token = req.cookies.get('access_token')
        uid = DecodeToken(access_token, settings.TOKEN_SECRET)['uid']
    except Exception:
        return {"message": "Your token has expired. Please login again"}
    
    imagedata = load_image_to_host(imageb64)
    if(imagedata == None):
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content= {'message':'Something went wrong'})
    
    image_data = {
        'id': imagedata['data']['id'],
        'author_id' : uid,
        'title' : imagedata['data']['title'],
        'likes' : 0,
        'link' : imagedata['data']['url'],
        'deleteLink' : imagedata['data']['delete_url'],
    }

    create_new_image(image_data, db)
    try:
        response = update_user_avatar(image_data['link'], uid, db)
        return JSONResponse(status_code=status.HTTP_200_OK, content={
            'message':response['message'],
            'avatarLink':image_data['link']
        })
    except:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={
            'message':response['message']
        })
   

@router.post('/api/user/load/image',)
async def update_user_pfp(req:Request, db:db_dependency,  image:UploadFile = File(...)):
    try:
        imageb64 = base64.b64encode(image.file.read())
    except Exception:
        return {"message": "There was an error uploading the file"}

    try:
        access_token = req.cookies.get('access_token')
        uid = DecodeToken(access_token, settings.TOKEN_SECRET)['uid']
    except Exception:
        return {"message": "Your token has expired. Please login again"}
    
    imagedata = load_image_to_host(imageb64)
    if(imagedata == None):
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content= {'message':'Something went wrong'})
    
    image_data = {
        'id': imagedata['data']['id'],
        'author_id' : uid,
        'title' : imagedata['data']['title'],
        'likes' : 0,
        'link' : imagedata['data']['url'],
        'deleteLink' : imagedata['data']['delete_url'],
    }

    create_new_image(image_data, db)
    
    try:
        response = load_user_image(image_data['id'], uid, db)
        return JSONResponse(status_code=status.HTTP_200_OK, content={
            'message':response['message'],
            'avatarLink':image_data['link']
        })
    except:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={
            'message':response['message']
        })


def load_image_to_host(imageb64):
    host_api = settings.IMAGE_HOST_API
    api_key = settings.IMAGE_HOST_KEY

    response = requests.post(url=host_api, data={
        'key':api_key,
        'image':imageb64
    })

    imgdata = json.loads(response.content.decode("utf-8"))
    return imgdata
