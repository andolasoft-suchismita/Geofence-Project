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