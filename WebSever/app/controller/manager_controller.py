from fastapi import APIRouter, Depends, status, HTTPException
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.model import models,hashing
from app.util.special_value import UserType
from typing import List


router = APIRouter(
    tags=["managers"]
)

@router.get('/managers', status_code=status.HTTP_200_OK, response_model=List[response_data.UserDistrict])
def get_managers(db: Session = Depends(database.get_db)):
    """
    Return: list of manager user in database .If don't have any user, raise HTTPException
    """
    managers = db.query(models.User).filter(models.User.type == UserType.MANAGER.value).all()
    if not managers:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Managers not found")
    else:
        return managers

@router.post("/managers/{id}/register_district")
def register_district(request:request_data.DistrictRegister ,db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # create data in database "quanly"

@router.post("/managers/{id}/delete_district")
def register_district(request:request_data.DistrictRegister ,db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete data in database "quanly"


@router.post("/managers/{id}/update_district")
def update_district(request:request_data.DistrictUpdate ,db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete old district in "quanly"
    # create data in database "quanly"


