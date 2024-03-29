from pydantic import BaseModel

class UserRegScheme(BaseModel):
    id:str
    username:str
    email:str
    password:str
    avatar: str

class UserLogScheme(BaseModel):
    email:str
    password:str

class UserMainData(BaseModel):
    id:str
    username:str
    email:str

class UserDescription(BaseModel):
    id:str
    description:str

class ImageBase(BaseModel):
    id:str
    author_id:str
    title:str
    likes:int
    link:str
    deleteLink:str