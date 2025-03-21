"""
Copyright (c) 2024 AndolaSoft Inc
 
All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""
from typing import List
from sqlalchemy import BIGINT, CHAR, TIMESTAMP, Boolean, Column, DateTime, Integer, LargeBinary, String, Sequence, Text
from sqlalchemy.orm import Mapped, DeclarativeBase, mapped_column, relationship
from sqlalchemy.orm.base import Mapped
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyBaseOAuthAccountTableUUID
from datetime import datetime

employee_id_seq = Sequence('user_employee_id_seq')
 
# Base = declarative_base()
class Base(DeclarativeBase):
    pass
 
 
class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass
 
class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = 'user'
   
    invite_token = Column(String(255))
    first_name = Column(String(255))
    last_name = Column(String(255))
    profile_image = Column(String(255))
    file_id = Column(BIGINT, nullable=False)
    created_at = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    time_zone = Column(String(255))
    time_format = Column(String(255))
    phone_number = Column(String(255))
    language = Column(String(255))
    ##### rest item add here
    roletype = Column(String(255), nullable=True)
    designation = Column(String(255), nullable=True)
    doj = Column(TIMESTAMP, nullable=True)
    dob = Column(TIMESTAMP, nullable=True)
    address = Column(String(255), nullable=True)  # New address field
    employee_id = Column(Integer, server_default=employee_id_seq.next_value(), primary_key=False)
    gender = Column(String(50), nullable=True)
    marital_status = Column(String(50), nullable=True)
    blood_group = Column(String(10), nullable=True)
    emergency_contact = Column(String(255), nullable=True)
    employee_type = Column(String(255), nullable=True)
    department = Column(String(255), nullable=True)
    profile_pic = Column(Text, nullable=True)
    is_superuser = Column(Boolean, nullable=False, default=True)
    is_verified = Column(Boolean, nullable=False, default=True)
   
 
    oauth_accounts: Mapped[List[OAuthAccount]] = relationship(
        "OAuthAccount", lazy="selectin"
    )
 
class DeviceToken(Base):
    __tablename__ = 'os_devicetoken'
   
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(CHAR(36))
    device_id = Column(String(255))
    token = Column(String(255))
    tenant_id = Column(BIGINT(), nullable=False)
    status = Column(String(255), nullable=False)
    created_by = Column(CHAR(36))
    updated_by = Column(CHAR(36))
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
 
class TempMobileAuth(Base):
    __tablename__ = 'os_temp_mobile_auth'
   
    id = Column(Integer, primary_key=True, autoincrement=True)
    mobile_number = Column(String(15), nullable=False, unique=True)
    is_verified = Column(Integer, default=1)
    token = Column(String(1024))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    mail = Column(String(1024))
    otp = Column(String(10))
 