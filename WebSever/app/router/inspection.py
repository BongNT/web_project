from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.controller import inspection, oauth2
from app.model import database
from app.util import request_data, response_data

router = APIRouter(
    tags=["inspections"],
    prefix="/inspections",
)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.InspectionFacility])
def get_all_inspections(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return inspection.get_all(db, current_user)


@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_inspections(request: request_data.InspectionCreate, db: Session = Depends(database.get_db),
                       current_user=Depends(oauth2.get_current_user)):
    return inspection.create(request, db, current_user)


@router.delete("/{id}/delete", status_code=status.HTTP_200_OK)
def delete_inspection_by_id(id: int, db: Session = Depends(database.get_db),
                            current_user=Depends(oauth2.get_current_user)):
    return inspection.delete_by_id(id, db, current_user)


@router.put("/update", status_code=status.HTTP_200_OK)
def update_inspection_by_id(request: request_data.InspectionUpdate, db: Session = Depends(database.get_db),
                            current_user=Depends(oauth2.get_current_user)):
    return inspection.update_by_id(request, db, current_user)

@router.get("/suggest", status_code=status.HTTP_200_OK, response_model=List[response_data.Facility])
def suggest_facility(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return inspection.suggest_facility(db, current_user)