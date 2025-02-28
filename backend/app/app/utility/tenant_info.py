import re
from fastapi import Request
from services.users.model import User 
from services.companyuser.model import CompanyUser
from services.company.model import Company
from sqlalchemy import select
from db.database import get_db
from uuid import UUID as PyUUID
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import cast

async def getTenantInfo(user_id, all_list=False) -> Company:
    async for session in get_db():
        async with session.begin():
            if isinstance(user_id, PyUUID):
                user_uuid = user_id
            else:
                user_uuid = PyUUID(str(user_id), version=4)  # Convert to valid UUID format

            stmt_tenant = select(Company, User)\
                    .select_from(CompanyUser)\
                    .join(Company, CompanyUser.company_id == Company.id)\
                    .join(User, cast(CompanyUser.user_id, UUID) == User.id) \
                    .where(User.id == user_uuid)
            result = await session.execute(stmt_tenant)
            if all_list:
                tenant = result.unique().scalars().all()    
            else:
                tenant = result.unique().scalars().first()
            
    return tenant

async def getTenantFromHeader(request:Request):
    if "X-TENANT-ID" in request.headers:
        tenant_id_header = request.headers["X-TENANT-ID"]
        return tenant_id_header
    else:
        return None