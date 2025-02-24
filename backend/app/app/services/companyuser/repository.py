"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""
from typing import List
from sqlalchemy import and_, func, select
from fastapi_query.ext.sqlalchemy import (
    paginate_async as paginate
)
from fastapi_query.pagination import PaginationParams
from services.users.model import User
from db.database import get_db
from services.companyuser.model import CompanyUser
from fastapi_query.pagination.utils import prepare_response
from sqlalchemy import cast
from sqlalchemy.dialects.postgresql import UUID
from uuid import UUID as PyUUID

class CompanyUserRepository:
    """Repository responsible for performing operations (CRUD, etc) on Tenant_Users table."""

    def __init__(self) -> None:
        # self.db: Session = get_db()
        pass

    async def create(self, tenant_user: CompanyUser) -> CompanyUser:
        """
        This method is responsible for creating a new tenant_user object.

        :return: the tenant_user object
        """        
        async for session in get_db():
            async with session.begin():
                session.add(tenant_user)
            await session.commit()
            await session.refresh(tenant_user)
        return tenant_user
    
    async def get(self, tenant_user: CompanyUser) -> CompanyUser:
        """
        This method is returns a Tenant_User object.
        param: id

        :return: the Tenant_User object
        """
        async for session in get_db():
            return await session.get(CompanyUser, tenant_user.id)
        
    async def get_by_tenant_user_id(self,tenant_user_id: int, tenant_id: int) -> CompanyUser:
        async for session in get_db():
            query = select(CompanyUser).filter(CompanyUser.id == tenant_user_id, CompanyUser.tenant_id == tenant_id)
            result = await session.execute(query)
            return result.scalars().first()

    
    async def update(self, tenant_user: CompanyUser) -> CompanyUser:        
        async for session in get_db():
            async with session.begin():
                updated_tenant_user = await session.merge(tenant_user)
                # await session.merge(Tenant_User)
            await session.commit()
            await session.refresh(updated_tenant_user)
        return updated_tenant_user
    

    async def list(self, filter_params, pagination_params: PaginationParams, order_by,tenant_id) -> List[CompanyUser]:
        async for session in get_db():
            async with session.begin():
                stmt = select(CompanyUser).where(CompanyUser.tenant_id == tenant_id)
                results = await paginate(
                    db=session,
                    model_class=CompanyUser,
                    stmt=stmt,
                    pagination_params=pagination_params,
                    filter_params=filter_params,    
                    ordering_params=order_by
                )
        return results
    
    async def delete(self, Tenant_User_id):
        async for session in get_db():
            async with session.begin():
                Tenant_User_to_delete = await session.get(CompanyUser, Tenant_User_id)
                if Tenant_User_to_delete is not None:
                # Delete the Tenant_User object
                    await session.delete(Tenant_User_to_delete)
        await session.commit()
    
    async def get_user_by_ids (self,tenant_id, user_ids):
        user_ids = [str(user_id) for user_id in user_ids]
        async for session in get_db():
            async with session.begin():
                stmt = select(CompanyUser).where(and_(CompanyUser.user_id.in_(user_ids),CompanyUser.tenant_id == tenant_id))
                result = await session.execute(stmt)
                resources_task = result.scalars().all()
        return resources_task
    
    async def update_bulk(self, users):
        async for session in get_db():
            async with session.begin():
                updated_users = []
                for user in users:
                    updated_user = await session.merge(user)
                    updated_users.append(updated_user)
                await session.commit()
        return updated_users
    
    async def get_tenant_user_detail(self, user_id: str) -> List[CompanyUser]:
        """
        Retrieves the CompanyUser objects associated with a specific user ID.

        :param user_id: The ID of the user
        :return: The list of CompanyUser objects associated with the user ID
        """
        try:
            # Ensure user_id is a valid UUID
            user_uuid = PyUUID(user_id, version=4)  # Validate and convert to UUID

            async for session in get_db():
                async with session.begin():
                    stmt = (
                        select(CompanyUser, User)
                        .join(User, cast(CompanyUser.user_id, UUID) == User.id)  # ✅ Correctly cast to UUID
                        .where(User.id == user_uuid)  # ✅ Ensure proper comparison
                    )
                    result = await session.execute(stmt)
                    return result.scalars().first()

        except ValueError:
            print(f"Invalid UUID format: {user_id}")
            return []
