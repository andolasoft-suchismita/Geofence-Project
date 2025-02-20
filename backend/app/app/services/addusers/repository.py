from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.database import get_db
from services.addusers.model import AddUser


class AddUserRepository:
    def __init__(self):
        pass
    
    async def create_user(self, add_user: AddUser) -> AddUser:
        """Create a new user in the database"""
        async for session in get_db():
            async with session.begin():
                session.add(add_user)
            await session.commit()
            await session.refresh(add_user)
        return add_user