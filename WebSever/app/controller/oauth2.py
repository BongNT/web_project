from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import joinedload

from app.controller import token as tk
from app.model import database
from app.model import models
from app.util.special_value import UserType

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    token_data = tk.verify_token(token)
    user = get_user_by_userid(token_data.userid)
    return user


def get_current_admin(token: str = Depends(oauth2_scheme)):
    token_data = tk.verify_token(token)
    if token_data.usertype == UserType.MANAGER.value:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="You are not allowed",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_user_by_userid(userid: int):
    db = database.get_db()
    user = next(db).query(models.User).options(joinedload(models.User.districts)).filter(
        models.User.id == userid).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
