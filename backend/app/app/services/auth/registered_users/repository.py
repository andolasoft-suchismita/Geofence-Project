from typing import List, Optional
# SQLAlchemy Imports
from fastapi import Depends
from sqlalchemy import select
# Own Imports
from db.database import get_db
from services.auth.registered_users.model import RegisteredUser
from fastapi_query.ext.sqlalchemy import (
    apply_filters,
    apply_ordering,
    paginate_async as paginate
)
from fastapi_query.filtering import Filter
from fastapi_query.pagination import Paginate, PaginationParams, Paginated




class RegisteredUserRepository:
    """Repository responsible for performing operations (CRUD, etc) on leads table."""

    def __init__(self) -> None:
        # self.db: Session = get_db()
        pass

    async def create(self, registerduser: RegisteredUser) -> RegisteredUser:
        """
        This method is responsible for creating a new lead object.

        :return: the lead object
        """
        # print("Lead param in repo", lead)
        async for session in get_db():
            async with session.begin():
                session.add(registerduser)
            await session.commit()
            await session.refresh(registerduser)
        return registerduser


    async def list(self, filter_params, pagination_params: PaginationParams, order_by) -> List[RegisteredUser]:
        async for session in get_db():
            async with session.begin():
                stmt = select(RegisteredUser)
                results = await paginate(
                    db=session,
                    model_class=RegisteredUser,
                    stmt=stmt,
                    pagination_params=pagination_params,
                    filter_params=filter_params,    
                    ordering_params=order_by
                )
        return results