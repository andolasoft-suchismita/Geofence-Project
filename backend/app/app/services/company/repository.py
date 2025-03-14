from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.database import get_db
from services.company.model import Company
from fastapi_query.pagination import Paginate, PaginationParams, Paginated
from fastapi_pagination.ext.sqlalchemy import paginate
from typing import List 

class CompanyRepository:
    """Repository responsible for performing operations (CRUD, etc) on Company table."""

    def __init__(self) -> None:
        pass

    async def create(self, company: Company) -> Company:
        """
        This method is responsible for creating a new company object.
        :return: the company object
        """
        async for session in get_db():
            async with session.begin():
                session.add(company)
            await session.commit()
            await session.refresh(company)
        return company

    async def get(self, company_id: int) -> Company:
        """
        This method returns a Company object by ID.
        :param company_id: ID of the company
        :return: the Company object
        """
        async for session in get_db():
            return await session.get(Company, company_id)

    async def get_by_id(self, company_id: int) -> Company:
        async for session in get_db():
            query = select(Company).filter(Company.id == company_id)
            result = await session.execute(query)
            return result.scalars().first()

    async def update(self, company: Company) -> Company:
        """
        This method updates an existing company object.
        :return: the updated Company object
        """
        async for session in get_db():
            async with session.begin():
                updated_company = await session.merge(company)
            await session.commit()
            await session.refresh(updated_company)
        return updated_company

    async def list(self, filter_params, pagination_params: PaginationParams, order_by) -> List[Company]:
        """
        This method retrieves a paginated list of companies.
        :return: a list of Company objects
        """
        async for session in get_db():
            async with session.begin():
                stmt = select(Company)
                results = await paginate(
                    db=session,
                    model_class=Company,
                    stmt=stmt,
                    pagination_params=pagination_params,
                    filter_params=filter_params,
                    ordering_params=order_by
                )
        return results

    async def delete(self, company_id: int):
        """
        This method deletes a company by ID.
        :param company_id: ID of the company to delete
        """
        async for session in get_db():
            async with session.begin():
                company_to_delete = await session.get(Company, company_id)
                if company_to_delete is not None:
                    await session.delete(company_to_delete)
            await session.commit()

    
    async def list(self, filterparams, pagination_params, order_by) -> List[Company]:  # Now it will work
        async for session in get_db():
            async with session.begin():
                stmt = select(Company)
                results = await paginate(
                    db=session,
                    model_class=Company,
                    stmt=stmt,
                    pagination_params=pagination_params,
                    filter_params=filterparams,
                    order_by=order_by
                )
                return results