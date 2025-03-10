from typing import List, Optional
from fastapi import Depends, HTTPException, Request,status
from uuid import UUID
from datetime import date, datetime, timedelta
from geopy.distance import geodesic
import pytz
from services.attendance.model import Attendance
from services.attendance.repository import AttendanceRepository
from services.attendance.schema import AttendanceSchema, AttendanceUpdateSchema, AttendanceResponseSchema
from services.users.model import User
from config.settings import settings


class AttendanceService:
    """
    Service class responsible for handling business logic related to attendance.
    """

    def __init__(self, attendance_repository: AttendanceRepository = Depends()) -> None:
        self.attendance_repository = attendance_repository

    async def create_attendance(self, request: Request, attendance_data: AttendanceSchema, current_user: User) -> AttendanceResponseSchema:
        """
        Creates a new attendance record.
        :param attendance_data: Data required to create an attendance record.
        :param current_user: The user for whom attendance is being recorded.
        :return: The created AttendanceResponseSchema object.
        """

        attendance_dict = attendance_data.model_dump() if hasattr(attendance_data, "model_dump") else attendance_data.dict()
        
        attendance_dict["date"] = date.today()
        userId = current_user.id

        # Ensure required fields are provided by the user
        if not attendance_dict.get("check_in"):
           raise HTTPException(status_code=400, detail="Check-in time is required.")

        attendance_dict["user_id"] = current_user.id  # Assign user ID

        # ✅ Check if the user has already checked in on the same date
        existing_attendance = await self.attendance_repository.get_attendance_by_date_user(
           user_id=current_user.id, date=attendance_dict["date"]
        )
        
        if existing_attendance:
           raise HTTPException(status_code=400, detail="User has already checked in for this date.")
       
        #Get company coordinates
        geofence_coordinates = await self.attendance_repository.get_company_coordinates(userId)
        print(geofence_coordinates)
        if geofence_coordinates["latitude"] is None or geofence_coordinates["longitude"] is None:
           raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company coordinates not found or company is not created.")
        
        if not geofence_coordinates:
           raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company coordinates not found.")
       
        company_latitude = float(geofence_coordinates["latitude"])
        company_longitude = float(geofence_coordinates["longitude"])
        geofence_coordinates = (company_latitude, company_longitude)
        
       
        # Get users coordinates from the cookies ###[DOUBT]
        latitude, longitude = self.get_user_coordinates_from_cookies(request)
        
        if latitude is None or longitude is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Location data is missing in cookies.")
        
        #check geofencing (if user within 50 m)
        user_coordinates = (latitude, longitude)
        distance = geodesic(geofence_coordinates, user_coordinates).km
        print(f"Distance:{distance}")
        
        if distance > settings.GEOFENCE_RADIUS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is outside the geofence")
        
        attendance_dict["latitude"] = latitude
        attendance_dict["longitude"] = longitude
        attendance_dict["status"] = "half-day"
        
        created_attendance = await self.attendance_repository.create_attendance(attendance_dict)

        return AttendanceResponseSchema.model_validate(created_attendance)
    
    def get_user_coordinates_from_cookies(self, request: Request):
        """
        Extract latitude and longitude from cookies.
        """
        print("Received cookies:", request.cookies)
        
        
        latitude = request.cookies.get("latitude")
        longitude = request.cookies.get("longitude")
        #### add log [TODO]
        print(f"Type of latitude: {type(latitude)}, Type of longitude: {type(longitude)}")
        
        if latitude is None or longitude is None:
            return None, None
        
        try:
            return latitude, longitude
        except ValueError:
            return None, None

    async def get_attendance(self, attendance_id: int) -> Optional[AttendanceResponseSchema]:
        """
        Retrieves an attendance record by its ID.
        :param attendance_id: ID of the attendance record.
        :return: The AttendanceResponseSchema object if found, otherwise None.
        """
        attendance_record = await self.attendance_repository.get_attendance_by_id(attendance_id)
        return AttendanceResponseSchema.model_validate(attendance_record) if attendance_record else None

    

    async def get_attendance_by_user(
        self, user_id: UUID, start_date: Optional[date] = None, end_date: Optional[date] = None
    ) -> List[AttendanceResponseSchema]:
        """
        Retrieves attendance records for a specific user. 
        If start_date and end_date are provided, filter records within the date range.
    
        :param user_id: UUID of the user.
        :param start_date: (Optional) Start date filter for attendance records.
        :param end_date: (Optional) End date filter for attendance records.
        :return: A list of AttendanceResponseSchema objects.
        """
        # Fetch attendance records with filters applied
        attendance_records = await self.attendance_repository.get_attendance_by_user(user_id, start_date, end_date)

        # Convert records to schema and return
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
        elif existing_attendance.check_out:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User has already been checked out.")

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

    async def get_attendance_by_date(self, attendance_date: date) -> List[AttendanceResponseSchema]:
        """
        Retrieves attendance records by date.
        :param attendance_date: Date of the attendance records.
        :return: A list of AttendanceResponseSchema objects.
        """
        attendance_records = await self.attendance_repository.get_attendance_by_date(attendance_date)

        # ✅ Convert each ORM object to AttendanceResponseSchema
        return [AttendanceResponseSchema.model_validate(record) for record in attendance_records]

