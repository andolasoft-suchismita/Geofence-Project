
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel

from services.company.schema import CompanyBaseResponse


class UserTenantsBaseRespone(BaseModel):
    user_id: Optional[UUID] = None
    tenants: List[CompanyBaseResponse] = []
    items: int  # Assuming this is the total number of items
    meta: Optional[dict] = None