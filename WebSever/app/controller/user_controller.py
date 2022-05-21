from fastapi import APIRouter, Depends, status, HTTPException
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.model import models,hashing
from app.util.special_value import UserType
from typing import List


router = APIRouter(
    tags=["users"]
)


@router.post('/login')
def login(request: request_data.LoginData, status_code=status.HTTP_202_ACCEPTED):
    # find user in database
    # check password
    # return type user, (session) 
    return {}


@router.post('/logout')
def logout():
    # delete session
    return {}


@router.post('/users/create', status_code=status.HTTP_201_CREATED)
def create_user(request: request_data.User, db: Session = Depends(database.get_db)):
    try:
        new_user = models.User(name=request.name, password=hashing.hash_password(request.password)
                               , email=request.email, type=request.type)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"detail": "Create user successfully"}
    except:
        print(f"ERROR : Duplicate name_user:'{request.name}'.")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"ERROR : Username:'{request.name} already registered'.")


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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Managers not found")
    else:
        return users


@router.get('/users/{id}', status_code=status.HTTP_200_OK)
def get_user(id:int , db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND
                            , detail=f"User id {id} not found")
    else:
        return user


@router.delete('/users/{id}', status_code=status.HTTP_200_OK)
def delete_user(id: int, db: Session = Depends(database.get_db)):
    """
    Param id: user id.
    Return: action status
    """
    # check valid id
    if id > 0:
        user = db.query(models.User).filter(models.User.id == id).first()
        # check user with id is in database
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User id {id} not found")
        elif user.type == UserType.DEFAULT_ADMIN.value:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Can't delete this user")
        else:
            # delete user
            db.query(models.User).filter(models.User.id == id).delete(synchronize_session=False)
            db.commit()
            return {"detail": "delete successfully"}

@router.put('/users/update/{id}', status_code=status.HTTP_200_OK)
def update_user(id: int,  db: Session = Depends(database.get_db)):
    pass


