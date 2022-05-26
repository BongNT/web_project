from fastapi import APIRouter, status, HTTPException
from app.util import request_data
from sqlalchemy.orm import Session, joinedload
from app.model import models,hashing
from app.util.special_value import UserType

def get_all(db: Session):
    pass

def register(request, db: Session):
    pass

def delete_by_id(id: int,db Session):
    pass

def update_by_id(id :int,request: ,db: Session):
    pass