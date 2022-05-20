from fastapi import APIRouter, Depends, status, HTTPException
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.model import models
from app.util.special_value import UserType
from typing import List


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
    try:
        new_user = models.User(name_user=request.name, password=request.password, email=request.email, type=request.type)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"detail": "Create user successfully"}
    except:
        print(f"ERROR : Duplicate name_user:'{request.name}'.")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"ERROR : Duplicate name_user:'{request.name}'.")


@router.get('/users', status_code=status.HTTP_200_OK, response_model=List[response_data.User])
def get_all_users(db: Session = Depends(database.get_db)):
    """
    Return: list contains all users
    """
    users = db.query(models.User).all()
    return users


@router.get('/users/managers', status_code=status.HTTP_200_OK, response_model=List[response_data.User])
def get_managers(db: Session = Depends(database.get_db)):
    """
    Return: list of manager user in database .If don't have any user, raise HTTPException
    """
    users = db.query(models.User).filter(models.User.type == UserType.MANAGER.value).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="System doesn't have any managers")
    else:
        return users


@router.delete('/user/{id}', status_code=status.HTTP_200_OK)
def delete_user(id: int, db: Session = Depends(database.get_db)):
    """
    Param id: user id.
    Return: action status
    """
    # check valid id
    if id > 0:
        user = db.query(models.User).filter(models.User.id_user == id).first()
        # check user with id is in database
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Don't have user with id {id} ")
        elif user.type == UserType.DEFAULT_ADMIN.value:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Can't delete this user")
        else:
            # delete user
            db.query(models.User).filter(models.User.id_user == id).delete(synchronize_session=False)
            db.commit()
            return {"detail": "delete successfully"}



