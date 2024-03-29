from sqlalchemy import update
from src.database import schemas
from src.database import models
from ..main import db_dependency

def update_user_avatar(link,uid,db:db_dependency):
    try:
        st = (update(models.Users).where(models.Users.id == uid).values(avatar=link))
        db.execute(st)
        db.commit()
        return { 'message':'Data have been succesfully updated'}
    except Exception as err:
        return {'message':'Something went wrong'}
