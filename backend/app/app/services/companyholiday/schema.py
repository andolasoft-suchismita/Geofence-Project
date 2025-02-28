from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, field_validator


class CompanyHolidayBase(BaseModel):
    company_id: int  # Foreign key to the company
    holiday_name: str  # Name of the holiday
    holiday_date: date  # Date of the holiday
    is_recurring: bool = False  # True if the holiday repeats yearly

    @field_validator("holiday_date", mode="before")
    def validate_holiday_date(cls, value):
        """Ensure holiday date is a valid date and not in the past"""
        if isinstance(value, str):  # If input is a string, convert it to date
            value = datetime.strptime(value, "%Y-%m-%d").date()
        # if value < date.today():
        #     raise ValueError("Holiday date cannot be in the past")
        return value


class CompanyHolidayCreate(CompanyHolidayBase):
    """Schema for creating a new company holiday"""
    pass


class CompanyHolidayUpdate(BaseModel):
    """Schema for updating an existing company holiday"""
    holiday_name: Optional[str] = None
    holiday_date: Optional[date] = None
    is_recurring: Optional[bool] = None


class CompanyHolidayResponse(CompanyHolidayBase):
    """Schema for returning company holiday data"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Enables ORM mode for SQLAlchemy  
