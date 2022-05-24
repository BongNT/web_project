from fastapi import APIRouter, status, HTTPException
from app.util import request_data
from sqlalchemy.orm import Session
from app.model import models
from app.util.special_value import UserType



router = APIRouter(
    tags=["managers"]
)


def get_all(db: Session):
    """
    Return: list of manager user in database .If don't have any user, raise HTTPException
    """
    managers = db.query(models.User).filter(models.User.type == UserType.MANAGER.value).all()
    if not managers:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Managers not found")
    else:
        return managers


def register_district(request:request_data.DistrictRegister, db: Session):
    # find manager by id
    # find district by id
    # create data in database "quanly"
    pass


def delete_district(request:request_data.DistrictRegister, db: Session):
    # find manager by id
    # find district by id
    # delete data in database "quanly"
    pass


def update_district(request:request_data.DistrictUpdate ,db: Session):
    # find manager by id
    # find district by id
    # delete old district in "quanly"
    # create data in database "quanly"
    pass


