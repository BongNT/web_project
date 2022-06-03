from datetime import date
from pydantic import BaseModel
from typing import List, Union


class User(BaseModel):
    id: int
    name: str
    email: Union[str, None]
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
    class Config():
        orm_mode = True

class DistrictProvince(District):
    province: Province

    class Config():
        orm_mode = True


class UserDistrict(User):
    districts: List[DistrictProvince]


class Facility(BaseModel):
    id: int
    name: str
    type: int
    phone_number: Union[str, None]
    in_district: DistrictProvince

    class Config():
        orm_mode = True


class Facility2(BaseModel):
    id: int
    name: str
    type: int
    phone_number: Union[str, None]
    district_id: str

    class Config():
        orm_mode = True


class Certificate(BaseModel):
    id: int
    issue_date: date
    expiry_date: date
    status: int
    facility: Facility2

    class Config():
        orm_mode = True


class Inspection(BaseModel):
    id: int
    start_date: date
    end_date: date
    result: Union[int, None]


    class Config():
        orm_mode = True

class InspectionFacility(Inspection):
    facility_inspection: Facility2

class Sample(BaseModel):
    id: int
    inspection_agency: str
    status: int
    result_date: date
    result: Union[str, None]
    in_inspection: Inspection
    class Config():
        orm_mode = True

class UserInformation(BaseModel):
    fullname: str
    DOB: date
    gender: int
    phone_number: str
    address: str

    class Config():
        orm_mode = True