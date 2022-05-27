from pydantic import BaseModel
from app.util.special_value import UserType
from typing import Optional, List

class User(BaseModel):
    id: int
    name: str
    email: str
    type: int

    class Config():
        orm_mode = True

class Province(BaseModel):
    id: str
    name: str
    class Config():
        orm_mode = True

class District(BaseModel):
    id: str
    name: str
    province: Province
    class Config():
        orm_mode = True

class UserDistrict(User):
    districts: List[District]




class Facility(BaseModel):
    id: int
    name: str
    type: int
    # district_id: str
    phone_number: str
    # certificate_id: int
    in_district: District
    class Config():
        orm_mode = True