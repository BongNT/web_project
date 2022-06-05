from fastapi import status, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.model import models
from app.util import request_data
from app.util.special_value import UserType


def get_all(db: Session, current_user):
    samples = db.query(models.Sample)
    if current_user.type == UserType.MANAGER.value:
        list_district = []
        for i in current_user.districts:
            list_district.append(i.id)
        samples = samples.join(models.Sample.in_inspection).join(models.Inspection.facility_inspection).join(
            models.Facility.in_district).filter(models.District.id.in_(list_district)).all()
    else:
        samples = samples.options(joinedload(models.Sample.in_inspection, innerjoin=True)).all()

    if not samples:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No sample in data")
    return samples


def create(request: request_data.SampleCreate, db: Session, current_user):
    # check valid inspection id
    inspection = db.query(models.Inspection)

    if current_user.type == UserType.MANAGER.value:
        list_district = []
        for i in current_user.districts:
            list_district.append(i.id)
        inspection = inspection.join(models.Inspection.facility_inspection).join(models.Facility.in_district) \
            .filter(models.Inspection.id == request.inspection_id,
                    models.Facility.district_id.in_(list_district)).first()
    else:
        inspection = inspection.filter(models.Inspection.id == request.inspection_id).first()

    if inspection is not None:
        # the result date must be greater than starting date of inspection
        if inspection.start_date <= request.result_date:
            try:
                new_sample = models.Sample(id=request.id, inspection_id=request.inspection_id,
                                           inspection_agency=request.inspection_agency, status=request.status
                                           , result_date=request.result_date, result=request.result)
                db.add(new_sample)
                db.commit()
                db.refresh(new_sample)
                return {"detail": "Create sample successfully"}
            except:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                    detail=f"Sample id already registered.")
        else:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                                detail=f"the result date must be greater than starting date of inspection")
    else:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail=f"Invalid inspection id")


def delete_by_id(id: int, db: Session, current_user):
    if id > 0:
        sample = db.query(models.Sample)
        # check sample with id is in database
        if current_user.type == UserType.MANAGER.value:
            list_district = []
            for i in current_user.districts:
                list_district.append(i.id)
            sample = sample.join(models.Sample.in_inspection).join(models.Inspection.facility_inspection) \
                .join(models.Facility.in_district).filter(models.District.id.in_(list_district)).filter(
                models.Sample.id == id, models.Facility.district_id.in_(list_district)).first()
        else:
            sample = sample.filter(models.Sample.id == id).first()

        if sample is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Sample id not found")
        else:
            # delete sample
            db.query(models.Sample).filter(models.Sample.id == id).delete(synchronize_session=False)
            db.commit()
            return {"detail": "delete successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid id")


def update_by_id(request: request_data.SampleUpdate, db: Session, current_user):
    sample_query = db.query(models.Sample).filter(models.Sample.id == request.id)
    # check valid id
    sample = db.query(models.Sample)
    if current_user.type == UserType.MANAGER.value:
        list_district = []
        for i in current_user.districts:
            list_district.append(i.id)
        sample = sample.join(models.Sample.in_inspection).join(models.Inspection.facility_inspection) \
            .join(models.Facility.in_district).filter(models.District.id.in_(list_district)) \
            .filter(models.Sample.id == request.id, models.Facility.district_id.in_(list_district)).first()
    else:
        sample = sample.filter(models.Sample.id == request.id).first()

    if sample is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Sample id not found")
    else:
        msg = "update "
        if request.result is not None:
            sample_query.update({models.Sample.result: request.result}, synchronize_session="fetch")
            db.commit()
            msg += "result "
        if request.result_date is not None:
            sample_query.update({models.Sample.result_date: request.result_date}, synchronize_session="fetch")
            db.commit()
            msg += "result date "
        if request.inspection_agency is not None:
            sample_query.update({models.Sample.inspection_agency: request.inspection_agency},
                                synchronize_session="fetch")
            db.commit()
            msg += "inspection agency "
        if request.status is not None:
            sample_query.update({models.Sample.status: request.status}, synchronize_session="fetch")
            db.commit()
            msg += "status "
        msg += "successfully."
        return {"detail": msg}
