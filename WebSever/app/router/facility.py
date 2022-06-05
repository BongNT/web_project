from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.controller import facility, oauth2
from app.model import database
from app.util import request_data, response_data

router = APIRouter(
    tags=["facilities"],
    prefix="/facilities",
)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.Facility])
def get_all_facilities(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return facility.get_all(db, current_user)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_facilities(request: request_data.FacilityCreate, db: Session = Depends(database.get_db),
                        current_user=Depends(oauth2.get_current_user)):
    return facility.create(request, db, current_user)


@router.delete("/{id}/delete", status_code=status.HTTP_200_OK)
def delete_facility_by_id(id: int, db: Session = Depends(database.get_db),
                          current_user=Depends(oauth2.get_current_user)):
    return facility.delete(id, db, current_user)


@router.put("/update", status_code=status.HTTP_200_OK)
def update_facility_by_id(request: request_data.FacilityUpdate, db: Session = Depends(database.get_db),
                          current_user=Depends(oauth2.get_current_user)):
    return facility.update(request, db, current_user)
