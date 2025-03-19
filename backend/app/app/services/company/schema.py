from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from fastapi_query.filtering import BaseFilterParams
from pydantic import BaseModel, HttpUrl

class CompanyBaseCreate(BaseModel):
    # name: str
    name: str
    email: str
    website: Optional[str] = None
    phone: Optional[str] = None
    is_active: Optional[bool] = True  # Defaulting to True
    description: Optional[str] = None  # Allow null descriptions

    class Config:
        from_attributes = True  # Replaces `orm_mode` in Pydantic v2

class CompanyBasedUpdate(BaseModel):
    website: Optional[str] = None
    phone: Optional[str] = None
    description: Optional[str] = None  # Allow null descriptions
    reg_no : Optional[str] = None
    longitude : Optional[str] = None
    latitude : Optional[str] = None
    address : Optional[str] = None
    city : Optional[str] = None
    state : Optional[str] = None
    country : Optional[str] = None
    zip_code : Optional[str] = None
    logo:  Optional[str] = None
    working_hours : Optional[str] = None
    
class CompanyBaseResponse(BaseModel):
    id: Optional[int] = None
    name : Optional[str] = None
    website : Optional[str] = None
    phone : Optional[str] = None
    is_active : Optional[int] = 0
    created_at  : Optional[datetime] = None
    updated_at  : Optional[datetime] = None
    tenant_description: Optional[str] = None
    currency_code: Optional[str] = None
    # api_key: Optional[str] = None
    logo: Optional[str] = None
    working_hours: Optional[str] = None