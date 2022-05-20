from pydantic import BaseModel,ValidationError, validator
from typing import Optional
from app.util.special_value import UserType
import re



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

    @validator('type')
    def type_valid(cls, type):
        if type not in UserType.get_list_value():
            raise ValueError("Invalid type")
        return type

    @validator('email')
    def email_valid(cls, email):
        """
        email contains characters from small 'a' to small 'z', numbers from 0 to 9 and may be 1 char '.' before '@'.
        match '@' followed by any alphanumeric character, repeating one or more than one time.
        match last dot followed by any alphanumeric combination of characters of length 2 or 3.
        example: abc.xyz@aaasadsd.com
        """
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if not re.search(regex, email):
            raise ValueError("Invalid type")
        return email


