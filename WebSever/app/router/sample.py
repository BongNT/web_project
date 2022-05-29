from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import sample
from typing import List


router = APIRouter(
    tags=["samples"],
    prefix="/samples"
)

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.Sample])
def get_all_samples(db: Session = Depends(database.get_db)):
    return sample.get_all(db)

@router.post("/create")
def create_sample( request:request_data.SampleCreate, db: Session = Depends(database.get_db)):
    return sample.create( request, db)

@router.delete("/{id}/delete")
def delete_sample_by_id(id: int, db: Session = Depends(database.get_db)):
    return sample.delete_by_id(id, db)


@router.put("/update")
def update_sample_by_id(request:request_data.SampleUpdate, db: Session = Depends(database.get_db)):
    return sample.update_by_id(request, db)


