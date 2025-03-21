from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from services.companyevent.model import CompanyEvent
from db.database import get_db
from fastapi_query.pagination import PaginationParams
from fastapi_pagination.ext.sqlalchemy import paginate
from typing import List, Optional
from uuid import UUID


class CompanyEventRepository:
    """Repository for performing CRUD operations on the CompanyHoliday table."""

    def __init__(self) -> None:
        pass




    async def create_event(self, event:CompanyEvent) -> CompanyEvent:
        """
        Create a new event in the database.
        :param event: CompanyEvent object to be created.
        :return: The created CompanyEvent object.
        """
        async for session in get_db():
            async with session.begin():
                session.add(event)
            await session.commit()
            await session.refresh(event)
        return event