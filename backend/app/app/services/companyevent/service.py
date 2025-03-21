from typing import List, Optional
from fastapi import Depends
from uuid import UUID
from datetime import date
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

    async def create_event(self, event_data: CompanyEventCreate) -> CompanyEvent:
        """
        Creates a new event record.
        :param event_data: Data required to create an event.
        :return: The created CompanyEvent object.
        """
        event_instance = CompanyEvent(**event_data.dict())
        return await self.event_repository.create_event(event_instance)