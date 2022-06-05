from fastapi import status, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.model import models
from app.util import request_data
from app.util.special_value import UserType


def get_all(db: Session, current_user):
    """
    Return: list contains all inspection
    """
    inspection = db.query(models.Inspection)
    if current_user.type == UserType.MANAGER.value:
        list_district = []
        for i in current_user.districts:
            list_district.append(i.id)
        inspection = inspection.join(models.Inspection.facility_inspection).join(models.Facility.in_district).filter(
            models.District.id.in_(list_district)).all()
    else:
        inspection = inspection.options(joinedload(models.Inspection.facility_inspection)).all()
    if not inspection:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="No inspection in data")
    return inspection


def create(request: request_data.InspectionCreate, db: Session, current_user):
    """
    The starting date and end is not in the range of other inspections with the same facility
    """
    # check valid facility id
    facility = db.query(models.Facility)
    if current_user.type == UserType.MANAGER.value:
        list_district = []
        for i in current_user.districts:
            list_district.append(i.id)
        facility = facility.join(models.Facility.in_district).filter(models.District.id.in_(list_district),
                                                                     models.Facility.id == request.facility_id).first()
    else:
        facility = facility.filter(models.Facility.id == request.facility_id).first()

    if not facility:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Not found facility id {request.facility_id}")
    else:
        inspections = db.query(models.Inspection) \
            .filter(models.Inspection.facility_id == request.facility_id).all()
        if len(inspections) > 0:
            for i in inspections:
                if i.start_date <= request.end_date <= i.end_date or i.start_date <= request.start_date <= i.end_date:
                    raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                        detail=f"This facility has inspection from {i.start_date} to {i.end_date}")

        # create
        new_inspection = models.Inspection(facility_id=request.facility_id, result=request.result,
                                           start_date=request.start_date, end_date=request.end_date)
        db.add(new_inspection)
        db.commit()
        db.refresh(new_inspection)
        return {"detail": "Create inspection successfully"}


def delete_by_id(id: int, db: Session, current_user):
    if id > 0:
        inspection = db.query(models.Inspection)
        if current_user.type == UserType.MANAGER.value:
            list_district = []
            for i in current_user.districts:
                list_district.append(i.id)
            inspection = inspection.join(models.Inspection.facility_inspection).join(
                models.Facility.in_district).filter(models.District.id.in_(list_district),
                                                    models.Inspection.id == id).first()
        else:
            inspection = inspection.filter(models.Inspection.id == id).first()
        # check inspection with id is in database
        if inspection is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Inspection id not found")
        else:
            # delete inspection
            db.query(models.Inspection).filter(models.Inspection.id == id).delete(synchronize_session=False)
            db.commit()
            return {"detail": "delete successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid id")


def update_by_id(request: request_data.InspectionUpdate, db: Session, current_user):
    inspection_query = db.query(models.Inspection).filter(models.Inspection.id == request.id)
    inspection = db.query(models.Inspection)
    if current_user.type == UserType.MANAGER.value:
        list_district = []
        for i in current_user.districts:
            list_district.append(i.id)
        inspection = inspection.join(models.Inspection.facility_inspection).join(
            models.Facility.in_district).filter(models.District.id.in_(list_district),
                                                models.Inspection.id == request.id).first()
    else:
        inspection = inspection.filter(models.Inspection.id == request.id).first()
    msg = "update "
    if not inspection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid id")
    else:
        if request.result is not None:
            inspection_query.update({models.Inspection.result: request.result}, synchronize_session="fetch")
            db.commit()
            msg += "Result "
        inspections = db.query(models.Inspection) \
            .filter(models.Inspection.facility_id == inspection.facility_id, models.Inspection.id != request.id).all()
        if len(inspections) > 0:
            for i in inspections:
                if request.start_date is not None:
                    if i.start_date <= request.start_date <= i.end_date:
                        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                            detail=f"This facility has inspection from {i.start_date} to {i.end_date}")
                if request.end_date is not None:
                    if i.start_date <= request.end_date <= i.end_date:
                        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                            detail=f"This facility has inspection from {i.start_date} to {i.end_date}")
            if request.start_date is not None:
                inspection_query.update({models.Inspection.start_date: request.start_date}, synchronize_session="fetch")
                db.commit()
                msg += "Starting date "
            if request.end_date is not None:
                inspection_query.update({models.Inspection.end_date: request.end_date}, synchronize_session="fetch")
                db.commit()
                msg += "End date "
        msg += "successfully."
        return {"detail": msg}
