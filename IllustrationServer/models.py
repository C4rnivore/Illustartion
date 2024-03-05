from sqlalchemy import Column, String
from database import Base

class Users(Base):
    __tablename__ = 'Пользователи'

    id = Column(String, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)