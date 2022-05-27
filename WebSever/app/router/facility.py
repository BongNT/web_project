from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import facility
from typing import List

router = APIRouter(
    tags=["facilities"],
    prefix="/facilities"
)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.Facility])
def get_all_facilities(db: Session = Depends(database.get_db)):
    return facility.get_all(db)


@router.post("/register")
def register_facilities(request: request_data.FacilityCreate, db: Session = Depends(database.get_db)):
    return facility.create(request, db)


@router.post("/{id}/delete")
def delete_facility_by_id(id: int, db: Session = Depends(database.get_db)):
    return facility.delete(id, db)


@router.put("/update")
def update_facility_by_id(request: request_data.FacilityUpdate, db: Session = Depends(database.get_db)):
    return facility.update(request, db)
