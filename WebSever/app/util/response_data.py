from pydantic import BaseModel
from app.util.special_value import UserType


class User(BaseModel):
    name_user: str
    email: str
    type: int

    class Config():
        orm_mode = True
