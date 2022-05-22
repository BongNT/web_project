from pydantic import BaseModel
from app.util.special_value import UserType
from app.model.models import District
from typing import Optional, List

class User(BaseModel):
    id: int
    name: str
    email: str
    type: int

    class Config():
        orm_mode = True


class District(BaseModel):
    id: str
    province_id: str
    name: str

    class Config():
        orm_mode = True

class UserDistrict(User):
    districts: List[District]
