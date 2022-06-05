from fastapi import status, HTTPException
from sqlalchemy.orm import Session

from app.model import models
from app.util import request_data
from app.util.special_value import UserType


def get_districts(db: Session, current_user):
    if current_user.type == UserType.MANAGER.value:
        list_district = []
        for i in current_user.districts:
            list_district.append(i.id)
        return db.query(models.District).filter(models.District.id.in_(list_district)).all()
    else:
        return db.query(models.District).all()


def get_all(db: Session):
    """
    Return: list of manager user in database .If don't have any user, raise HTTPException
    """
    managers = db.query(models.User).filter(models.User.type == UserType.MANAGER.value).all()
    if not managers:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="Managers not found")
    else:
        return managers


def register_district(request: request_data.DistrictRegister, db: Session):
    # check valid manager id
    manager = db.query(models.User) \
        .filter(models.User.id == request.manager_id, models.User.type == UserType.MANAGER.value).first()
    if manager:
        # check valid district id
        district = db.query(models.District).filter(models.District.id == request.district_id).first()
        if district:
            # check this district in manager database
            registered_district = db.query(models.Manager) \
                .filter(models.Manager.district_id == request.district_id,
                        models.Manager.user_id == request.manager_id) \
                .first()
            if not registered_district:
                # create data in manager database
                new_manager_district = models.Manager(user_id=request.manager_id, district_id=request.district_id)
                db.add(new_manager_district)
                db.commit()
                db.refresh(new_manager_district)
                return {"detail": "Register district for manager successfully"}
            else:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                    detail="This manager has registered this district")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid District id")
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Manager id")


def delete_district(request: request_data.DistrictRegister, db: Session):
    manager = db.query(models.User) \
        .filter(models.User.id == request.manager_id, models.User.type == UserType.MANAGER.value).first()
    if manager:
        # check valid district id
        district = db.query(models.District).filter(models.District.id == request.district_id).first()
        if district:
            # check this district in manager database
            db.query(models.Manager) \
                .filter(models.Manager.district_id == request.district_id,
                        models.Manager.user_id == request.manager_id) \
                .delete(synchronize_session="fetch")
            db.commit()
            return {"detail": "Delete district for manager successfully"}

        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid District id")
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Manager id")


def update_district(request: request_data.DistrictUpdate, db: Session):
    # check valid manager id
    manager = db.query(models.User) \
        .filter(models.User.id == request.manager_id, models.User.type == UserType.MANAGER.value).first()
    if manager:
        # check valid district id
        district = db.query(models.District).filter(models.District.id == request.district_id).first()
        if district:
            # check this district in manager database
            registered_district = db.query(models.Manager) \
                .filter(models.Manager.district_id == request.district_id,
                        models.Manager.user_id == request.manager_id) \
                .first()
            if not registered_district:
                db.query(models.Manager) \
                    .filter(models.Manager.district_id == request.old_district_id,
                            models.Manager.user_id == request.manager_id) \
                    .update({models.Manager.district_id: request.district_id}, synchronize_session="fetch")
                db.commit()
                return {"detail": "Update district for manager successfully"}
            else:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                    detail="This manager has registered this district")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid District id")
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Manager id")
