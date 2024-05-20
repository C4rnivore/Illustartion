import base64
import json
from fastapi import APIRouter, Request, Response, status,  File, UploadFile
from typing import Annotated
from fastapi.responses import JSONResponse
from sqlalchemy import update
from src.crud.create import create_new_image
from src.crud.read import get_images_for_user, get_images, get_image_data
from src.crud.delete import delete_image_by_id
from src.utils.Token import DecodeToken
from src.configuration.config import settings
from src.database import models, schemas
from ..main import db_dependency

router = APIRouter()

@router.get('/api/images')
def get_images_for_user_by_id(req:Request, db:db_dependency):
    token = req.cookies.get('access_token')
    images = get_images_for_user(token, db)
    return JSONResponse(content = images)

@router.delete('/api/images/delete/{imageId}')
def delete_image(req:Request, imageId:str, db:db_dependency):
    token = req.cookies.get('access_token')
    if not token:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content={'message':'unauthorized'})
    
    response = delete_image_by_id(imageId,token, db)
    return JSONResponse(content=response)

@router.get('/api/images/get')
def get_images_for_explore(req:Request, db:db_dependency):
    response = []
    images = get_images(db)
    for image in images:
        result= {
            'id':image.id,
            'author_id':image.author_id,
            'likes':image.likes,
            'link':image.link
        }
        response.append(result)

    return JSONResponse(status_code=status.HTTP_200_OK, content=response)


@router.get('/api/images/data/get/{image_id}/{author_id}')
def get_images_for_explore(req:Request, db:db_dependency, image_id:str, author_id:str ):
    response = []
    data = get_image_data(db, image_id, author_id)

    return JSONResponse(status_code=status.HTTP_200_OK, content=data)