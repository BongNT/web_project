from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import certificate
from typing import List


router = APIRouter(
    tags=["certificates"],
    prefix="/certificates"
)

@router.get('/', status_code=status.HTTP_200_OK)
def get_all_certificates(db: Session = Depends(database.get_db)):
    return certificate.get_all(db)

@router.post("/create")
def create_certificates(request: request_data.CertificateCreate, db: Session = Depends(database.get_db)):

    return certificate.create(request, db)

@router.post("/{id}/delete")
def delete_certificate_by_id(id: int, db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete data in database "quanly"
    return certificate.delete_by_id(id, db)


@router.post("/{id}/update")
def update_certificate_by_id(id: int, request:request_data.DistrictRegister, db: Session = Depends(database.get_db)):
    # find manager by id
    # find district by id
    # delete old district in "quanly"
    # create data in database "quanly"
    return certificate.update_by_id(id, request, db)


