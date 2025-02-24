from sqlalchemy import BigInteger, String, Boolean, DateTime, Text
from sqlalchemy.orm import mapped_column, declarative_base
from datetime import datetime
from db.database import Base 

class Company(Base):
    __tablename__ = 'company'

    id = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    created_at = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = mapped_column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    name = mapped_column(String(255))
    website = mapped_column(String(255))
    phone = mapped_column(String(255))
    is_active = mapped_column(Boolean)  # Changed from Integer to Boolean
    description = mapped_column(Text)  # Keep Text or use String(255) if needed
    reg_no = mapped_column(String(255))
    longitude = mapped_column(String(255))
    latitude = mapped_column(String(255))
    address = mapped_column(String(255))
    city = mapped_column(String(255))
    state = mapped_column(String(255))
    country = mapped_column(String(255))
    zip_code = mapped_column(String(255))
    
    

