from sqlalchemy import LargeBinary, Column, String
from src.database.db import Base

class Users(Base):
    __tablename__ = 'Пользователи'

    id = Column(String, primary_key=True, index=True)

    username = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)
    description = Column(String, index=True)

    avatar = Column(String, index=True)
