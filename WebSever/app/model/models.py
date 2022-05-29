from unicodedata import name
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey,Date
from sqlalchemy.orm import relationship

"""
SQLAlchemy uses the term "model" to refer to these classes and instances that interact with the database.
"""

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

Base = declarative_base()



class User(Base):
    __tablename__ = "user"
    id = Column("id_user", Integer, primary_key=True)
    name = Column("username", String)
    password = Column("password", String)
    email = Column("email", String)
    type = Column("type", Integer)
    # set relationship
    districts = relationship("District", secondary='quanly', back_populates='managers')

class Manager(Base):
    __tablename__ = "quanly"
    user_id = Column("id_user", Integer, ForeignKey("user.id_user"), primary_key=True)
    district_id = Column("id_huyen", String, ForeignKey("huyen.id_huyen"), primary_key=True)

class District(Base):
    __tablename__ = "huyen"
    id = Column("id_huyen", primary_key=True)
    name = Column("tenhuyen", String)
    province_id = Column("id_thanhpho", String, ForeignKey("thanhpho.id_thanhpho") )
    # set relationship
    managers = relationship("User", secondary='quanly', back_populates='districts')
    province = relationship("Province", back_populates="districts")
    facilities = relationship("Facility", back_populates="in_district")

class Province(Base):
    __tablename__ = "thanhpho"
    id = Column("id_thanhpho", String, primary_key=True)
    name = Column("tenthanhpho", String)
    # set relationship
    districts = relationship("District", back_populates="province")

class Facility(Base):
    __tablename__ = "coso"
    id = Column("id_coso", Integer, primary_key=True)
    name = Column("ten", String)
    type = Column("loaihinh", Integer)
    district_id = Column("id_huyen", String, ForeignKey("huyen.id_huyen"))
    phone_number = Column("sdt", String)
    # set relationship
    in_district = relationship("District", back_populates="facilities")
    certificate = relationship("Certificate", back_populates="facility", uselist=False)
    inspections = relationship("Inspection", back_populates="facility_inspection")

class Inspection(Base):
    __tablename__ = "thanhtra"
    id = Column("id_thanhtra", Integer, primary_key=True)
    facility_id = Column("id_coso", Integer, ForeignKey("coso.id_coso"))
    result = Column("kq_kiemtra", String)
    start_date = Column("ngaybatdau", Date)
    end_date = Column("ngayketthuc", Date)
    # set relationship
    samples = relationship("Sample", back_populates="in_inspection")
    facility_inspection = relationship("Facility", back_populates="inspections")

class Certificate(Base):
    __tablename__ = "giaychungnhan"
    id = Column("id_giay", Integer, primary_key=True)
    issue_date = Column("ngaycap", Date)
    expiry_date = Column("ngayhethan", Date)
    status = Column("status", Integer)
    facility_id = Column("id_coso", Integer, ForeignKey("coso.id_coso"))
    # set relationship
    facility = relationship("Facility", back_populates="certificate", uselist=False)



class Sample(Base):
    __tablename__ = "mau"
    id = Column("id_mau", Integer, primary_key=True)
    inspection_id = Column("id_thanhtra",Integer, ForeignKey("thanhtra.id_thanhtra"))
    inspection_agency = Column("donvigiamdinh", Integer)
    status = Column("status", Integer)
    result_date = Column("ngaynhanKQ", Date)
    result = Column("ketqua", String)
    # set relationship
    in_inspection = relationship("Inspection", back_populates="samples")








