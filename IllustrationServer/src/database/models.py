from sqlalchemy import  Column, String, Integer
from src.database.db import Base

class Users(Base):
    __tablename__ = 'Пользователи'

    id = Column(String, primary_key=True, index=True)

    username = Column(String)
    email = Column(String, index=True)
    password = Column(String)
    description = Column(String)
    avatar = Column(String)

    avatar = Column(String)

class Images(Base):
    __tablename__ = 'Изображения'

    id = Column(String, primary_key=True, index=True)

    author_id = Column(String)
    title = Column(String)
    likes = Column(Integer)
    link = Column(String)
    deleteLink = Column(String)

