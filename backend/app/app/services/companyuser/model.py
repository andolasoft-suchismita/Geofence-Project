from sqlalchemy import BigInteger, ForeignKey, String, Boolean, DateTime, SmallInteger
from sqlalchemy.orm import mapped_column, declarative_base
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

Base = declarative_base()

class CompanyUser(Base):
    __tablename__ = 'company_user'
   
    id = mapped_column(BigInteger, primary_key=True, autoincrement=True)  # Changed from Integer to BigInteger
    created_at = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    company_id = mapped_column(BigInteger, nullable=False)  # Removed (20)
    approver_id = mapped_column(BigInteger)
    is_approver = mapped_column(Boolean)  # Changed from TINYINT(4) to Boolean
    user_id = mapped_column(UUID(as_uuid=True), nullable=False)
    user_type = mapped_column(String(50))
    status = mapped_column(String(50), default='active')  # Added default value

