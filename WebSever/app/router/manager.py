from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.controller import manager, oauth2
from app.model import database
from app.util import request_data, response_data

router = APIRouter(
    tags=["managers"],
    prefix="/managers",
)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.UserDistrict])
def get_all_managers(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_admin)):
    return manager.get_all(db)


@router.get('/districts', status_code=status.HTTP_200_OK, response_model=List[response_data.DistrictProvince])
def get_list_districts(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return manager.get_districts(db, current_user)


@router.post("/register_district", status_code=status.HTTP_201_CREATED)
def register_district(request: request_data.DistrictRegister, db: Session = Depends(database.get_db),
                      current_user=Depends(oauth2.get_current_admin)):
    return manager.register_district(request, db)


@router.delete("/delete_district", status_code=status.HTTP_200_OK)
def delete_district(request: request_data.DistrictRegister, db: Session = Depends(database.get_db),
                    current_user=Depends(oauth2.get_current_admin)):
    return manager.delete_district(request, db)


@router.put("/update_district", status_code=status.HTTP_200_OK)
def update_district(request: request_data.DistrictUpdate, db: Session = Depends(database.get_db),
                    current_user=Depends(oauth2.get_current_admin)):
    return manager.update_district(request, db)
