from services.companyuser.model import CompanyUser
from services.company.model import Company
from db.database import get_db
from services.attendance.model import Attendance
from services.attendance.schema import AttendanceSchema, AttendanceUpdateSchema
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import UUID
from datetime import date
from typing import List, Optional
from fastapi import Depends
from sqlalchemy.future import select


class AttendanceRepository:
    """
    Repository for Attendance-related database operations.
    """

    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def create_attendance(self, attendance_data: AttendanceSchema) -> Attendance:
        """
        Creates a new attendance record.
        """
        attendance_dict = attendance_data.model_dump() if hasattr(attendance_data, "model_dump") else attendance_data

        attendance_record = Attendance(**attendance_dict)

        self.db.add(attendance_record)
        await self.db.commit()
        await self.db.refresh(attendance_record)

        return attendance_record

    async def get_attendance_by_id(self, attendance_id: int) -> Optional[Attendance]:
        """
        Fetches a single attendance record by ID.
        """
        result = await self.db.execute(select(Attendance).filter(Attendance.id == attendance_id))
        return result.scalar_one_or_none()

    async def get_attendance_by_user(self, user_id: UUID, start_date: Optional[date] = None, end_date: Optional[date] = None) -> List[Attendance]:
        """
        Fetches attendance records for a specific user. If a date is provided, filter by date.
        """
        query = select(Attendance).filter(Attendance.user_id == user_id)
        if start_date and end_date is not None:
            query = query.filter(Attendance.date <= start_date, Attendance.date >= end_date)

        result = await self.db.execute(query)
        return result.scalars().all()

    async def update_attendance(self, attendance_id: int, attendance_data: AttendanceUpdateSchema) -> Optional[Attendance]:
       """
       Updates an attendance record.
       """
       attendance_record = await self.get_attendance_by_id(attendance_id)
       if not attendance_record:
           return None

       # Ensure attendance_data is always a dictionary
       if isinstance(attendance_data, AttendanceUpdateSchema):
           update_dict = attendance_data.model_dump(exclude_unset=True)
       elif isinstance(attendance_data, dict):  # Ensure it's a dictionary before using it
           update_dict = attendance_data
       else:
           raise TypeError("attendance_data must be either AttendanceUpdateSchema or a dictionary")

       for key, value in update_dict.items():
           setattr(attendance_record, key, value)

       await self.db.commit()
       await self.db.refresh(attendance_record)

       return attendance_record


    async def delete_attendance(self, attendance_id: int) -> bool:
        """
        Deletes an attendance record.
        """
        attendance_record = await self.get_attendance_by_id(attendance_id)
        if not attendance_record:
            return False

        await self.db.delete(attendance_record)
        await self.db.commit()

        return True

    async def get_attendance_by_date_user(self, user_id: UUID, date: date):
        query = select(Attendance).filter(Attendance.user_id == user_id, Attendance.date == date)
        result = await self.db.execute(query)
        return result.scalars().first()
    
    async def get_company_coordinates(self, userId: UUID):
        #get company_id
        company_query = select(CompanyUser.company_id).filter(CompanyUser.user_id == str(userId))
        result = await self.db.execute(company_query)
        company_id = result.scalar()
        
        if company_id is None:
            return None
        
        # get company coordinates
        company_coordinates_query = select(Company.latitude, Company.longitude).filter(Company.id == company_id)
        company_coordinates_result = await self.db.execute(company_coordinates_query)
        company_coordinates = company_coordinates_result.fetchone()
        
        if company_coordinates:
            return {"latitude": company_coordinates[0], "longitude": company_coordinates[1]}  # Extract values properly
        return None
    
    async def get_attendance_by_date(self, attendance_date: date):
        query = select(Attendance).filter(Attendance.date == attendance_date)
        result = await self.db.execute(query)
        return result.scalars().all()
        
