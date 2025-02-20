from fastapi import APIRouter, Depends, Request
from services.company.repository import CompanyRepository
from services.company.schema import CompanyBaseCreate
from services.company.service import CompanyService
from fastapi import APIRouter, Depends, HTTPException
from fastapi_query.pagination import Paginate, PaginationParams, Paginated


MyCompanyRouter = APIRouter(prefix="/company", tags=["Company-Management"])


# Create Company
@MyCompanyRouter.post("/create", description="Create a new Company")
async def create_company(
    company_body: CompanyBaseCreate,
    company_service: CompanyService = Depends(lambda: CompanyService(company_repository=CompanyRepository())),
):
    return await company_service.create_company(company_body)


# Get Company by ID
@MyCompanyRouter.get("/{company_id}", description="Get Company by ID")
async def get_company(
    company_id: int,
    company_service: CompanyService = Depends(lambda: CompanyService(company_repository=CompanyRepository())),
):
    company = await company_service.get_company(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


# List Companies with Pagination and Filtering
# @MyCompanyRouter.get("/list", description="List all Companies with Pagination and Filtering")
# async def list_companies(
#     filter_params: dict = {},
#     pagination_params: PaginationParams = Depends(),
#     order_by: str = None,
#     company_service: CompanyService = Depends(lambda: CompanyService(company_repository=CompanyRepository())),
# ):
#     return await company_service.list_companies(filter_params, pagination_params, order_by)


# Update Company
@MyCompanyRouter.put("/{company_id}/update", description="Update Company Details")
async def update_company(
    company_id: int,
    company_body: CompanyBaseCreate,
    company_service: CompanyService = Depends(lambda: CompanyService(company_repository=CompanyRepository())),
):
    updated_company = await company_service.update_company(company_id, company_body)
    if not updated_company:
        raise HTTPException(status_code=404, detail="Company not found or update failed")
    return updated_company


# Delete Company
@MyCompanyRouter.delete("/{company_id}/delete", description="Delete a Company")
async def delete_company(
    company_id: int,
    company_service: CompanyService = Depends(lambda: CompanyService(company_repository=CompanyRepository())),
):
    deleted = await company_service.delete_company(company_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": "Company deleted successfully"}
