from typing import List, Optional
from fastapi import Depends
from uuid import UUID
from datetime import date
from services.companyholiday.model import CompanyHoliday
from services.companyholiday.repository import CompanyHolidayRepository
from services.companyholiday.schema import CompanyHolidayCreate, CompanyHolidayUpdate
from fastapi_query.pagination import PaginationParams


class CompanyHolidayService:
    """
    Service class responsible for handling business logic related to company holidays.
    """

    def __init__(self, holiday_repository: CompanyHolidayRepository = Depends()) -> None:
        self.holiday_repository = holiday_repository

    async def create_holiday(self, holiday_data: CompanyHolidayCreate) -> CompanyHoliday:
        """
        Creates a new holiday record.
        :param holiday_data: Data required to create a holiday.
        :return: The created CompanyHoliday object.
        """
        holiday_instance = CompanyHoliday(**holiday_data.dict())
        if holiday_instance.start_date:
            holiday_instance.holiday_date = holiday_instance.start_date
            
        return await self.holiday_repository.create_holiday(holiday_instance)

    async def get_holiday(self, holiday_id: UUID) -> Optional[CompanyHoliday]:
        """
        Retrieves a holiday by its UUID.
        :param holiday_id: UUID of the holiday.
        :return: The CompanyHoliday object if found, otherwise None.
        """
        return await self.holiday_repository.get_holiday(holiday_id)

    async def get_holidays_by_company(self, company_id: int) -> List[CompanyHoliday]:
        """
        Retrieves all holidays for a given company.
        :param company_id: ID of the company.
        :return: A list of CompanyHoliday objects.
        """
        return await self.holiday_repository.get_holidays_by_company(company_id)

    async def update_holiday(self, holiday_id: UUID, holiday_data: CompanyHolidayUpdate) -> Optional[CompanyHoliday]:
        """
        Updates an existing holiday.
        :param holiday_id: UUID of the holiday.
        :param holiday_data: Data required for the update.
        :return: The updated CompanyHoliday object if found, otherwise None.
        """
        existing_holiday = await self.holiday_repository.get_holiday(holiday_id)
        if not existing_holiday:
            return None  # Holiday not found

        for key, value in holiday_data.dict(exclude_unset=True).items():
            setattr(existing_holiday, key, value)

        return await self.holiday_repository.update_holiday(existing_holiday)

    # async def list_holidays(self, filter_params, pagination_params: PaginationParams, order_by) -> List[CompanyHoliday]:
    #     """
    #     Retrieves a paginated list of holidays.
    #     :return: A list of CompanyHoliday objects.
    #     """
    #     return await self.holiday_repository.list_holidays(filter_params, pagination_params, order_by)

    async def delete_holiday(self, holiday_id: UUID) -> bool:
        """
        Deletes a holiday by its UUID.
        :param holiday_id: UUID of the holiday.
        :return: True if deleted successfully, otherwise False.
        """
        return await self.holiday_repository.delete_holiday(holiday_id)
