from fastapi import Depends, HTTPException
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
    
    async def get_by_event_id(self, event_id: int, session: AsyncSession = Depends(get_db)) -> CompanyEvent | None:
        async for session in get_db():
            query = select(CompanyEvent).where(CompanyEvent.id == event_id)
            result = await session.execute(query)
            event = result.scalar_one_or_none()
            return event

                
    
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
            
    async def update_event(self, event_id: int, event_data: dict) -> CompanyEvent:
        """
        Update an existing event in the database.
        :param event_id: ID of the event to be updated.
        :param event_data: Updated data for the event.
        :return: The updated CompanyEvent object.
        """
        async for session in get_db():
            async with session.begin(): 
                existing_event = await session.get(CompanyEvent, event_id)
                if not existing_event:
                    raise HTTPException(status_code=404, detail="Event not found")

                # Update the fields dynamically
                for key, value in event_data.items():
                    setattr(existing_event, key, value)

            await session.commit()
            await session.refresh(existing_event)
            return existing_event


        
    async def delete_event(self, event_id: int) -> None:
        """
        Delete an event from the database.
        :param event_id: ID of the event to be deleted.
        """
        async for session in get_db():
            async with session.begin():
                existing_event = await session.get(CompanyEvent, event_id)
                if not existing_event:
                    raise HTTPException(status_code=404, detail="Event not found")
                await session.delete(existing_event)
                await session.commit()
            return existing_event