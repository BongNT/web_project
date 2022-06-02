from fastapi import APIRouter, Depends, status
from app.util import request_data, response_data
from sqlalchemy.orm import Session
from app.model import database
from typing import List
from app.controller import user_information, oauth2

router = APIRouter(
    tags=["User Information"],
    prefix="/me/info"
)

@router.get('/', status_code=status.HTTP_200_OK, response_model=response_data.UserInformation)
def get_info(db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return user_information.get_info(db, current_user)

@router.get('/districts', status_code=status.HTTP_200_OK)
def get_districts(current_user=Depends(oauth2.get_current_user)):
    return user_information.get_districts( current_user)

@router.get('/update', status_code=status.HTTP_200_OK)
def get_info(request: request_data.UserInformationUpdate, db: Session = Depends(database.get_db), current_user=Depends(oauth2.get_current_user)):
    return user_information.update_info(request, db, current_user)