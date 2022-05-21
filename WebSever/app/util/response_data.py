from pydantic import BaseModel
from app.util.special_value import UserType


class User(BaseModel):
    id: int
    name: str
    email: str
    type: int

    class Config():
        orm_mode = True
