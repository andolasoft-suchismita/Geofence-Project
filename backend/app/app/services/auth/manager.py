"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""
from datetime import datetime
import os
import re
import uuid
from typing import Optional, Union

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Request,status
from fastapi_users import BaseUserManager, FastAPIUsers, InvalidPasswordException, UUIDIDMixin, models, schemas
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from db.database import get_user_db
from services.users.model import User
from config.settings import settings


load_dotenv()

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = settings.JWT_SECRET_KEY
    verification_token_secret = settings.JWT_SECRET_KEY
    
    # async def create( self, user_create: schemas.BaseUserCreate, safe: bool = False, request: Optional[Request] = None, ) -> models.UserProtocol:
    #     """
    #     Override the create method to check for an invite token before creating a new user.
    #     If an invite token is present, verify it before creating the user.
    #     """

    #     # Check if the user has an invite token
    #     user_data = user_create.model_dump()
    #     invite_token, invite_email = user_data.get("invite_token"), user_data.get("email")
    #     if invite_token:
    #         await UserInvitationService().verify_invite_token(invite_token,invite_email)
    #     # Call the parent create method after successful verification
    #     return await super().create(user_create, safe, request)
    
    # async def on_after_register(self, user: User, request: Optional[Request] = None):
    #     registered_email = user.email
    #     # Check inivted user
    #     invite_token = user.invite_token
    #     if invite_token:
    #         # Verify user invitation and add to Tenant
    #         tenant = await UserInvitationService().verify_from_signup(user, invite_token)
    #         existing_invitation = await UserInvitationRepository().get_by_token(invite_token)
    #         role = existing_invitation.invite_role
    #     else: 
    #         # Create new Tenant and add User to Tenant
    #         tenant = await TenantService().create_from_user(user)
    #         organization = await OrganizationService().create_at_signup(user,tenant)
    #         await ResourceService().create_from_user(user, tenant)
    #         tenant_subscription = await Tenant_SubscriptionService().create_user_tenant_subscription(user)
    #         role = TenantUserTypeEnum.OWNER

    #     # Create an instance of WorkspaceNameDeterminer and determine workspace name
    #     workspace_name_determiner = WorkspaceNameDeterminer()
    #     workspace_name = workspace_name_determiner(registered_email) 
    #     workspace_repository = WorkspaceRepository()
    #     workspace_service = WorkspaceService(workspace_repository)
    #     workspace_body = WorkspaceBaseCreate(name=workspace_name,is_default=True)
    #     workspace = await workspace_service.create(workspace_body, tenant.id, user)
        

        
    #     # Get the first name or use the part before the '@' symbol in the email
    #     name = user.first_name if user.first_name else user.email.split('@')[0]
    #     user_role= await User_roleService().create_user_role(user, role,tenant)
    #     frontend_url = settings.FRONTEND_URL
    #     link = f"{frontend_url}signin"
    #     email_sender = EmailSender()
    #     email_sender.send_email(registered_email, "registration_template", {"link": link ,"name":name ,"subject":"Welcome to Orangescrum!"})

        
    
    # async def on_after_forgot_password(
    #     self, user: User, token: str, request: Optional[Request] = None
    # ):

    #     frontend_url = settings.FRONTEND_URL
    #     reset_link = f"{frontend_url}resetpassword?token={token}"
    #     template = "forget_password"
    #     # Get the first name or use the part before the '@' symbol in the email
    #     name = user.first_name if user.first_name else user.email.split('@')[0]

    #     email_sender = EmailSender()
    #     email_sender.send_email(user.email, template, {"link": reset_link,"name":name ,"subject": "Reset Your Orangescrum Password"})

    #     return f"Reset token {token} sent to {user.email}"

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def validate_password(
        self, password: str, user: Union[schemas.UC, models.UP]
    ) -> None:
        """
        Validate a password.

        *You should overload this method to add your own validation logic.*

        :param password: The password to validate.
        :param user: The user associated to this password.
        :raises InvalidPasswordException: The password is invalid.
        :return: None if the password is valid.
        """
        # Length Requirement
        if len(password) < 8 or len(password) > 30:
            raise InvalidPasswordException("Password must be between 8 and 30 characters long")

        # Complexity Requirement
        if not re.search(r"[A-Z]", password) or not re.search(r"[a-z]", password) or not re.search(r"\d", password) or not re.search(r"\W", password):
            raise InvalidPasswordException("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
        return  None


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="/v1/auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=settings.JWT_SECRET_KEY, lifetime_seconds = int(settings.ACCESS_TOKEN_EXPIRE_MINUTES) * 60)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active = True)

######### super user ########
current_super_user = fastapi_users.current_user(active = True,superuser = True)

