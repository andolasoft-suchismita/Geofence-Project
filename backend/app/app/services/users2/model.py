"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""
from typing import List
from sqlalchemy import BIGINT, CHAR, TIMESTAMP, Column, DateTime, Integer, String
from sqlalchemy.orm import Mapped, DeclarativeBase, mapped_column, relationship
from sqlalchemy.orm.base import Mapped
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyBaseOAuthAccountTableUUID
from datetime import datetime

# Base = declarative_base()
class Base(DeclarativeBase):
    pass


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass

from sqlalchemy import Column, String, Boolean, Text, BigInteger, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
import uuid

Base = declarative_base()

from sqlalchemy import Column, String, Boolean, Text, BigInteger, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
import uuid

Base = declarative_base()

class User2(Base):
    __tablename__ = "user"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    email = Column(String(320), unique=True, nullable=False)
    hashed_password = Column(String(1024), nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    is_superuser = Column(Boolean, nullable=False, default=False)
    is_verified = Column(Boolean, nullable=False, default=False)
    first_name = Column(String(255), nullable=True)
    last_name = Column(String(255), nullable=True)
    profile_image = Column(String(255), nullable=True)
    file_id = Column(BigInteger, nullable=True)
    created_at = Column(TIMESTAMP, nullable=False)
    updated_at = Column(TIMESTAMP, nullable=False)
    invite_token = Column(Text, nullable=True)
    time_zone = Column(String(100), nullable=True)
    time_format = Column(String(100), nullable=True)
    phone_number = Column(String(100), nullable=True)
    language = Column(String(100), nullable=True)
    source = Column(String(100), nullable=True)
    user_import_id = Column(BigInteger, nullable=True)

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email})>"

class OAuthAccount2(Base):
    __tablename__ = "oauth_account"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=True)
    oauth_name = Column(String(255), nullable=False)
    access_token = Column(Text, nullable=False)
    expires_at = Column(BigInteger, nullable=True)
    refresh_token = Column(Text, nullable=True)
    account_id = Column(String(255), nullable=False)
    account_email = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<OAuthAccount(id={self.id}, oauth_name={self.oauth_name})>"

