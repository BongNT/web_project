from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import manager
from typing import List


router = APIRouter(
    tags=["managers"]
)

@router.get('/managers', status_code=status.HTTP_200_OK, response_model=List[response_data.UserDistrict])
def get_all_managers(db: Session = Depends(database.get_db)):
    return manager.get_all(db)

@router.post("/managers/{id}/register_district")
def register_district(request:request_data.DistrictRegister, db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # create data in database "quanly"
    return manager.register_district(request, db)

@router.post("/managers/{id}/delete_district")
def delete_district(request:request_data.DistrictRegister, db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete data in database "quanly"
    return manager.delete_district(request, db)


@router.post("/managers/{id}/update_district")
def update_district(request:request_data.DistrictUpdate, db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete old district in "quanly"
    # create data in database "quanly"
    return manager.update_district(request, db)


