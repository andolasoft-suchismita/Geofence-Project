from datetime import datetime
from typing import Optional
from pydantic import BaseModel, field_validator
from datetime import date
from enum import Enum


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
    
class AddUserSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    hashed_password: str
    roletype: str
    designation: CompanyDesignation=CompanyDesignation.JUNIOR_ENGINEER
    doj: date
    dob: date

    @field_validator("doj", "dob", mode="before")
    def remove_timezone(cls, value):
        if isinstance(value, datetime) and value.tzinfo is not None:
            return value.replace(tzinfo=None)  # Convert to naive datetime
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

    @field_validator("doj", "dob", mode="before")
    def remove_timezone(cls, value):
        if isinstance(value, datetime) and value.tzinfo is not None:
            return value.replace(tzinfo=None)
        return value

    class Config:
        orm_mode = True


class UserResponseSchema(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    roletype: Optional[str] = None
    designation: Optional[str] = None
    doj: Optional[date] = None
    dob: Optional[date] = None

    @field_validator("doj", "dob", mode="before")
    def remove_timezone(cls, value):
        if isinstance(value, datetime) and value.tzinfo is not None:
            return value.replace(tzinfo=None)
        return value

    class Config:
        orm_mode = True
