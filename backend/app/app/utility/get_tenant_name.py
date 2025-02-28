from sqlalchemy import select
from db.database import get_db
from services.company.model import Company
from services.companyuser.model import CompanyUser
from services.users.model import User
from sqlalchemy.ext.asyncio import AsyncSession 


from sqlalchemy import cast
from sqlalchemy.dialects.postgresql import UUID
from uuid import UUID as PyUUID

from sqlalchemy import cast
from sqlalchemy.dialects.postgresql import UUID
from uuid import UUID as PyUUID

async def getTenantInfo(user_id, all_list=False) -> Company:
    """
    Retrieves the Company associated with a specific user ID.

    :param user_id: The ID of the user (can be a string or UUID)
    :param all_list: Whether to return all matching companies or just the first one
    :return: The Company object(s) associated with the user ID
    """
    try:
        # If user_id is already a UUID, use it directly, otherwise, convert it
        user_uuid = PyUUID(str(user_id), version=4) if not isinstance(user_id, PyUUID) else user_id

        # async for session in get_db():
        #     async with session.begin():
        #         stmt_tenant = (
        #             select(Company, User)
        #             .select_from(CompanyUser)
        #             .join(Company, CompanyUser.company_id == Company.id)
        #             .join(User, cast(CompanyUser.user_id, UUID) == User.id)  #  Cast to UUID
        #             .where(User.id == user_uuid)  # Use correctly formatted UUID
        #         )

        #         result = await session.execute(stmt_tenant)

        #         if all_list:
        #             return result.unique().scalars().all()
        #         else:
        #             return result.unique().scalars().first()
        async with get_db() as session:  # Fetch the session only once
            assert isinstance(session, AsyncSession)  # Ensure it's an async session
            
            stmt_tenant = (
                select(Company, User)
                .join(Company, CompanyUser.company_id == Company.id)
                .join(User, CompanyUser.user_id == User.id)
                .where(User.id == user_uuid)  # Ensure user_id is UUID
            )

            result = await session.execute(stmt_tenant)

            return result.unique().scalars().all() if all_list else result.unique().scalars().first()


    except ValueError:
        print(f"Invalid UUID format: {user_id}")
        return None
