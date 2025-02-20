"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""
from typing import Optional
import uuid
from fastapi import HTTPException,status
from fastapi_users import schemas
import re
from typing import Optional
from pydantic import BaseModel, validator

class UserRead(schemas.BaseUser[uuid.UUID]):
    pass


class UserCreate(schemas.BaseUserCreate):
    invite_token: Optional[str] = None # For invite user
    first_name : Optional[str] = None 
    last_name : Optional[str] = None
    

    @validator("password")
    def password_complexity(cls, v):
        # Length Requirement
        if len(v) < 8 or len(v) > 30:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be between 8 and 30 characters long")

        # Complexity Requirement
        if not re.search(r"[A-Z]", v) or not re.search(r"[a-z]", v) or not re.search(r"\d", v) or not re.search(r"\W", v):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character")

        # No Sequential Characters
        # if re.search(r"123|234|345|456|567|678|789", v):
        #     raise HTTPException(status_code=400, detail="Password cannot contain sequential numbers")

        # if re.search(r"abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz", v, re.IGNORECASE):
        #     raise HTTPException(status_code=400, detail="Password cannot contain sequential letters")

        # No Repeating Characters
        # if re.search(r"(.)\1{2,}", v):
        #     raise HTTPException(status_code=400, detail="Password cannot contain repeating characters")

        return v



class UserUpdate(schemas.BaseUserUpdate):
    pass

class UserPasswordUpdate(BaseModel):
    current_password: str
    new_password: str

    @validator("new_password")
    def password_complexity(cls, v):
        # Length Requirement
        if len(v) < 8 or len(v) > 30:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must be between 8 and 30 characters long")

        # Complexity Requirement
        if not re.search(r"[A-Z]", v) or not re.search(r"[a-z]", v) or not re.search(r"\d", v) or not re.search(r"\W", v):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character")

        return v

