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

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.UserDistrict])
def get_all_samples(db: Session = Depends(database.get_db)):
    return sample.get_all(db)

@router.post("/create")
def create_sample( request:request_data., db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # create data in database "quanly"
    return sample.create( request, db)

@router.post("/{id}/delete")
def delete_sample_by_id(id: int, request:request_data., db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete data in database "quanly"
    return sample.delete(id, request, db)


@router.post("/{id}/update")
def update_sample_by_id(id: int, request:request_data., db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete old district in "quanly"
    # create data in database "quanly"
    return sample.update(id, request, db)


