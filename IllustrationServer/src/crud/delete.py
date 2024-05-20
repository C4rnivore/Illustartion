from sqlalchemy import update
from src.database import models
from src.utils.Token import DecodeToken
from ..main import db_dependency
from src.configuration.config import settings
import requests


def delete_image_by_id(image_id,token, db:db_dependency):
    uid = DecodeToken(token, secret=settings.TOKEN_SECRET)

    try:  
        delete_from_user_images(uid, image_id, db)
        db.query(models.Images).filter(models.Images.id == image_id).delete()
        db.commit()
        return {'message':'Image was succesfully deleted'}
    except Exception as err:
        print(err)
        return {'message':'Something went wrong'}

def delete_from_user_images(id,image_id, db:db_dependency):
    try:
        # !!!!!!!!!!!!
        img = db.query(models.Users).where(models.Users.id == id).first().images
        # !!!!!!!!!!!!
        
        st = (update(models.Users).where(models.Users.id == id).values(images=img))
        db.execute(st)
        db.commit()
    except Exception as err:
        return {'message':'Something went wrong when delete from user'}
    
    