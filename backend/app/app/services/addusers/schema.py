from datetime import datetime, date
from typing import Optional
from fastapi import File, UploadFile
from pydantic import BaseModel, field_validator
from enum import Enum
from uuid import UUID


class CompanyDesignation(str, Enum):
    CEO = "ceo"
    CTO = "cto"
    CFO = "cfo"
    COO = "coo"
    CMO = "cmo"
    MANAGER = "manager"
    TEAM_LEAD = "team_lead"
    SENIOR_ENGINEER = "senior_engineer"
    SOFTWARE_ENGINEER = "software_engineer"
    JUNIOR_ENGINEER = "junior_engineer"
    HR_MANAGER = "hr_manager"
    RECRUITER = "recruiter"
    SALES_MANAGER = "sales_manager"
    MARKETING_MANAGER = "marketing_manager"
    INTERN = "intern"
    
    
class UserRoleType(str, Enum):
    ADMIN = "admin"
    USER = "user"


class AddUserSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    hashed_password: str
    roletype: UserRoleType = UserRoleType.USER
    designation: CompanyDesignation = CompanyDesignation.JUNIOR_ENGINEER
    doj: date
    dob: date
    gender: str
    employee_type: str

    @field_validator("doj", "dob", mode="before")
    def validate_date(cls, value):
        if isinstance(value, datetime):  # Convert datetime to date
            return value.date()
        return value

    class Config:
        orm_mode = True


class UpdateUserSchema(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    roletype: Optional[str] = None
    designation: Optional[str] = None
    doj: Optional[date] = None
    dob: Optional[date] = None
    gender: Optional[str] = None
    marital_status: Optional[str] = None
    blood_group: Optional[str] = None
    phone_number: Optional[str] = None
    emergency_contact: Optional[str] = None
    # email: Optional[str] = None
    address: Optional[str] = None
    department: Optional[str] = None
    profile_pic: Optional[str] = None
    
    @field_validator("doj", "dob", mode="before")
    def validate_date(cls, value):
        if isinstance(value, datetime):
            return value.date()
        return value

    class Config:
        orm_mode = True


class UserResponseSchema(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None 
    gender: Optional[str] = None
    marital_status: Optional[str] = None
    blood_group: Optional[str] = None
    emergency_contact: Optional[str] = None
    address: Optional[str] = None
    employee_id: Optional[int] = None
    company_name: Optional[str] = None
    designation: Optional[str] = None
    roletype: Optional[str] = None
    employee_type: Optional[str] = None
    department: Optional[str] = None
    doj: Optional[date] = None
    dob: Optional[date] = None
    profile_pic: Optional[str]=None
    
    # ✅ Convert datetime to date for both doj and dob
    @field_validator("doj", "dob", mode="before")
    def validate_date(cls, v):
        if isinstance(v, datetime):  # Ensure only date is returned
            return v.date()
        if v and isinstance(v, date) and v > date.today():
            raise ValueError("Date cannot be in the future")
        return v
    
    class Config:
        orm_mode = True
