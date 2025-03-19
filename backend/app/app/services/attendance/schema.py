from pydantic import BaseModel, Field, ConfigDict
import datetime
from typing import Dict, Optional
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
    # date: datetime.date
    check_in: Optional[datetime.time] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    # status: Optional[AttendanceStatus] = AttendanceStatus.FULL_DAY 

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
    id: Optional [int] = None
    user_id: UUID
    date: datetime.date
    check_in: Optional[datetime.time] = None
    check_out: Optional[datetime.time] = None
    status: AttendanceStatus
    name: Optional[str] = None
    working_hours: Optional[float] = None
    overtime: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)  # ✅ Ensures compatibility with ORM
    
class AttendanceReportSchema(BaseModel):
    """
    Schema for returning attendance details in API responses.
    """
    id: UUID  # ✅ User ID (Primary Key)
    employee_id: Optional[int] = None  # ✅ Employee ID (Unique)
    name: Optional[str] = None
    days_absent: Optional[int] = None
    half_days: Optional[int] = None
    deficit_hours: Optional[float] = None  # ✅ Fixed typo
    
    model_config = ConfigDict(from_attributes=True)  # ✅ Ensures compatibility with ORM
    
    
class AttendanceSummarySchema(BaseModel):
    """
    Schema for returning attendance summary in API responses.
    """
    total_employees: int  # ✅ Total number of employees in the company
    absentees_today: int  # ✅ Number of employees absent today
    late_comings_today: int  # ✅ Number of employees late today
    department_wise_attendance: Dict[str, Dict[str, int]]  # ✅ {Department: {Present, Absent}}
    overall_attendance: Dict[str, float]  # ✅ {"present": %, "absent": %}

    model_config = ConfigDict(from_attributes=True)  # ✅ Ensures ORM compatibility
