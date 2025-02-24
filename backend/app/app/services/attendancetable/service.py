from typing import List, Optional
from fastapi import Depends
from services.attendancetable.model import Attendance
from services.attendancetable.repository import AttendanceRepository
from services.attendancetable.schema import AttendanceSchema, AttendanceUpdateSchema, AttendanceResponseSchema
from uuid import UUID
from datetime import date


class AttendanceService:
    def __init__(self, repository: AttendanceRepository = Depends()) -> None:
        self.repository = repository

    async def create_attendance(self, attendance: AttendanceSchema) -> AttendanceResponseSchema:
        """
        Create a new attendance record.
        """
        attendance_record = await self.repository.create_attendance(attendance)
        return AttendanceResponseSchema.from_orm(attendance_record)

    async def get_attendance_by_id(self, attendance_id: int) -> Optional[AttendanceResponseSchema]:
        """
        Retrieve a single attendance record by ID.
        """
        attendance_record = await self.repository.get_attendance_by_id(attendance_id)
        if attendance_record:
            return AttendanceResponseSchema.from_orm(attendance_record)
        return None

    async def get_attendance_by_user(self, user_id: UUID, date: Optional[date] = None) -> List[AttendanceResponseSchema]:
        """
        Retrieve attendance records for a specific user. If a date is provided, filter by date.
        """
        attendance_records = await self.repository.get_attendance_by_user(user_id, date)
        return [AttendanceResponseSchema.from_orm(record) for record in attendance_records]

    async def update_attendance(self, attendance_id: int, update_data: AttendanceUpdateSchema) -> Optional[AttendanceResponseSchema]:
        """
        Update an attendance record.
        """
        attendance_record = await self.repository.update_attendance(attendance_id, update_data)
        if attendance_record:
            return AttendanceResponseSchema.from_orm(attendance_record)
        return None

    async def delete_attendance(self, attendance_id: int) -> bool:
        """
        Delete an attendance record.
        """
        return await self.repository.delete_attendance(attendance_id)
