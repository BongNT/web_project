from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from app.controller import certificate, oauth2
from typing import List


router = APIRouter(
    tags=["certificates"],
    prefix="/certificates",
    dependencies=[Depends(oauth2.get_current_user)]
)


@router.get('/test', status_code=status.HTTP_200_OK)
def test(db: Session = Depends(database.get_db)):
    return certificate.auto_update_status(db)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.Certificate])
def get_all_certificates(db: Session = Depends(database.get_db)):
    return certificate.get_all(db)


@router.post("/create")
def create_certificates(request: request_data.CertificateCreate, db: Session = Depends(database.get_db)):
    return certificate.create(request, db)


@router.delete("/{id}/delete")
def delete_certificate_by_id(id: int, db: Session = Depends(database.get_db)):
    return certificate.delete_by_id(id, db)


@router.put("/update")
def update_certificate_by_id(request:request_data.DistrictRegister, db: Session = Depends(database.get_db)):
    return certificate.update_by_id(request, db)


