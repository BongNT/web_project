from fastapi import APIRouter, status, HTTPException
from app.util import request_data
from sqlalchemy.orm import Session, joinedload
from app.model import models,hashing
from app.util.special_value import UserType


def test(db: Session):
    """
    Return: list contains all users
    """
    #     users = db.query(models.User).options(joinedload(models.UserCreate.districts).joinedload(models.District.province).joinedload(models.Facility)).all()
    users = db.query(models.User).options(joinedload(models.User.districts).joinedload(models.District.facilities).joinedload(models.Facility.certificate)).all()
    #users = db.query(models.Facility).options(joinedload(models.Facility.in_district)).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user in data")
    return users


def get_all(db: Session):
    """
    Return: list contains all users
    """
    users = db.query(models.User).options(joinedload(models.User.districts)).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user in data")
    return users


def get_by_id(id: int, db: Session):
    if id > 0:
        user = db.query(models.User).options(joinedload(models.User.districts)).filter(models.User.id == id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND
                                , detail=f"User id {id} not found")
        else:
            return user
    else:
        raise HTTPException(detail="Invalid id",status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


def create(request: request_data.UserCreate, db: Session):

    if not email_in_db(request.email, db):
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
                                detail=f"Username:'{request.name}' already registered.")
    else:
        print(f"ERROR : Duplicate email:'{request.email}'.")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Email:'{request.email} already registered'.")


def delete_by_id(id: int, db: Session):
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
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid id")


def update_by_id(request: request_data.UserUpdate,  db: Session):
    user = db.query(models.User).filter(models.User.id == request.id).first()
    # check user with id is in database
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User id {id} not found")
    elif user.type == UserType.DEFAULT_ADMIN.value:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Can't delete this user")
    else:
        # update user
        user_query = db.query(models.User).filter(models.User.id == request.id)
        msg = "update "
        if request.password is not None:
            user_query.update({models.User.password: hashing.hash_password(request.password)}, synchronize_session="fetch")
            db.commit()
            msg += "password "
        if request.type is not None:
            user_query.update({models.User.type: request.type}, synchronize_session="fetch")
            db.commit()
            msg += "type "
        if request.email is not None:
            if not email_in_db(request.email,db):
                user_query.update({models.User.email: request.email}, synchronize_session="fetch")
                db.commit()
                msg += "email "
            else:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"This email has been used")
                msg += "successfully."
                return {"detail": msg}


def email_in_db(email, db: Session) -> bool:
    users = db.query(models.User).filter(models.User.email == email).first()
    if users:
        return True
    else:
        return False

