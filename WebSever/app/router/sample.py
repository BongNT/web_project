from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import sample, oauth2
from typing import List


router = APIRouter(
    tags=["samples"],
    prefix="/samples",
)
@router.get('/test', status_code=status.HTTP_200_OK)
def get_all_samples(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return sample.get_all(db, current_user)

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.Sample])
def get_all_samples(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return sample.get_all(db, current_user)

@router.post("/create")
def create_sample(request:request_data.SampleCreate, db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return sample.create(request, db, current_user)

@router.delete("/{id}/delete")
def delete_sample_by_id(id: int, db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return sample.delete_by_id(id, db, current_user)


@router.put("/update")
def update_sample_by_id(request:request_data.SampleUpdate, db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return sample.update_by_id(request, db, current_user)


