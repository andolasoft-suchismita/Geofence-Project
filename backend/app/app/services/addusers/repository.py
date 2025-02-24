from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from services.company.model import Company
from db.database import get_db
from services.users.model import User
from fastapi_query.pagination import PaginationParams
from fastapi_pagination.ext.sqlalchemy import paginate
from typing import List, Optional
from uuid import UUID


class AddUserRepository:
    """Repository responsible for performing CRUD operations on the User table."""

    def __init__(self) -> None:
        pass

    async def create_user(self, add_user: User) -> User:
        """
        Create a new user in the database.
        :param add_user: User object to be created.
        :return: The created User object.
        """
        async for session in get_db():
            async with session.begin():
                session.add(add_user)
            await session.commit()
            await session.refresh(add_user)
        return add_user

    async def get_user(self, user_id: UUID) -> Optional[User]:
        """
        Retrieve a user by ID.
        :param user_id: UUID of the user.
        :return: The User object if found, else None.
        """
        async for session in get_db():
            return await session.get(User, user_id)

    async def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Retrieve a user by email.
        :param email: Email of the user.
        :return: The User object if found, else None.
        """
        async for session in get_db():
            query = select(User).filter(User.email == email)
            result = await session.execute(query)
            return result.scalars().first()

    async def update_user(self, user: User) -> User:
        """
        Update an existing user.
        :param user: Updated User object.
        :return: The updated User object.
        """
        async for session in get_db():
            async with session.begin():
                updated_user = await session.merge(user)
            await session.commit()
            await session.refresh(updated_user)
        return updated_user

    async def list_users(self) -> List[User]:  # Removed pagination params
       """
       Retrieve all users from the database.
       :return: A list of all User objects.
       """
       async for session in get_db():
           async with session.begin():
               stmt = select(User)  # No pagination, select all users
               result = await session.execute(stmt)
               return result.scalars().all()  # Fetch all users




    async def delete_user(self, user_id: UUID) -> bool:
        """
        Delete a user by ID.
        :param user_id: UUID of the user to delete.
        :return: True if deleted successfully, else False.
        """
        async for session in get_db():
            async with session.begin():
                user_to_delete = await session.get(User, user_id)
                if user_to_delete is not None:
                    await session.delete(user_to_delete)
            await session.commit()
        return True