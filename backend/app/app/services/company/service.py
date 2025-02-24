from typing import List, Optional
from fastapi import Depends
from services.companyuser.repository import CompanyUserRepository
from services.companyuser.model import CompanyUser
from services.users.model import User
from utility.generate_subdomain import generateSubDomain
from services.company.model import Company
from services.company.repository import CompanyRepository
from services.company.schema import CompanyBaseCreate
from fastapi_query.pagination import Paginate, PaginationParams, Paginated

class CompanyService:
    def __init__(self, company_repository: CompanyRepository = Depends()) -> None:
        self.company_repository = company_repository

    async def create_company(self, company: CompanyBaseCreate) -> Company:
        """
        Creates a new company record.
        """
        company_instance = Company(**company.dict())
        return await self.company_repository.create(company_instance)

    async def get_company(self, company_id: int) -> Company:
        """
        Retrieves a single company by ID.
        """
        return await self.company_repository.get(company_id)

    async def update_company(self, company_id: int, company_data: CompanyBaseCreate) -> Company:
        """
        Updates an existing company.
        """
        existing_company = await self.company_repository.get(company_id)
        if not existing_company:
            return None  # Handle this case in your endpoint

        for key, value in company_data.dict().items():
            setattr(existing_company, key, value)

        return await self.company_repository.update(existing_company)

    async def delete_company(self, company_id: int) -> bool:
        """
        Deletes a company by ID.
        """
        existing_company = await self.company_repository.get(company_id)
        if not existing_company:
            return False # Handle this case in your endpoint

        await self.company_repository.delete(company_id)
        return True

    
    def list_companies(self, filter_params, pagination_params, order_by) -> List[Company]:
        return self.company_repository.list(filter_params, pagination_params, order_by)
    
    async def create_from_user(self, user : User) -> Company:
        """
        Creates a tenant from a user.

        Args:
            user (User): The user associated with the tenant.

        Returns:
            Tenant: The created tenant.
        """
        name = generateSubDomain(user.email)
        tenant_instance = Company(
            name = name,
            is_active = 1
        )
        tenantRepository = CompanyRepository()

        tenant = await tenantRepository.create(tenant_instance)
        tenant_user_instance = CompanyUser(
            company_id = tenant.id, 
            user_id = str(user.id), 
            user_type = 'owner', 
            status = 'active',
        )
        tenantUserRepository = CompanyUserRepository()
        tenant_user = await tenantUserRepository.create(tenant_user_instance)
        return tenant
