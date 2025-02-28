from pydantic import BaseModel, Field
import datetime
from typing import Optional
from uuid import UUID
from enum import Enum

class AttendanceStatus(str, Enum):  
    FULL_DAY = "full-day"
    HALF_DAY = "half-day"
    ABSENT = "absent"

class AttendanceSchema(BaseModel):
    """
    Schema for creating an attendance record.
    """
    user_id: UUID
    date: datetime.date
    check_in: Optional[datetime.time] = None
    check_out: Optional[datetime.time] = None
    status: AttendanceStatus

    class Config:
        from_attributes = True  # ✅ Fix the issue

class AttendanceUpdateSchema(BaseModel):
    """
    Schema for updating an attendance record. All fields are optional.
    """
    check_in: Optional[datetime.time] = None
    check_out: Optional[datetime.time] = None
    status: Optional[AttendanceStatus] = None

    class Config:
        from_attributes = True  # ✅ Fix the issue

class AttendanceResponseSchema(BaseModel):
    """
    Schema for returning attendance details in API responses.
    """
    id: int
    user_id: UUID
    date: datetime.date
    check_in: Optional[datetime.time] = None
    check_out: Optional[datetime.time] = None
    status: AttendanceStatus

    class Config:
        from_attributes = True  # ✅ Fix the issue
