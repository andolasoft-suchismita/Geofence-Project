from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.database import get_db
from services.companyholiday.model import CompanyHoliday
from fastapi_query.pagination import PaginationParams
from fastapi_pagination.ext.sqlalchemy import paginate
from typing import List, Optional
from uuid import UUID


class CompanyHolidayRepository:
    """Repository for performing CRUD operations on the CompanyHoliday table."""

    def __init__(self) -> None:
        pass

    async def create_holiday(self, holiday: CompanyHoliday) -> CompanyHoliday:
        """
        Create a new holiday in the database.
        :param holiday: CompanyHoliday object to be created.
        :return: The created CompanyHoliday object.
        """
        async for session in get_db():
            async with session.begin():
                session.add(holiday)
            await session.commit()
            await session.refresh(holiday)
        return holiday

    async def get_holiday(self, holiday_id: UUID) -> Optional[CompanyHoliday]:
        """
        Retrieve a holiday by ID.
        :param holiday_id: UUID of the holiday.
        :return: The CompanyHoliday object if found, else None.
        """
        async for session in get_db():
            return await session.get(CompanyHoliday, holiday_id)

    async def get_holidays_by_company(self, company_id: int) -> List[CompanyHoliday]:
        """
        Retrieve all holidays for a given company.
        :param company_id: ID of the company.
        :return: List of holidays associated with the company.
        """
        async for session in get_db():
            query = select(CompanyHoliday).filter(CompanyHoliday.company_id == company_id)
            result = await session.execute(query)
            return result.scalars().all()

    async def update_holiday(self, holiday: CompanyHoliday) -> CompanyHoliday:
        """
        Update an existing holiday.
        :param holiday: Updated CompanyHoliday object.
        :return: The updated CompanyHoliday object.
        """
        async for session in get_db():
            async with session.begin():
                updated_holiday = await session.merge(holiday)
            await session.commit()
            await session.refresh(updated_holiday)
        return updated_holiday

    async def list_holidays(self, filter_params, pagination_params: PaginationParams, order_by) -> List[CompanyHoliday]:
        """
        Retrieve a paginated list of holidays.
        :return: A list of CompanyHoliday objects.
        """
        async for session in get_db():
            async with session.begin():
                stmt = select(CompanyHoliday)
                results = await paginate(
                    db=session,
                    model_class=CompanyHoliday,
                    stmt=stmt,
                    pagination_params=pagination_params,
                    filter_params=filter_params,
                    ordering_params=order_by
                )
        return results

    async def delete_holiday(self, holiday_id: UUID) -> bool:
        """
        Delete a holiday by ID.
        :param holiday_id: UUID of the holiday to delete.
        :return: True if deleted successfully, else False.
        """
        async for session in get_db():
            async with session.begin():
                holiday_to_delete = await session.get(CompanyHoliday, holiday_id)
                if holiday_to_delete is not None:
                    await session.delete(holiday_to_delete)
            await session.commit()
        return True
    
    async def get_upcoming_holidays_for_user(self, company_id: int) -> CompanyHoliday:
        """
        Retrieve upcoming holidays for a given company.
        :param company_id: ID of the company.
        :return: List of upcoming holidays.
        """
        async for session in get_db():
            query = select(CompanyHoliday).where(CompanyHoliday.company_id == company_id, CompanyHoliday.holiday_date >= date.today()).order_by(CompanyHoliday.holiday_date.asc())
            result = await session.execute(query)
            return result.scalars().first()
