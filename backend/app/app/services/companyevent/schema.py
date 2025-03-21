from datetime import date, datetime, time
from typing import Optional
from pydantic import BaseModel, field_validator





class CompanyEventCreate(BaseModel):
    company_id: int
    event_name: str
    event_date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    event_type: Optional[str] = None
    description: Optional[str] = None


class CompanyEventResponse(CompanyEventCreate):
    id: int

    class Config:
        from_attributes = True
