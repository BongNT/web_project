from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from typing import List
from app.controller import user

router = APIRouter(
    tags=["users"]
    prefix="/users"
)


@router.get('/test', status_code=status.HTTP_200_OK)
def get_all_users(db: Session = Depends(database.get_db)):
    return user.test(db)


@router.post('/create', status_code=status.HTTP_201_CREATED)
def create_user(request: request_data.User, db: Session = Depends(database.get_db)):
    return user.create(request, db)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.UserDistrict])
def get_all_users(db: Session = Depends(database.get_db)):
    return user.get_all(db)


@router.get('/{id}', status_code=status.HTTP_200_OK, response_model=response_data.UserDistrict)
def get_user_by_id(id: int, db: Session = Depends(database.get_db)):
    return user.get_by_id(id, db)


@router.delete('/{id}', status_code=status.HTTP_200_OK)
def delete_user_by_id(id: int, db: Session = Depends(database.get_db)):
    return user.delete_by_id(id, db)


@router.put('/update/{id}', status_code=status.HTTP_200_OK)
def update_user_by_id(id: int, new_user: request_data.User, db: Session = Depends(database.get_db)):
    return user.update_by_id(id,new_user, db)


