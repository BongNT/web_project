from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.controller import sample, oauth2
from app.model import database
from app.util import request_data, response_data

router = APIRouter(
    tags=["samples"],
    prefix="/samples",
)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.Sample])
def get_all_samples(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return sample.get_all(db, current_user)


@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_sample(request: request_data.SampleCreate, db: Session = Depends(database.get_db),
                  current_user=Depends(oauth2.get_current_user)):
    return sample.create(request, db, current_user)


@router.delete("/{id}/delete", status_code=status.HTTP_200_OK)
def delete_sample_by_id(id: int, db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return sample.delete_by_id(id, db, current_user)


@router.put("/update", status_code=status.HTTP_200_OK)
def update_sample_by_id(request: request_data.SampleUpdate, db: Session = Depends(database.get_db),
                        current_user=Depends(oauth2.get_current_user)):
    return sample.update_by_id(request, db, current_user)
