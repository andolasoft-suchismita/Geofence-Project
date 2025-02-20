from datetime import datetime
from typing import Optional
from pydantic import BaseModel, field_validator

class AddUserSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    hashed_password: str
    roletype: str
    designation: str
    doj: datetime
    dob: datetime

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
    doj: Optional[datetime] = None
    dob: Optional[datetime] = None

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
    doj: Optional[datetime] = None
    dob: Optional[datetime] = None

    @field_validator("doj", "dob", mode="before")
    def remove_timezone(cls, value):
        if isinstance(value, datetime) and value.tzinfo is not None:
            return value.replace(tzinfo=None)
        return value

    class Config:
        orm_mode = True
