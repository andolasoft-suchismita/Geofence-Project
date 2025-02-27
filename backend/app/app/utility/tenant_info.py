import re
from fastapi import Request
from services.users.model import User 
from services.companyuser.model import CompanyUser
from services.company.model import Company
from sqlalchemy import select
from db.database import get_db

async def getTenantInfo(user_id, all_list=False) -> Company:
    async for session in get_db():
        async with session.begin():
            stmt_tenant = select(Company, User)\
                    .select_from(CompanyUser)\
                    .join(Company, CompanyUser.company_id == Company.id)\
                    .join(User, CompanyUser.user_id == User.id)\
                    .where(User.id == user_id)
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