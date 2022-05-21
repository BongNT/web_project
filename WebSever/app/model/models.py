from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    id = Column("id_user", Integer, primary_key=True)
    name = Column("name_user", String)
    password = Column("password", String)
    email = Column("email", String)
    type = Column("type", Integer)

# class District(Base):
#     __table__ = "huyen"



