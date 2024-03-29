import datetime
from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse
from src.configuration.config import Settings
from src.database import models, schemas
from src.utils.Hash import HashPswd
from src.utils.Token import CreateToken
from src.crud.create import create_new_user
from src.configuration.config import settings
from ..main import db_dependency
from src.utils.CookieHandler import set_cookie_to_response

router = APIRouter()

@router.post('/api/user/create')
def create_user(user_data:schemas.UserRegScheme, req:Request, db:db_dependency):
    try:
        user = create_new_user(user_data, db)
        user_token = CreateToken({'uid':user.id}, settings.TOKEN_SECRET)

        res = JSONResponse(status_code = status.HTTP_200_OK, content={'status':'ok'})
        res = set_cookie_to_response(res, 'access_token', user_token)
        return res
    except ValueError:
        return JSONResponse(status_code=status.HTTP_409_CONFLICT, content = {'message' : 'User already exists'})

    
