from pydantic import BaseModel


class UserRegScheme(BaseModel):
    id:str
    username:str
    email:str
    password:str

class UserLogScheme(BaseModel):
    email:str
    password:str
