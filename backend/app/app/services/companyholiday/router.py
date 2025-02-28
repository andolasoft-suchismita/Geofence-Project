from fastapi import APIRouter, Depends, HTTPException
from services.companyholiday.model import CompanyHoliday
from services.companyholiday.service import CompanyHolidayService
from services.companyholiday.schema import CompanyHolidayBase, CompanyHolidayCreate, CompanyHolidayUpdate, CompanyHolidayResponse
from typing import List, Optional
from uuid import UUID
from fastapi_query.pagination import PaginationParams
from services.auth.manager import current_super_user

CompanyHolidayRouter = APIRouter(prefix="/company-holidays", tags=["Company-Holiday-Management"])

# Create a new Company Holiday
@CompanyHolidayRouter.post("/", response_model=CompanyHolidayResponse, status_code=201)
async def create_holiday(
    holiday: CompanyHolidayBase,
    # current_iuser: CompanyHoliday = Depends(current_super_user),
    service: CompanyHolidayService = Depends(),
):
    return await service.create_holiday(holiday)

# Get Holiday by ID
@CompanyHolidayRouter.get("/{holiday_id}", response_model=CompanyHolidayResponse)
async def get_holiday(
    holiday_id: int,
    # current_iuser: CompanyHoliday = Depends(current_super_user),
    service: CompanyHolidayService = Depends(),
):
    holiday = await service.get_holiday(holiday_id)
    if not holiday:
        raise HTTPException(status_code=404, detail="Holiday not found")
    return holiday

# Get Holidays by Company ID
@CompanyHolidayRouter.get("/company/{company_id}", response_model=List[CompanyHolidayResponse])
async def get_holidays_by_company(
    company_id: int,
    # current_iuser: CompanyHoliday = Depends(current_super_user),
    service: CompanyHolidayService = Depends(),
):
    return await service.get_holidays_by_company(company_id)

# Update Holiday
@CompanyHolidayRouter.put("/{holiday_id}", response_model=CompanyHolidayResponse)
async def update_holiday(
    holiday_id: int,
    holiday_data: CompanyHolidayUpdate,
    # current_iuser: CompanyHoliday = Depends(current_super_user),
    service: CompanyHolidayService = Depends(),
):
    updated_holiday = await service.update_holiday(holiday_id, holiday_data)
    if not updated_holiday:
        raise HTTPException(status_code=404, detail="Holiday not found or update failed")
    return updated_holiday

# # List Holidays with Pagination and Optional Filtering
# @CompanyHolidayRouter.get("/", response_model=List[CompanyHolidayResponse])
# async def list_holidays(
#     pagination_params: PaginationParams = Depends(),
#     search: Optional[str] = None,  # Example filter: Search by holiday name
#     service: CompanyHolidayService = Depends(),
# ):
#     filters = {"search": search} if search else {}
#     return await service.list_holidays(filters, pagination_params, None)

# Delete Holiday
@CompanyHolidayRouter.delete("/{holiday_id}", response_model=dict)
async def delete_holiday(
    holiday_id: int,
    # current_iuser: CompanyHoliday = Depends(current_super_user),
    service: CompanyHolidayService = Depends(),
):
    deleted = await service.delete_holiday(holiday_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Holiday not found")
    return {"message": "Holiday deleted successfully"}
