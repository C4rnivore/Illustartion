from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from src.database import models, schemas
from src.utils.Hash import CheckPswd, HashPswd
from src.utils.Token import CreateToken
from ..main import db_dependency
from src.configuration.config import settings
from src.crud.read import get_user_by_email
from src.crud.create import create_new_user

router = APIRouter()

@router.post('/api/user/login')
def login_user(user_data:schemas.UserLogScheme,  db:db_dependency):
    try:
        user = get_user_by_email(user_data.email, db)
    except ValueError:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content = {'message' : 'User not found', 'err_type': 'email'})

    if not CheckPswd(user_data.password, user.password):
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content = {'message' : 'Password is incorrect', 'err_type': 'password'})

    user_token = CreateToken({'uid':user.id}, settings.TOKEN_SECRET)
    return JSONResponse(status_code=status.HTTP_200_OK, content={'access_token':user_token})

@router.post('/google/user/login')
def login_user_from_google(user_data:schemas.UserRegScheme, db:db_dependency):
    try:
        user = get_user_by_email(user_data.email, db)
        user_token = CreateToken({'uid':user.id}, settings.TOKEN_SECRET)
        return JSONResponse(status_code=status.HTTP_200_OK, content={'access_token':user_token})
    
    except ValueError:
        user = create_new_user(user_data, db)
        user_token = CreateToken({'uid':user.id}, settings.TOKEN_SECRET)
        return JSONResponse(status_code=status.HTTP_200_OK, content={'access_token':user_token})

