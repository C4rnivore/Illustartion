import datetime
from fastapi import APIRouter, Response, status
from fastapi.responses import JSONResponse, RedirectResponse

from src.database import models, schemas
from src.utils.Hash import CheckPswd, HashPswd
from src.utils.Token import CreateToken
from ..main import db_dependency
from src.configuration.config import settings
from src.crud.read import get_user_by_email
from src.crud.create import create_new_user
from src.utils.CookieHandler import set_cookie_to_response

router = APIRouter()



@router.post('/api/user/login')
def login_user(user_data:schemas.UserLogScheme, res:JSONResponse,  db:db_dependency):
    try:
        user = get_user_by_email(user_data.email, db)
    except ValueError:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content = {'message' : 'User not found', 'err_type': 'email'})

    if not CheckPswd(user_data.password, user.password):
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content = {'message' : 'Password is incorrect', 'err_type': 'password'})

    user_token = CreateToken({'uid':user.id}, settings.TOKEN_SECRET)
    print(user_token)

    res = JSONResponse(status_code = status.HTTP_200_OK, content={'status':'ok'})
    # res.set_cookie(key='access_token', value=user_token, httponly=True)
    # res.set_cookie(key = 'access_token',
    #                 value=user_token,
    #                 samesite='lax',
    #                 secure=False,
    #                 httponly=True,
    #                 max_age=datetime.datetime.now() + datetime.timedelta(days=60))
    res = set_cookie_to_response(res, 'access_token', user_token)
    return res








@router.get('/api/user/logout')
def logout_user( res:JSONResponse,  db:db_dependency):
    res = JSONResponse(status_code = status.HTTP_200_OK, content={'status':'ok'})
    res.set_cookie('access_token', 'none', expires=1)
    return res

@router.post('/google/user/login')
def login_user_from_google(user_data:schemas.UserRegScheme, db:db_dependency):
    try:
        user = get_user_by_email(user_data.email, db)
    except ValueError:
        user = create_new_user(user_data, db)

    user_token = CreateToken({'uid':user.id}, settings.TOKEN_SECRET)

    res = JSONResponse(status_code = status.HTTP_200_OK, content={'status':'ok'})
    res = set_cookie_to_response(res, 'access_token', user_token)
    return res
    
    

