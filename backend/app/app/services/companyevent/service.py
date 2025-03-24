from typing import List, Optional
from fastapi import Depends, HTTPException,status
from uuid import UUID
from datetime import date
from services.company.repository import CompanyRepository
from services.companyevent.model import CompanyEvent
from services.companyevent.repository import CompanyEventRepository
from services.companyevent.schema import CompanyEventCreate
from fastapi_query.pagination import PaginationParams


class CompanyEventService:
    """
    Service class responsible for handling business logic related to company holidays.
    """

    def __init__(self, event_repository: CompanyEventRepository = Depends()) -> None:
        self.event_repository = event_repository
        self.company_repository = CompanyRepository()

    async def create_event(self, event_data: CompanyEventCreate) -> CompanyEvent:
        """
        Creates a new event record.
        :param event_data: Data required to create an event.
        :return: The created CompanyEvent object.
        """
        company_id = event_data.company_id
        get_company = await self.company_repository.get(company_id)
        if not get_company:
            raise HTTPException(status_code=404, detail="Company not found")
        
        event_instance = CompanyEvent(**event_data.dict())
        return await self.event_repository.create_event(event_instance)
    
    async def get_by_event_id(self, event_id: int) -> CompanyEvent:
        """
        Retrieves an event by its ID.
        :param event_id: ID of the event to be retrieved.
        :return: The retrieved CompanyEvent object.
        """
        event = await self.event_repository.get_by_event_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    
    async def get_events_by_company(self, company_id: int) -> List[CompanyEvent]:
        """
        Retrieves all events for a given company.
        :param company_id: ID of the company.
        :return: A list of CompanyEvent objects.
        """
        get_company = await self.company_repository.get_by_id(company_id)
        if not get_company:
            raise HTTPException(status_code=404, detail="Company not found")
        
        return await self.event_repository.get_events_by_company(company_id)
    
    async def update_event(self, event_id: int, event_data: CompanyEventCreate) -> CompanyEvent:
        """
        Updates an existing event record.
        :param event_id: ID of the event to be updated.
        :param event_data: Data required to update the event.
        :return: The updated CompanyEvent object.
        """
        event = await self.event_repository.get_by_event_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")

        update_data = event_data.model_dump()
            
        return await self.event_repository.update_event(event_id, update_data)
    
    async def delete_event(self, event_id: int) -> None:
        """
        Deletes an event record.
        :param event_id: ID of the event to be deleted.
        """
        event = await self.event_repository.get_by_event_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        delete_event = await self.event_repository.delete_event(event_id)
        
        if not delete_event:
            raise HTTPException(status_code=500, detail="Failed to delete event")
        return delete_event