from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import facility
from typing import List


router = APIRouter(
    tags=["facilities"]
    prefix="/facilities"
)

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.UserDistrict])
def get_all_facilities(db: Session = Depends(database.get_db)):
    return facility.get_all(db)

@router.post("/{id}/register")
def register_facilities(id: int, request:request_data., db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # create data in database "quanly"
    return facility.register(id, request, db)

@router.post("/{id}/delete")
def delete_facility_by_id(id: int, request:request_data., db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete data in database "quanly"
    return facility.delete(id, request, db)


@router.post("/{id}/update")
def update_facility_by_id(id: int, request:request_data., db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete old district in "quanly"
    # create data in database "quanly"
    return facility.update(id, request, db)


