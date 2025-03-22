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
    
    async def get_by_event_id(self, event_id: int) -> CompanyEvent | None:
        """
        Retrieve an event by its ID.
        """
        async with self.session as session:  # Ensure proper session handling
            query = select(CompanyEvent).where(CompanyEvent.id == event_id)
            result = await session.execute(query)
            return result.scalar_one_or_none()  # Fetches a single row or None
                
    
    async def get_events_by_company(self, company_id: int) -> List[CompanyEvent]:
        """
        Retrieve all events for a given company.
        :param company_id: ID of the company.
        :return: List of CompanyEvent objects.
        """
        async for session in get_db():
            async with session.begin():
                query = select(CompanyEvent).filter(CompanyEvent.company_id == company_id)
                result = await session.execute(query)
                events = result.scalars().all()
                return events
            
    async def update_event(self, event_id: int, event_data: CompanyEvent) -> CompanyEvent:
        """
        Update an existing event in the database.
        :param event_id: ID of the event to be updated.
        :param event_data: Updated data for the event.
        :return: The updated CompanyEvent object.
        """
        async for session in get_db():
            async with session.begin():
                query = select(CompanyEvent).filter(CompanyEvent.id == event_id)
                result = await session.execute(query)
                event = result.scalar()
                if event:
                    for key, value in event_data.dict().items():
                        setattr(event, key, value)
                    await session.commit()
                    await session.refresh(event)
                return event