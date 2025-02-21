from typing import List, Optional
from pydantic import BaseModel
from fastapi_query.filtering import BaseFilterParams



class RegisteredusersBaseCreate(BaseModel):
    email : str
    is_converted : Optional[int]=None
    is_superuser: bool  

class RegisteredusersFilter(BaseFilterParams):
    id: Optional[int] = None
    id__in: Optional[List[int]] = None


class RegisteredusersBaseResponse(BaseModel):
    id : Optional[int]=None
    email  : Optional[str]=None
    is_converted : Optional[int]=None
    roletype: Optional[str] = None
