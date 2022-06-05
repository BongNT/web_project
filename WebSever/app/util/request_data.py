import re
from datetime import date
from typing import Optional
from typing import Union

from pydantic import BaseModel, validator

from app.util.special_value import UserType, FacilityType, SampleStatus

"""
Pydantic uses the term "model" to refer to something different, the data validation, conversion, 
and documentation classes and instances.
"""


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    userid: Union[int, None] = None
    usertype: Union[int, None] = None


class UserCreate(BaseModel):
    name: str
    password: str
    email: str = None
    type: Optional[int] = UserType.MANAGER.value

    @validator('name')
    def name_no_contain_space(cls, name):
        if ' ' in name:
            raise ValueError("mustn't contain a space")
        return name

    @validator('password')
    def valid_password(cls, password):
        """
        At least 8 characters
        Must be restricted to, though does not specifically require any of:
            uppercase letters: A-Z
            lowercase letters: a-z
            numbers: 0-9
            any of the special characters: @#$%^&+=
        """
        if re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', password):
            return password
        else:
            raise ValueError("Invalid password")

    @validator('type')
    def valid_type(cls, type):
        """
        type value must be one of UserType value and different from DEFAULT_ADMIN value
        """
        if type not in UserType.get_list_value():
            raise ValueError("Invalid type")
        if type == UserType.DEFAULT_ADMIN.value:
            raise ValueError("Invalid type")
        return type

    @validator('email')
    def valid_email(cls, email):
        """
        email contains characters from small 'a' to small 'z', numbers from 0 to 9 and may be 1 char '.' before '@'.
        match '@' followed by any alphanumeric character, repeating one or more than one time.
        match last dot followed by any alphanumeric combination of characters of length from 2 to 5.
        example: abc.xyz@aaasadsd.com
        """
        if email is None:
            return email
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]?\w{0,5}[.]\w{2,5}$'
        if not re.fullmatch(regex, email):
            raise ValueError("Invalid email")
        return email


class LoginData(BaseModel):
    username: str
    password: str

    @validator('username')
    def name_no_contain_space(cls, name):
        if ' ' in name:
            raise ValueError("mustn't contain a space")
        return name

    @validator('password')
    def valid_password(cls, password):
        """
        At least 8 characters
        Must be restricted to, though does not specifically require any of:
            uppercase letters: A-Z
            lowercase letters: a-z
            numbers: 0-9
            any of the special characters: @#$%^&+=
        """
        if re.fullmatch(r'[A-Za-z0-9@#$%^&+=]{8,}', password):
            return password
        else:
            raise ValueError("Invalid password")


class DistrictRegister(BaseModel):
    manager_id: int
    district_id: str

    @validator("manager_id")
    def unsign_id(cls, id):
        if id > 0:
            return id
        else:
            raise ValueError("Invalid id. Id must be greater than 0")


class DistrictUpdate(DistrictRegister):
    old_district_id: str


class UserUpdate(BaseModel):
    id: int
    password: Optional[str] = None
    email: Optional[str] = None
    type: Optional[int] = None

    @validator('id')
    def unsign_id(cls, i):
        if i < 0:
            raise ValueError("Invalid id")
        else:
            return i

    @validator('password')
    def valid_password(cls, password):
        """
        At least 8 characters
        Must be restricted to, though does not specifically require any of:
            uppercase letters: A-Z
            lowercase letters: a-z
            numbers: 0-9
            any of the special characters: @#$%^&+=
        """
        if password is None:
            return password
        if re.fullmatch(r'[A-Za-z0-9@#$%^&.+=]{8,}', password):
            return password
        else:
            raise ValueError("Invalid password")

    @validator('type')
    def valid_type(cls, type):
        """
        type value must be one of UserType value and different from DEFAULT_ADMIN value
        """
        if type is None:
            return type
        if type not in UserType.get_list_value():
            raise ValueError("Invalid type")
        if type == UserType.DEFAULT_ADMIN.value:
            raise ValueError("Invalid type")
        return type

    @validator('email')
    def valid_email(cls, email):
        """
        email contains characters from small 'a' to small 'z', numbers from 0 to 9 and may be 1 char '.' before '@'.
        match '@' followed by any alphanumeric character, repeating one or more than one time.
        match last dot followed by any alphanumeric combination of characters of length from 2 to 5.
        example: abc.xyz@aaasadsd.com
        """
        if email is None:
            return email
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]?\w{0,5}[.]\w{2,5}$'
        if not re.fullmatch(regex, email):
            raise ValueError("Invalid email")
        return email


