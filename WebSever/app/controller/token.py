import json
from datetime import datetime, timedelta
from typing import Union

from fastapi import HTTPException, status
from jose import JWTError, jwt

from app.util import request_data

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10080  # 1 week


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    """
    :param data
    :param expires_delta: expiration time
    :return: encoded JWT
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    """
    :param token:
    :return: return token data
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = json.loads(payload.get("sub").replace("'", '"'))
        if user is None:
            raise credentials_exception
        token_data = request_data.TokenData(userid=user["id"], usertype=user["type"])
    except JWTError:
        raise credentials_exception

    return token_data
