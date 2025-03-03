from sqlalchemy import Column, Float, Integer, Date, Time, Enum, String
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base



class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    date = Column(Date, nullable=False)
    check_in = Column(Time, nullable=True)
    check_out = Column(Time, nullable=True)
    status = Column(String , nullable=False)
    latitude = Column(String, nullable=True)
    longitude = Column(String, nullable=True)
    longitude = Column(String, nullable=True)
