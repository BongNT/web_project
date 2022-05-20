from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    id_user = Column(Integer, primary_key=True)
    name_user = Column(String)
    password = Column(String)
    email = Column(String)
    type = Column(Integer)