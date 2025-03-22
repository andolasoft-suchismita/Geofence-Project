from fastapi import APIRouter, Depends, HTTPException
from services.companyevent.model import CompanyEvent
from services.companyevent.service import CompanyEventService
from services.companyevent.schema import CompanyEventCreate, CompanyEventResponse
from typing import List, Optional
from uuid import UUID
from fastapi_query.pagination import PaginationParams
from services.auth.manager import current_super_user



CompanyEventRouter = APIRouter(prefix="/company-events", tags=["Company-Event-Management"])
# Create a new Company Event
@CompanyEventRouter.post("/", response_model=CompanyEventResponse, status_code=201)
async def create_event(
    event: CompanyEventCreate,
    service: CompanyEventService = Depends()
):
    return await service.create_event(event)

@CompanyEventRouter.get("/{company_id}", response_model=List[CompanyEventResponse])
async def get_events(
    company_id: int,
    service: CompanyEventService = Depends()
):
    return await service.get_events_by_company(company_id)

@CompanyEventRouter.get("/{event_id}", response_model=CompanyEventResponse)
async def get_event(
    event_id: int,
    service: CompanyEventService = Depends()
):
    return await service.get_by_event_id(event_id)

@CompanyEventRouter.patch("/{event_id}", response_model=CompanyEventResponse)
async def update_event(
    event_id: int,
    event_data: CompanyEventCreate,
    service: CompanyEventService = Depends()
):
    return await service.update_event(event_id, event_data)

@CompanyEventRouter.delete("/{event_id}", status_code=204)
async def delete_event(
    event_id: int,
    service: CompanyEventService = Depends()
):
    return await service.delete_event(event_id)