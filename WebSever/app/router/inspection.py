from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import inspection
from typing import List


router = APIRouter(
    tags=["inspections"],
    prefix="/inspections"
)

@router.get('/', status_code=status.HTTP_200_OK,response_model=List[response_data.InspectionFacility])
def get_all_inspections(db: Session = Depends(database.get_db)):
    return inspection.get_all(db)

@router.post("/create")
def create_inspections( request:request_data.InspectionCreate, db: Session = Depends(database.get_db)):
    return inspection.create( request, db)

@router.delete("/{id}/delete")
def delete_inspection_by_id(id: int, db: Session = Depends(database.get_db)):
    return inspection.delete_by_id(id, db)


@router.put("/{id}/update")
def update_inspection_by_id(request: request_data.InspectionUpdate, db: Session = Depends(database.get_db)):
    return inspection.update_by_id(request, db)


