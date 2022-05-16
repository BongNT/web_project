from pydantic import BaseModel
from typing import Optional
from app.util.special_value import UserType


class User(BaseModel):
    name: str
    password: str
    # id: Optional[int] = None
    email: Optional[str] = None
    type: Optional[int] = None
