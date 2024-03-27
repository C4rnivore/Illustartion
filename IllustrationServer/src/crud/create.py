from fastapi import Request
from src.configuration.config import settings
from src.utils.Hash import HashPswd
from src.database import schemas
from src.database import models
from src.utils.Token import CreateToken
from ..main import db_dependency


def create_new_user(user_data:schemas.UserRegScheme, db:db_dependency) -> models.Users | ValueError:
     exists_email = db.query(models.Users).filter(models.Users.email == user_data.email).first()
     exists_id = db.query(models.Users).filter(models.Users.id == user_data.id).first()
     if exists_email or exists_id:
          raise ValueError()

     if user_data.avatar == '':
          avatar = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106'
     else:
          avatar = user_data.avatar

     user = models.Users(id=user_data.id, avatar=avatar, username = user_data.username, email = user_data.email, password = HashPswd(user_data.password), description = '')
     db.add(user)
     db.commit()
     db.refresh(user)

     return user