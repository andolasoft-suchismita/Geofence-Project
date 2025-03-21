from sqlalchemy import BigInteger, Column, Integer, String, Boolean, DateTime, ForeignKey, Date, Time
from sqlalchemy.orm import relationship
from datetime import datetime
from db.database import Base


class CompanyEvent(Base):
    __tablename__ = "company_event"  # Table name in the database

    id = Column(BigInteger, primary_key=True, index=True)
    company_id = Column(BigInteger, ForeignKey("company.id"), nullable=False)
    event_name = Column(String, nullable=False)  # Title of the event
    event_date = Column(Date, nullable=False)  # Date of the event
    start_time = Column(Time, nullable=False)  # Start time of the event
    end_time = Column(Time, nullable=False)  # End time of the event
    event_type = Column(String, nullable=False)  # Type of event (Meeting, Training, etc.)
    description = Column(String, nullable=True)  # Brief details about the event
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)