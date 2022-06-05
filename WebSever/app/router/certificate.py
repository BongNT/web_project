from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.controller import certificate, oauth2
from app.model import database
from app.util import request_data, response_data

router = APIRouter(
    tags=["certificates"],
    prefix="/certificates",

)


# @router.get('/test', status_code=status.HTTP_200_OK)
# def test(db: Session = Depends(database.get_db)):
#     return certificate.auto_update_status(db)


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[response_data.Certificate])
def get_all_certificates(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return certificate.get_all(db, current_user)


@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_certificates(request: request_data.CertificateCreate, db: Session = Depends(database.get_db),
                        current_user=Depends(oauth2.get_current_user)):
    return certificate.create(request, db, current_user)


@router.delete("/{id}/delete", status_code=status.HTTP_200_OK)
def delete_certificate_by_id(id: int, db: Session = Depends(database.get_db),
                             current_user=Depends(oauth2.get_current_user)):
    return certificate.delete_by_id(id, db, current_user)


@router.put("/update", status_code=status.HTTP_200_OK)
def update_certificate_by_id(request: request_data.CertificateUpdate, db: Session = Depends(database.get_db),
                             current_user=Depends(oauth2.get_current_user)):
    return certificate.update_by_id(request, db, current_user)

@router.get("/statistic", status_code=status.HTTP_200_OK)
def get_statistic( db: Session = Depends(database.get_db),
                             current_user=Depends(oauth2.get_current_user)):
    return certificate.statistic( db, current_user)