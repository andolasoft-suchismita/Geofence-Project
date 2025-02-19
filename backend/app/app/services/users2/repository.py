from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.database import get_db
from services.users.model import User  # Assuming User is your SQLAlchemy model
from services.users2.schema import UserSchema  # Your Pydantic schema

# class UserRepository:
#     def __init__(self, db_session: AsyncSession):
#         # self.db_session = db_session
#         pass

#     async def get_user_by_email(self, email: str) -> UserSchema:
#         """Retrieve a user from the database by email"""
#         async for session in get_db():
#             async with session.begin():
#                 query = select(User).filter(User.email == email)
#                 result = await session.execute(query)
#                 user_data = result.scalar().one_or_none()
#                 if user_data:
#                     # Convert SQLAlchemy User to Pydantic UserSchema
#                     return UserSchema.from_orm(user_data)
#                 return None


class UserRepository:
    def __init__(self):
        # self.db_session = db_session  # Ensure db_session is set properly
        pass

    async def get_user_by_email(self, email: str):
        """Retrieve a user from the database by email"""
        async for session in get_db():
            async with session.begin():
                query = select(User).filter(User.email == email)
                result = await session.execute(query)
            return result.scalars().first()
                # user_data = result.scalar_one_or_none()  # Use scalar_one_or_none() instead of one_or_none()
                
                # if user_data:
                #     return UserSchema.from_orm(user_data)  # Ensure conversion to Pydantic model
                # return None
