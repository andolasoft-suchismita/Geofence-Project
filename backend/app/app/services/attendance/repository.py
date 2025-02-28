from db.database import get_db
from services.attendance.model import Attendance
from sqlalchemy.future import select
from services.attendance.schema import AttendanceSchema
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from datetime import date
from typing import List, Optional


class AttendanceRepository:
    async def create_attendance(self, attendance: AttendanceSchema) -> Attendance:
        """
        Create a new attendance record.
        """
        async for session in get_db():
            async with session.begin():
                attendance_record = Attendance(**attendance.dict())
                session.add(attendance_record)
            await session.commit()
            await session.refresh(attendance_record)
            return attendance_record

    async def get_attendance_by_id(self, attendance_id: int) -> Optional[Attendance]:
        """
        Fetch a single attendance record by ID.
        """
        async for session in get_db():
            result = await session.execute(select(Attendance).filter(Attendance.id == attendance_id))
            return result.scalar_one_or_none()

    async def get_attendance_by_user(self, user_id: UUID, date: Optional[date] = None) -> List[Attendance]:
        """
        Fetch attendance records for a specific user. If a date is provided, filter by date.
        """
        async for session in get_db():
            query = select(Attendance).filter(Attendance.user_id == user_id)
            if date:
                query = query.filter(Attendance.date == date)
            result = await session.execute(query)
            return result.scalars().all()

    async def update_attendance(self, attendance_id: int, attendance_data: AttendanceSchema) -> Optional[Attendance]:
        """
        Update an attendance record.
        """
        async for session in get_db():
            async with session.begin():
                attendance_record = await session.execute(select(Attendance).filter(Attendance.id == attendance_id))
                attendance_record = attendance_record.scalar_one_or_none()
                if not attendance_record:
                    return None
                
                for key, value in attendance_data.dict(exclude_unset=True).items():
                    setattr(attendance_record, key, value)
                
            await session.commit()
            await session.refresh(attendance_record)
            return attendance_record

    async def delete_attendance(self, attendance_id: int) -> bool:
        """
        Delete an attendance record.
        """
        async for session in get_db():
            async with session.begin():
                attendance_record = await session.execute(select(Attendance).filter(Attendance.id == attendance_id))
                attendance_record = attendance_record.scalar_one_or_none()
                if not attendance_record:
                    return False
                
                await session.delete(attendance_record)
            await session.commit()
            return True
