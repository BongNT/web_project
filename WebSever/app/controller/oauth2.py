from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, FastAPI, HTTPException, status
from app.controller import token as tk
from sqlalchemy.orm import Session
from app.model import database
from app.model import models
from app.util.special_value import UserType
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    token_data = tk.verify_token(token)
    user = get_user_by_username(token_data.username)
    return user


def get_current_admin(token: str = Depends(oauth2_scheme)):
    token_data = tk.verify_token(token)
    user = get_user_by_username(token_data.username)
    if user.type == UserType.MANAGER.value:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="You are not allowed",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def get_user_by_username(username: str):
    db = database.get_db()
    user = next(db).query(models.User).filter(models.User.name == username).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user