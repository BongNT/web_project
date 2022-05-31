from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import manager, oauth2
from typing import List

router = APIRouter(
    tags=["managers"],
    prefix="/managers",
    dependencies=[Depends(oauth2.get_current_admin)]
)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.UserDistrict])
def get_all_managers(db: Session = Depends(database.get_db)):
    return manager.get_all(db)


@router.post("/register_district")
def register_district(request: request_data.DistrictRegister, db: Session = Depends(database.get_db)):
    return manager.register_district(request, db)


@router.delete("/delete_district")
def delete_district(request: request_data.DistrictRegister, db: Session = Depends(database.get_db)):
    return manager.delete_district(request, db)


@router.put("/update_district")
def update_district(request: request_data.DistrictUpdate, db: Session = Depends(database.get_db)):
    return manager.update_district(request, db)
