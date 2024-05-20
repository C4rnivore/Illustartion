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
        'description':user.description,
        'images':user.images
    }

def get_images_for_user(access_token:str, db:db_dependency):
    uid = DecodeToken(access_token, settings.TOKEN_SECRET)['uid']
    user = db.query(models.Users).filter(models.Users.id == uid).first()

    if(user.images == None):
        return []
    
    result = []
    for img_id in user.images:
        image = db.query(models.Images).filter(models.Images.id == img_id).first()

        if image == None:
            continue

        img_ob = {'id':image.id, 'author_id':image.author_id, 'link':image.link, 'likes':image.likes}
        result.append(img_ob)

    json_res = json.dumps(result)
    return json_res

def get_images(db:db_dependency):
    images = db.query(models.Images).limit(10).all()
    return images

def get_image_data(db:db_dependency, image_id, author_id):
    imageName = db.query(models.Images).filter(models.Images.id == image_id).first().title
    authorName = db.query(models.Users).filter(models.Users.id == author_id).first().username
    return {'image_name':imageName, 'author_name': authorName}


