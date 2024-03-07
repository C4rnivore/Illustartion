from src.configuration.config import settings
from src.utils.Hash import HashPswd
from src.database import schemas
from src.database import models
from src.utils.Token import CreateToken
from ..main import db_dependency

def get_user_by_email(email:str,db:db_dependency) -> models.Users | ValueError:
    user = db.query(models.Users).filter(models.Users.email == email).first()

    if not user:
        raise ValueError()
    return user

