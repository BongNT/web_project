from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.controller import authentication
from app.model import database

router = APIRouter(
    tags=["authentication"]
)


@router.post('/login', status_code=status.HTTP_202_ACCEPTED)
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    return authentication.login(request, db)


@router.post('/logout')
def logout():
    return 1
