from typing import Optional
from fastapi import APIRouter, Query, Depends
from fastapi_query.pagination import Paginate, PaginationParams
from services.auth.manager import current_active_user
from services.users.service import UserService
from services.users.model import User
from fastapi_query.pagination import Paginate, PaginationParams

UserRouter = APIRouter(prefix = "/users",tags=["User-Management"])

@UserRouter.get("/tenants",
                description= "Get the list of tenants a details associated with user"
                )

async def get_all_tenant(
        pagination_params: PaginationParams = Paginate(),
        order_by: Optional[str] = Query(default=None),
        current_user : User = Depends(current_active_user),
        user_service: UserService = Depends(),
):
    return await user_service.list_tenant(current_user.id)