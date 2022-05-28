from fastapi import APIRouter, status, HTTPException
from app.util import request_data
from sqlalchemy.orm import Session, joinedload
from app.model import models,hashing
from app.util.special_value import UserType

def get_all(db: Session):
    certificates = db.query(models.Certificate).options(joinedload(models.Certificate.facility_certificate)).all()
    if not certificates:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No certificate in data")
    return certificates

def create(request: request_data.CertificateCreate, db: Session):
    facility = db.query(models.Facility).filter(models.Facility.id == request.facility_id).first()
    if facility:
        # check duplicate in db
        try:
            new_certificate = models.Certificate(issue_date=request.issue_date, expiry_date=request.expiry_date,
                                                 status=request.status, facility_id=request.facility_id)
            db.add(new_certificate)
            db.commit()
            db.refresh(new_certificate)
            return {"detail": "Create certificate successfully"}
        except:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail=f"Facility id {request.facility_id} has been registered")
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Facility id {request.facility_id} not found")

def delete_by_id(id: int, db: Session):
    pass

def update_by_id(id :int,request,db: Session):
    pass