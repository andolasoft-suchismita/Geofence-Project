from pydantic import BaseModel, Field, ConfigDict
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
    date: datetime.date
    check_in: Optional[datetime.time] = None
    status: Optional[AttendanceStatus] = AttendanceStatus.FULL_DAY 

    model_config = ConfigDict(from_attributes=True)  # ✅ Ensures compatibility with ORM

class AttendanceUpdateSchema(BaseModel):
    """
    Schema for updating an attendance record. All fields are optional.
    """
    check_out: Optional[datetime.time] = None

    model_config = ConfigDict(from_attributes=True)  # ✅ Ensures compatibility with ORM

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

    model_config = ConfigDict(from_attributes=True)  # ✅ Ensures compatibility with ORM
