from typing import List, Optional
from fastapi import APIRouter, Query, status, Depends

from services.auth.registered_users.schema import RegisteredusersBaseCreate, RegisteredusersBaseResponse, RegisteredusersFilter
from services.auth.registered_users.service import RegisteredUserService
from fastapi_query.ext.sqlalchemy import (
    apply_filters,
    apply_ordering,
    paginate_async as paginate
)
from fastapi_query.filtering import Filter
from fastapi_query.pagination import Paginate, PaginationParams, Paginated





Registered_UsersRouter = APIRouter(prefix = "/pre-register",tags=["Pre-Register"])

@Registered_UsersRouter.post("/", description="Create a lead")
async def create(
    registered_user: RegisteredusersBaseCreate,
    registered_userService: RegisteredUserService = Depends(),
):
    return await registered_userService.create(registered_user)

@Registered_UsersRouter.get(
    path="/",
    response_model=Paginated[RegisteredusersBaseResponse]
)
async def list(        
        filter_params: RegisteredusersFilter = Filter(RegisteredusersFilter),
        pagination_params: PaginationParams = Paginate(),
        order_by: Optional[str] = Query(default=None),
        registered_userService: RegisteredUserService = Depends()
):
    
    return await registered_userService.list_registeredusers(filter_params, pagination_params, order_by)

