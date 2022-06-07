from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.controller import user_information, oauth2
from app.model import database
from app.util import request_data, response_data

router = APIRouter(
    tags=["User Information"],
    prefix="/me"
)


@router.get('/info/', status_code=status.HTTP_200_OK, response_model=response_data.UserInformation)
def get_info(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return user_information.get_info(db, current_user)


@router.get('/info/districts', status_code=status.HTTP_200_OK)
def get_districts(current_user=Depends(oauth2.get_current_user)):
    return user_information.get_districts(current_user)


@router.put('/info/update', status_code=status.HTTP_200_OK)
def get_info(request: request_data.UserInformationUpdate, db: Session = Depends(database.get_db),
             current_user=Depends(oauth2.get_current_user)):
    return user_information.update_info(request, db, current_user)

@router.put('/password/update', status_code=status.HTTP_200_OK)
def update_password(request: request_data.ChangePassword, db: Session = Depends(database.get_db),
             current_user=Depends(oauth2.get_current_user)):
    return user_information.update_password(request, db, current_user)