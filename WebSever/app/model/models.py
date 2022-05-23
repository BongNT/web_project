from unicodedata import name
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

"""
SQLAlchemy uses the term "model" to refer to these classes and instances that interact with the database.
"""

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

Base = declarative_base()


class District(Base):
    __tablename__ = "huyen"
    id = Column("id_huyen", primary_key=True)
    name = Column("tenhuyen", String)
    province_id = Column("id_thanhpho", String)
    managers = relationship("User", secondary='quanly', back_populates='districts')


class User(Base):
    __tablename__ = "user"
    id = Column("id_user", Integer, primary_key=True)
    name = Column("username", String)
    password = Column("password", String)
    email = Column("email", String)
    type = Column("type", Integer)
    districts = relationship("District", secondary='quanly', back_populates='managers')

class Manager(Base):
    __tablename__ = "quanly"
    user_id = Column("id_user", Integer, ForeignKey("user.id_user"), primary_key=True)
    district_id = Column("id_huyen", String, ForeignKey("huyen.id_huyen"), primary_key=True)


class Province(Base):
    __tablename__ = "thanhpho"
    id = Column("id_thanhpho", String, primary_key=True)
    name = Column("tenthanhpho", String)

class Facility(Base):
    __tablename__ = "coso"
    id = Column("id_coso", Integer, primary_key=True)
    name = Column
    type
    district_id
    phone_number
    certificate_id




