from fastapi import APIRouter, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.util import request_data
from sqlalchemy.orm import Session, joinedload
from app.model import models,hashing
from app.util.special_value import UserType
from app.controller import token
from datetime import datetime, timedelta

def login(request: OAuth2PasswordRequestForm, db: Session):
    user = db.query(models.User).filter(models.User.name == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    # verify password
    if not hashing.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password")
    # generate JWT and return
    user_data = {
        "id": user.id,
        "type": user.type
    }
    access_token = token.create_access_token(data={"sub": str(user_data)})
    return {"access_token": access_token, "token_type": "bearer", "user_type": user.type}