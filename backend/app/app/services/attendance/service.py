from typing import List, Optional
from fastapi import Depends
from uuid import UUID
from datetime import date, datetime, timedelta

import pytz
from services.attendance.model import Attendance
from services.attendance.repository import AttendanceRepository
from services.attendance.schema import AttendanceSchema, AttendanceUpdateSchema, AttendanceResponseSchema
from services.users.model import User

class AttendanceService:
    """
    Service class responsible for handling business logic related to attendance.
    """

    def __init__(self, attendance_repository: AttendanceRepository = Depends()) -> None:
        self.attendance_repository = attendance_repository

    async def create_attendance(self, attendance_data: AttendanceSchema, current_user: User) -> AttendanceResponseSchema:
        """
        Creates a new attendance record.
        :param attendance_data: Data required to create an attendance record.
        :param current_user: The user for whom attendance is being recorded.
        :return: The created AttendanceResponseSchema object.
        """

        attendance_dict = attendance_data.model_dump() if hasattr(attendance_data, "model_dump") else attendance_data.dict()
        
        attendance_dict["date"] = date.today()

        # Ensure required fields are provided by the user
        if not attendance_dict.get("check_in"):
           raise ValueError("Check-in time is required.")

        attendance_dict["user_id"] = current_user.id  # Assign user ID

        # ✅ Check if the user has already checked in on the same date
        existing_attendance = await self.attendance_repository.get_attendance_by_date_user(
           user_id=current_user.id, date=attendance_dict["date"]
        )
        
        if existing_attendance:
           raise ValueError("User has already checked in for this date.")
       
        attendance_dict["status"] = "half-day"
        
        created_attendance = await self.attendance_repository.create_attendance(attendance_dict)

        return AttendanceResponseSchema.model_validate(created_attendance)

    async def get_attendance(self, attendance_id: int) -> Optional[AttendanceResponseSchema]:
        """
        Retrieves an attendance record by its ID.
        :param attendance_id: ID of the attendance record.
        :return: The AttendanceResponseSchema object if found, otherwise None.
        """
        attendance_record = await self.attendance_repository.get_attendance_by_id(attendance_id)
        return AttendanceResponseSchema.model_validate(attendance_record) if attendance_record else None

    async def get_attendance_by_user(self, user_id: UUID, start_date: Optional[date] = None, end_date: Optional[date] = None) -> List[AttendanceResponseSchema]:
        """
        Retrieves attendance records for a specific user. If a date is provided, filter by date.
        :param user_id: UUID of the user.
        :param date: (Optional) Date filter for attendance records.
        :return: A list of AttendanceResponseSchema objects.
        """
        attendance_records = await self.attendance_repository.get_attendance_by_user(user_id, date)
        return [AttendanceResponseSchema.model_validate(record) for record in attendance_records]

    async def update_attendance(self, attendance_id: int, attendance_data: AttendanceUpdateSchema) -> Optional[AttendanceResponseSchema]:
        """
        Updates an existing attendance record.
        :param attendance_id: ID of the attendance record.
        :param attendance_data: Data required for the update.
        :return: The updated AttendanceResponseSchema object if found, otherwise None.
        """
        existing_attendance = await self.attendance_repository.update_attendance(attendance_id, attendance_data)
        if not existing_attendance:
            return None  # Attendance record not found

        # ✅ Use model_dump() if available, otherwise fallback to .dict()
        update_dict = attendance_data.model_dump(exclude_unset=True) if hasattr(attendance_data, "model_dump") else attendance_data.dict(exclude_unset=True)

        for key, value in update_dict.items():
            setattr(existing_attendance, key, value)

        # Recalculate status if check-out is updated
        if existing_attendance.check_in and existing_attendance.check_out:
           # Convert `existing_attendance.date` to a timezone-aware datetime
           timezone = pytz.UTC  # Change this to the correct timezone if needed

           check_in_time = datetime.combine(existing_attendance.date, existing_attendance.check_in).replace(tzinfo=timezone)
           check_out_time = datetime.combine(existing_attendance.date, existing_attendance.check_out).replace(tzinfo=timezone)

           work_duration = check_out_time - check_in_time
           existing_attendance.status = "half-day" if work_duration < timedelta(hours=6) else "full-day"
        updated_attendance = await self.attendance_repository.update_attendance(attendance_id , existing_attendance)

        return AttendanceResponseSchema.model_validate(updated_attendance)

    async def delete_attendance(self, attendance_id: int) -> bool:
        """
        Deletes an attendance record by its ID.
        :param attendance_id: ID of the attendance record.
        :return: True if deleted successfully, otherwise False.
        """
        return await self.attendance_repository.delete_attendance(attendance_id)
