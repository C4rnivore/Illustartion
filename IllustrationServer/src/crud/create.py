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

def create_new_image(image_data:dict, db:db_dependency) -> models.Images | ValueError:
     exists = db.query(models.Images).filter(models.Images.id == image_data['id']).first()

     if exists:
          return exists
     
     image = models.Images(   id = image_data['id'],
                              author_id = image_data['author_id'],
                              title = image_data['title'],
                              likes = image_data['likes'],
                              link = image_data['link'],
                              deleteLink = image_data['deleteLink'])
     db.add(image)
     db.commit()
     db.refresh(image)
     
     return image