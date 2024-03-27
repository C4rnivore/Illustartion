import json
from src.database import models
from src.utils.Token import DecodeToken
from ..main import db_dependency
from src.configuration.config import settings

def get_user_by_email(email:str,db:db_dependency) -> models.Users | ValueError:
    user = db.query(models.Users).filter(models.Users.email == email).first()

    if not user:
        raise ValueError()
    return user


def get_user_data_with_token(access_token:str, db:db_dependency) -> str | ValueError:
    uid = DecodeToken(access_token, settings.TOKEN_SECRET)['uid']
    user = db.query(models.Users).filter(models.Users.id == uid).first()
    if not user:
        raise ValueError()
    return {
        'id':user.id,
        'avatar':user.avatar,
        'username':user.username,
        'email':user.email,
        'description':user.description
    }

def get_user_data_with_id(id:str, db:db_dependency) -> str | ValueError:
    user = db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise ValueError()
    return {
        'id':user.id,
        'avatar':user.avatar,
        'username':user.username,
        'email':user.email,
        'description':user.description
    }

