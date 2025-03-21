from sqlalchemy import BigInteger, Column, Integer, String, Boolean, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship
from datetime import datetime
from db.database import Base


class CompanyHoliday(Base):
    __tablename__ = "company_holiday"  # Table name in the database

    id = Column(BigInteger, primary_key=True, index=True)
    company_id = Column(BigInteger, ForeignKey("company.id"), nullable=False)
    holiday_name = Column(String, nullable=False)
    holiday_date = Column(Date, nullable=False)
    is_recurring = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String, nullable= True)
    holiday_type = Column(String, nullable=True)
    description = Column(String, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    

