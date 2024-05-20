from typing import Annotated
from fastapi import APIRouter, Cookie, Request, Response, status
from fastapi.responses import JSONResponse
from src.crud.read import get_user_data_with_token
from ..main import db_dependency
router = APIRouter()

@router.get('/api/user/get')
def get_user_data( req:Request, db:db_dependency):
    access_token = req.cookies.get('access_token')
    print(req.cookies)
    if not access_token:
         return JSONResponse(status_code=status.HTTP_200_OK, content={'No':'Cookie'})
    
    try:
        data = get_user_data_with_token(access_token,db)
        return JSONResponse(status_code=status.HTTP_200_OK, content=data)
    except ValueError:
         return Response(status_code=status.HTTP_404_NOT_FOUND)