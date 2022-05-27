from fastapi import APIRouter, status, HTTPException
from app.util import request_data
from sqlalchemy.orm import Session, joinedload
from app.model import models, hashing
from app.util.special_value import UserType


def get_all(db: Session):
    """
        Return: list contains all users
        """
    facilities = db.query(models.Facility).options(
        joinedload(models.Facility.in_district).joinedload(models.District.province)).all()
    if not facilities:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No facility in data")
    return facilities


def create(request: request_data.FacilityCreate, db: Session):
    # check valid district id
    district = db.query(models.District).filter(models.District.id == request.district_id).first()
    if district:
        # create facility
        facility = models.Facility(name=request.name,
                                   type=request.type,
                                   district_id=request.district_id,
                                   phone_number=request.phone_number)
        db.add(facility)
        db.commit()
        db.refresh(facility)
        return {"detail": "Create facility successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"ERROR : Invalid district id")


def delete(id: int, db: Session):
    """
    Param id: Facility id.
    Return: action status
    """
    # check valid id
    if id > 0:
        user = db.query(models.Facility).filter(models.Facility.id == id).first()
        # check Facility with id is in database
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Facility id {id} not found")
        else:
            # delete Facility
            db.query(models.Facility).filter(models.Facility.id == id).delete(synchronize_session="fetch")
            db.commit()
            return {"detail": "delete successfully"}
    else:
        raise HTTPException(detail="Invalid id")


def update(request: request_data.FacilityUpdate, db: Session):
    # chech facility id is in database
    facility = db.query(models.Facility).filter(models.Facility.id == request.id).first()
    if facility is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Facility id {id} not found")
    else:
        # update facility
        facility_query = db.query(models.Facility).filter(models.Facility.id == request.id)
        msg = "update "
        if request.type is not None:
            facility_query.update({models.Facility.type: request.type},
                                  synchronize_session="fetch")
            db.commit()
            msg += "type "
        if request.phone_number is not None:
            facility_query.update({models.Facility.phone_number: request.phone_number},
                                  synchronize_session="fetch")
            db.commit()
            msg += "phone number "
        if request.district_id is not None:
            district = db.query(models.District).filter(models.District.id == request.district_id).first()
            if district is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail=f"District id invalid")
            else:
                facility_query.update({models.Facility.district_id: request.district_id},
                                      synchronize_session="fetch")
                db.commit()
                msg += "district "
        if request.name is not None:
            facility_query.update({models.Facility.name: request.name},
                                  synchronize_session="fetch")
            db.commit()
            msg += "name "
        msg += "successfully."
        return {"detail": msg}


def certificate_in_db(id: int, db) -> bool:
    # if id == -1:
    #     return True
    certificate = db.query(models.Certificate).filter(models.Certificate.id == id).first()
    if certificate:
        return True
    else:
        return False
