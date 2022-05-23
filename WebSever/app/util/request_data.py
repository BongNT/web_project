from pydantic import BaseModel,ValidationError, validator
from typing import Optional
from app.util.special_value import UserType
import re

"""
Pydantic uses the term "model" to refer to something different, the data validation, conversion, 
and documentation classes and instances.
"""

class User(BaseModel):
    name: str
    password: str
    email: Optional[str] = None
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
            if type == UserType.DEFAULT_ADMIN.value:
                raise ValueError("Invalid type")
            else:
                raise ValueError("Invalid type")
        return type

    @validator('email')
    def valid_email(cls, email):
        """
        email contains characters from small 'a' to small 'z', numbers from 0 to 9 and may be 1 char '.' before '@'.
        match '@' followed by any alphanumeric character, repeating one or more than one time.
        match last dot followed by any alphanumeric combination of characters of length 2 or 3.
        example: abc.xyz@aaasadsd.com
        """
        if email is None:
            return email
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
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


class Token(BaseModel):
    access_token: str
    token_type: str

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