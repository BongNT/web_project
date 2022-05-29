from fastapi import APIRouter, status, HTTPException
from app.util import request_data
from sqlalchemy.orm import Session, joinedload
from app.model import models,hashing
from app.util.special_value import UserType, CertificateStatus
from datetime import date

def get_all(db: Session):
    certificates = db.query(models.Certificate).options(joinedload(models.Certificate.facility)).all()
    if not certificates:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No certificate in data")
    return certificates

def create(request: request_data.CertificateCreate, db: Session):
    facility = db.query(models.Facility).filter(models.Facility.id == request.facility_id).first()
    if facility:
        # check duplicate in db
        try:
            new_certificate = models.Certificate(issue_date=request.issue_date, expiry_date=request.expiry_date,
                                                 status=CertificateStatus.VALID.value, facility_id=request.facility_id)
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
    if id > 0:
        certificate = db.query(models.Certificate).filter(models.Certificate.id == id).first()
        # check user with id is in database
        if certificate is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Certificate id {id} not found")
        else:
            # delete user
            db.query(models.Certificate).filter(models.Certificate.id == id).delete(synchronize_session="fetch")
            db.commit()
            return {"detail": "delete successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid id")

def update_by_id(request: request_data.CertificateUpdate,db: Session):
    certificate = db.query(models.Certificate).filter(models.Certificate.id == request.id).first()
    # check certificate in database
    if certificate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User id {request.id} not found")
    else:
        certificate_query = db.query(models.Certificate).filter(models.Certificate.id == request.id)
        msg = "update "
        if request.expiry_date is not None:
            # check valid expiry date
            if certificate.issue_date >= request.expiry_date:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail=f"Expiry date must be greater than issue date")
            certificate_query.update({models.Certificate.expiry_date: request.expiry_date}, synchronize_session="fetch")
            db.commit()
            msg += "expiry date "

        if request.status is not None:
            if request.status == CertificateStatus.REVOKED.value:
                certificate_query.update({models.Certificate.status: request.status}, synchronize_session="fetch")
                db.commit()
            else:
                today = date.today()
                if certificate.issue_date<= today <= certificate.expiry_date:
                    certificate_query.update({models.Certificate.status: CertificateStatus.VALID.value},
                                             synchronize_session="fetch")
                    db.commit()
                else:
                    certificate_query.update({models.Certificate.status: CertificateStatus.EXPIRED.value},
                                             synchronize_session="fetch")
                    db.commit()
            msg += "expiry date "
        msg += "successfully."
        return {"detail": msg}

def auto_update_status(db: Session):
    list_id = db.query(models.Certificate.id).all()
    res =[]
    # return list_id
    for i in list_id:
        res.append(update_status(i.id, db))
    return res

def update_status(id: int, db):
    certificate_query = db.query(models.Certificate).filter(models.Certificate.id == id)
    certificate = certificate_query.first()

    today = date.today()
    if today <= certificate.expiry_date:
        certificate_query.update({models.Certificate.status: CertificateStatus.VALID.value},
                                 synchronize_session="fetch")
        db.commit()
        return f"id '{id}' change {certificate.status} to valid-1"
    else:
        certificate_query.update({models.Certificate.status: CertificateStatus.EXPIRED.value},
                                 synchronize_session="fetch")
        db.commit()
        return f"id '{id}' change {certificate.status} to expired-0"

