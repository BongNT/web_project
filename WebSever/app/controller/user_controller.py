from fastapi import APIRouter, Depends, status, Response
from app.util import request_data
from sqlalchemy.orm import Session
from app.model import database
from app.model import models
from app.util.special_value import UserType

router = APIRouter(
    tags=["users"]
)


@router.post('/login')
def login():
    return {}


@router.post('/logout')
def logout():
    return {}


@router.post('/create_user', status_code=status.HTTP_201_CREATED)
def create_user(request: request_data.User, db: Session = Depends(database.get_db)):
    new_user = models.User(name_user=request.name, password=request.password, email=request.email, type=request.type)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get('/users')
def get_user(db: Session = Depends(database.get_db)):
    users = db.query(models.User).all()
    return users


@router.get('/users/managers', status_code=status.HTTP_200_OK)
def get_user(response: Response, db: Session = Depends(database.get_db)):
    """
    Return: list of manager user in database .If don't have any user, return detail error
    """
    users = db.query(models.User).filter(models.User.type == UserType.MANAGER.value).all()
    if not users:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"detail": "System doesn't have any managers"}
    return users