class FacilityCreate(BaseModel):
    name: str
    type: int
    district_id: str
    phone_number: Optional[str] = None

    @validator("type")
    def valid_type(cls, t):
        if t in FacilityType.get_list_value():
            return t
        else:
            raise ValueError("Invalid type")


class FacilityUpdate(BaseModel):
    id: int
    name: Optional[str] = None
    type: Optional[int] = None
    district_id: Optional[str] = None
    phone_number: Optional[str] = None

    @validator('id')
    def unsign_id(cls, i):
        if i < 0:
            raise ValueError("Invalid id")
        else:
            return i

    @validator("type")
    def valid_type(cls, t):
        if t is None:
            return t
        if t in FacilityType.get_list_value():
            return t
        else:
            raise ValueError("Invalid type")

    @validator("phone_number")
    def is_number(cls, n):
        if n.isnumeric() or len(n) == 0:
            return n
        else:
            raise ValueError("Invalid phone number")


class CertificateCreate(BaseModel):
    issue_date: date
    expiry_date: date
    facility_id: int

    @validator('expiry_date')
    def expiry_date_greater_than_issue_date(cls, field_value, values, field, config):
        if field_value <= values["issue_date"]:
            raise ValueError("Invalid Issue date and Expiry date")
        else:
            return field_value


class CertificateUpdate(BaseModel):
    id: int
    expiry_date: Optional[date] = None
    status: Optional[int] = None

    @validator('id')
    def unsign_id(cls, i):
        if i < 0:
            raise ValueError("Invalid id")
        else:
            return i

    @validator('status')
    def status_in_CertificateStatus(cls, t):
        if t in FacilityType.get_list_value():
            return t
        else:
            raise ValueError("Invalid type")


class InspectionCreate(BaseModel):
    facility_id: int
    result: Optional[str] = None
    start_date: date
    end_date: date

    @validator("result")
    def trim_whitespace(cls, result):
        if result is None:
            return result
        return result.strip()

    @validator('end_date')
    def end_date_greater_than_start_date(cls, field_value, values, field, config):
        if field_value < values["start_date"]:
            raise ValueError("Invalid Start date and End date")
        else:
            return field_value


class InspectionUpdate(BaseModel):
    id: int
    result: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

    @validator("result")
    def trim_whitespace(cls, result):
        return result.strip()

    @validator('end_date')
    def end_date_greater_than_start_date(cls, field_value, values, field, config):
        if values["start_date"] is None:
            return field_value
        if field_value < values["start_date"]:
            raise ValueError("Invalid Start date and End date")
        else:
            return field_value


class SampleCreate(BaseModel):
    id: int
    inspection_id: int
    inspection_agency: str
    status: int
    result_date: date
    result: Optional[str] = None

    @validator('id')
    def unsign_id(cls, i):
        if i < 0:
            raise ValueError("Invalid id")
        else:
            return i

    @validator('inspection_id')
    def unsign_inspection_id(cls, i):
        if i < 0:
            raise ValueError("Invalid inspection id")
        else:
            return i

    @validator('result')
    def valid_result(cls, re):
        if re is not None:
            return re.strip()
        return re


class SampleUpdate(BaseModel):
    id: int
    inspection_agency: Optional[str] = None
    status: Optional[int] = None
    result_date: Optional[date] = None
    result: Optional[str] = None

    @validator('id')
    def unsign_id(cls, i):
        if i < 0:
            raise ValueError("Invalid id")
        else:
            return i

    @validator('status')
    def valid_status(cls, t):
        if t in SampleStatus.get_list_value():
            return t
        else:
            raise ValueError("Invalid type")

    @validator('result')
    def valid_result(cls, re):
        if re is not None:
            return re.strip()
        return re


class UserInformationUpdate(BaseModel):
    fullname: Optional[str] = None
    DOB: Optional[date] = None
    gender: Optional[int] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None

    @validator("fullname")
    def valid_name(cls, name):
        if name is not None:
            return name.strip().title()
        raise ValueError("Invalid name")

    @validator("gender")
    def valid_gender(cls, gender):
        if gender is not None:
            if gender in SampleStatus.get_list_value():
                return gender
            else:
                raise ValueError("Invalid gender")
        raise ValueError("Invalid gender")

    @validator("phone_number")
    def is_number(cls, n):
        if n.isnumeric() or len(n) == 0:
            return n
        else:
            raise ValueError("Invalid phone number")

    @validator("address")
    def valid_address(cls, address):
        if address is not None:
            return address.strip()
        raise ValueError("Invalid address")
