from fastapi import status, HTTPException
from sqlalchemy.orm import Session

from app.model import models
from app.util import request_data
from app.util.special_value import UserType, Gender


def get_info(db: Session, current_user: models.User):
    info = db.query(models.UserInformation).filter(models.UserInformation.user_id == current_user.id).first()
    if info is None:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="Information not found")
    return info


def get_districts(current_user: models.User):
    if current_user.type == UserType.MANAGER.value:
        return current_user.districts
    else:
        return {"districts": "all districts"}


def update_info(request: request_data.UserInformationUpdate, db: Session, current_user: models.User):
    info_query = db.query(models.UserInformation).filter(models.UserInformation.user_id == current_user.id)
    info = info_query.first()
    if info is None:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="Information not found")
    else:
        msg = "update "
        if request.DOB is not None:
            info_query.update({models.UserInformation.DOB: request.DOB}, synchronize_session="fetch")
            db.commit()
            msg += "DOB "
        if request.gender is not None:
            info_query.update({models.UserInformation.gender: request.gender}, synchronize_session="fetch")
            db.commit()
            msg += "gender "
        if request.address is not None:
            info_query.update({models.UserInformation.address: request.address}, synchronize_session="fetch")
            db.commit()
            msg += "address "
        if request.fullname is not None:
            info_query.update({models.UserInformation.fullname: request.fullname}, synchronize_session="fetch")
            db.commit()
            msg += "fullname "
        if request.phone_number is not None:
            info_query.update({models.UserInformation.phone_number: request.phone_number}, synchronize_session="fetch")
            db.commit()
            msg += "phone_number "
        msg += "successfully."
        return {"detail": msg}


def create_info(db: Session, user_id: int):
    new_info = models.UserInformation(user_id=user_id, fullname="Nguyễn Văn A", DOB="2001-01-01",
                                      gender=Gender.OTHER.value, phone_number="0123456789", address="Việt Nam")
    db.add(new_info)
    db.commit()
    db.refresh(new_info)
    return {"detail": "Create user successfully"}
