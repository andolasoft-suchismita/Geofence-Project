"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""
from fastapi import APIRouter,HTTPException, status, Depends
from services.auth.manager import UserManager, current_active_user, get_user_manager
from services.auth.schema import UserPasswordUpdate
from services.users.model import User
from services.auth.manager import current_active_user
from fastapi_users.password import PasswordHelper
from services.users.repository import UserRepository
from fastapi.security import OAuth2PasswordRequestForm

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from services.users.model import User  # Ensure this is the correct path to your User model
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
)
from services.auth.manager import get_jwt_strategy


UserAuthRouter = APIRouter(tags=["User-Auth-Management"])

@UserAuthRouter.put("/v1/auth/change-password")
async def change_password(
    password_body: UserPasswordUpdate,
    current_user: User = Depends(current_active_user)
): 
    password_helper = PasswordHelper()
    # Get new password from request body
    current_password = password_body.current_password
    hashed_password = current_user.hashed_password

    is_valid, _ = password_helper.verify_and_update(current_password,hashed_password)
    if not is_valid:
        raise HTTPException( status_code=status.HTTP_400_BAD_REQUEST, detail="Current password is incorrect")
    
    new_password = password_body.new_password
    # validate password here
    
    new_hashed_password = password_helper.hash(new_password)
    current_user.hashed_password = new_hashed_password

    return await UserRepository.update(new_hashed_password,current_user)
