from typing import List, Optional
from fastapi import Depends, HTTPException, Request,status
from uuid import UUID
from datetime import date, datetime, timedelta
from geopy.distance import geodesic
from pyparsing import Dict
import pytz
from utility.tenant_info import getTenantInfo
from services.companyuser.repository import CompanyUserRepository
from services.companyholiday.repository import CompanyHolidayRepository
from services.company.repository import CompanyRepository
from services.users.repository import UserRepository
from services.attendance.model import Attendance
from services.attendance.repository import AttendanceRepository
from services.attendance.schema import AttendanceReportSchema, AttendanceSchema, AttendanceStatus, AttendanceSummarySchema, AttendanceUpdateSchema, AttendanceResponseSchema, DashboardSummarySchema, HolidaySchema, LoginOvertimeTrendSchema
from services.users.model import User
from config.settings import settings
from dateutil.relativedelta import relativedelta
import calendar



class AttendanceService:
    """
    Service class responsible for handling business logic related to attendance.
    """

    def __init__(self, attendance_repository: AttendanceRepository = Depends()) -> None:
        self.attendance_repository = attendance_repository
        self.user_repository = UserRepository()
        self.company_repository = CompanyRepository()
        self.holiday_repository = CompanyHolidayRepository()
        self.companyuser_repository = CompanyUserRepository()

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
       
        if "latitude" not in attendance_dict or "longitude" not in attendance_dict:
           raise HTTPException(status_code=400, detail="Latitude and Longitude are required from the frontend.")

        attendance_dict["user_id"] = current_user.id  # Assign user ID

        # ✅ Check if the user has already checked in on the same date
        existing_attendance = await self.attendance_repository.get_attendance_by_date_user(
           user_id=current_user.id, date=attendance_dict["date"]
        )
        
        # if existing_attendance:
        #    raise HTTPException(status_code=400, detail="User has already checked in for this date.")
       
        #Get company coordinates
        geofence_coordinates = await self.attendance_repository.get_company_coordinates(userId)
        print(f"Fetched geofence coordinates: {geofence_coordinates}")
        if geofence_coordinates["latitude"] is None or geofence_coordinates["longitude"] is None:
           raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company coordinates not found or company is not created.")
        
        if not geofence_coordinates:
           raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company coordinates not found.")
       
        company_latitude = float(geofence_coordinates["latitude"])
        company_longitude = float(geofence_coordinates["longitude"])
        geofence_coordinates = (company_latitude, company_longitude)
        
       
        # Get users coordinates from the cookies ###[DOUBT]
        latitude, longitude = attendance_dict["latitude"], attendance_dict["longitude"]
        
        if latitude is None or longitude is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Location data is missing from user.")
        
        #check geofencing (if user within 100 m)
        user_latitude, user_longitude = float(latitude), float(longitude)
        user_coordinates = (user_latitude, user_longitude)
        print(f"User coordinates: {user_coordinates}")
        distance = geodesic(geofence_coordinates, user_coordinates).km
        print(f"Distance:{distance}")
        
        if distance > settings.GEOFENCE_RADIUS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is outside the geofence")
        
        attendance_dict["latitude"] = str(latitude)
        attendance_dict["longitude"] = str(longitude)
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

    async def get_attendance_by_id(self, attendance_id: int) -> Optional[AttendanceResponseSchema]:
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
        user = await self.user_repository.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        username = user.first_name+ " " +user.last_name
        # Fetch attendance records with filters applied
        attendance_records = await self.attendance_repository.get_attendance_by_user(user_id, start_date, end_date)
        
        company_id = await self.companyuser_repository.get_company_id(user_id)
        company_working_hours = await self.company_repository.get_company_working_hours(company_id)
        
        result = []
        for record in attendance_records:
            working_hours = None
            overtime = 0
            
            if record.check_in:
                    if record.check_out:
                        # ✅ Calculate working hours normally
                        working_hours = (datetime.combine(date.today(), record.check_out) -
                                                datetime.combine(date.today(), record.check_in)).seconds / 3600
                        overtime = working_hours - company_working_hours
                        overtime = overtime if overtime > 0 else 0
                    else:
                        # ✅ If check_out is missing, assume they are still working
                        working_hours = (datetime.now() - datetime.combine(date.today(), record.check_in)).seconds / 3600
            else:
                working_hours = None
                
            result.append({
                "id": record.id,
                "user_id": record.user_id,
                "date": record.date,
                "check_in": record.check_in,
                "check_out": record.check_out,
                "status": record.status,
                "name": username,
                "date": record.date,  # Assuming `record` has a `date` field
                "working_hours": working_hours,
                "overtime": overtime,
            })
        

        # Convert records to schema and return
        return result


    async def update_attendance(self, attendance_id: int, attendance_data: AttendanceUpdateSchema) -> Optional[AttendanceResponseSchema]:
        """
        Updates an existing attendance record (Check-in or Check-out).
        :param attendance_id: ID of the attendance record.
        :param attendance_data: Data required for the update.
        :return: The updated AttendanceResponseSchema object if found, otherwise None.
        """

        # Fetch existing attendance record
        existing_attendance = await self.attendance_repository.get_attendance_by_id(attendance_id)
    
        if not existing_attendance:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Attendance record not found.")

        # ✅ Prevent multiple check-outs
        # if existing_attendance.check_out is not None:
        #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User has already been checked out.")

        # ✅ Convert attendance_data to dictionary
        update_dict = attendance_data.model_dump(exclude_unset=True) if hasattr(attendance_data, "model_dump") else attendance_data.dict(exclude_unset=True)

        # ✅ Check if the request is for check-out
        if "check_out" in update_dict:
            # update_dict["check_out"] = datetime.now().time()  # Update check-out time

            # ✅ Calculate work duration & update status
            timezone = pytz.UTC  # Change this if needed
            check_in_time = datetime.combine(existing_attendance.date, existing_attendance.check_in).replace(tzinfo=timezone)
            check_out_time = datetime.combine(existing_attendance.date, update_dict["check_out"]).replace(tzinfo=timezone)
        
            work_duration = check_out_time - check_in_time
            update_dict["status"] = "half-day" if work_duration < timedelta(hours=6) else "full-day"

        # ✅ Update the existing attendance record
        updated_attendance = await self.attendance_repository.update_attendance(attendance_id, update_dict)

        return AttendanceResponseSchema.model_validate(updated_attendance)


    async def delete_attendance(self, attendance_id: int) -> bool:
        """
        Deletes an attendance record by its ID.
        :param attendance_id: ID of the attendance record.
        :return: True if deleted successfully, otherwise False.
        """
        return await self.attendance_repository.delete_attendance(attendance_id)

    async def get_attendance_by_date(self, attendance_date: date, company_id) -> List[AttendanceResponseSchema]:
        """
        Retrieves attendance records by date and fills in absent users.
        :param attendance_date: Date of the attendance records.
        :return: A list of AttendanceResponseSchema objects.
        """
        # ✅ Fetch all users from the database
        all_users = await self.company_repository.get_employees_by_company(company_id)
        if not all_users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found.")
        all_user_ids = {user.id for user in all_users}
        
        company_working_hours = await self.company_repository.get_company_working_hours(company_id)
        if company_working_hours is None:
            company_working_hours = 8  # Default working hours

        # ✅ Get all attendance records for the given date
        attendance_records = await self.attendance_repository.get_attendance_by_date(attendance_date)
        if not attendance_records:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No attendance records found for the given date.")
        
        filtered_attendance_records = [record for record in attendance_records if record.user_id in all_user_ids]
        
        present_user_ids = {record.user_id for record in filtered_attendance_records}

        # ✅ Identify absent users
        absent_user_ids = all_user_ids - present_user_ids  # Users without check-ins

        # ✅ Convert attendance records to response schema
        attendance_list = []
        for record in filtered_attendance_records:
            user_detail = await self.user_repository.get_user_by_id(record.user_id)
            record.name = f"{user_detail.first_name} {user_detail.last_name}"

            if record.check_in:
                if record.check_out:
                    # ✅ Calculate working hours normally
                    record.working_hours = (datetime.combine(date.today(), record.check_out) -
                                            datetime.combine(date.today(), record.check_in)).seconds / 3600
                    overtime = record.working_hours - company_working_hours
                    record.overtime = overtime if overtime > 0 else 0
                else:
                    # ✅ If check_out is missing, assume they are still working
                    record.working_hours = (datetime.now() - datetime.combine(date.today(), record.check_in)).seconds / 3600
            else:
                record.working_hours = None
            
            attendance_list.append(AttendanceResponseSchema.model_validate(record))
 
        # ✅ Add "Absent" records for users with no check-in
        for user_id in absent_user_ids:
            user_detail = await self.user_repository.get_user_by_id(user_id)
            absent_record = AttendanceResponseSchema(
                  # No actual record in DB
                user_id=user_id,
                name=f"{user_detail.first_name} {user_detail.last_name}",
                date=attendance_date,
                check_in=None,
                check_out=None,
                status=AttendanceStatus.ABSENT,
                working_hours=0.0,
                overtime=0.0
            )
            attendance_list.append(absent_record)

        return attendance_list

    async def get_attendance_reports(self, company_id: int, month_name: str, year: int) -> List[AttendanceReportSchema]:
        """
        Retrieves attendance reports for a company.
        :param company_id: ID of the company.
        :return: A list of AttendanceReportSchema objects.
        """
        month_name = month_name.capitalize()
        # ✅ Convert month name to month number
        try:
            month = list(calendar.month_name).index(month_name)
        except ValueError:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid month name. Use full month name like 'February'.")
        
        if month == 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Month name cannot be empty.")
        
        # ✅ Define date range for the selected month
        start_date = date(year, month, 1)
        
        # ✅ Check if the selected month is the current month
        today = date.today()
        if year == today.year and month == today.month:
            end_date = today  # Use today's date if it's the current month
        else:
            end_date = date(year, month, calendar.monthrange(year, month)[1])  # Last day of the month
    
        # ✅ Fetch all employees for the company
        all_users = await self.company_repository.get_employees_by_company(company_id)
        if not all_users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found.")
        
        # ✅ Fetch company holidays
        company_holidays = await self.holiday_repository.get_holidays_by_company(23)
        # Fetch company week_off
        company_week_off = await self.company_repository.get_company_week_off(company_id)
        # ✅ Ensure week_off is a valid list
        if not company_week_off:
            company_week_off = []

        
        # ✅ Convert holidays into a set for the selected month
        holiday_dates = {holiday.holiday_date for holiday in company_holidays if start_date <= holiday.holiday_date <= end_date}
        
        # ✅ Convert company week_off into actual dates in the full period
        week_off_dates = set()
        days_range = (end_date - start_date).days + 1
        for day_offset in range(days_range):  
            current_date = start_date + timedelta(days=day_offset)
            if current_date.strftime("%A") in company_week_off:
                week_off_dates.add(current_date)
                
        # ✅ Combine company holidays & week_off dates
        non_working_days = holiday_dates.union(week_off_dates)



        # ✅ Initialize report structure
        report_dict = {
            user.id: {
                "id": str(user.id),  # Ensure UUID is passed as a string
                "employee_id": user.employee_id,  # Ensure this is an integer
                "name": f"{user.first_name} {user.last_name}",
                "days_absent": 0,
                "half_days": 0,
                "deficit_hours": 0.0
            }
            for user in all_users
        }

        # ✅ Iterate over each user and fetch their attendance records
        for user in all_users:
            user_id = user.id
            attendance_records = await self.attendance_repository.get_attendance_by_user(user_id, start_date, end_date)

            if not attendance_records:
                # ✅ If the user has no attendance records, assume they haven't started yet.
                continue

            # ✅ Get the first attendance date of the user
            first_attendance = min(record.date for record in attendance_records)
            # ✅ Skip users who joined after the selected months
            if first_attendance > end_date:
                continue

            total_absent_days = 0
            total_half_days = 0
            total_deficit_hours = 0.0

            # ✅ Track attended dates
            attended_dates = {record.date for record in attendance_records}

            # ✅ Loop through each working day in the full range
            for single_date in (start_date + timedelta(days=n) for n in range(days_range)):
                if single_date in non_working_days:  
                    continue  # ✅ Skip non-working days

                if single_date < first_attendance:
                    # ✅ Skip days before the user's first recorded attendance
                    continue

                # ✅ Check if user attended that day
                user_record = next((r for r in attendance_records if r.date == single_date), None)

                if not user_record:
                    total_absent_days += 1
                    continue

                # ✅ Calculate working hours if check-in and check-out exist
                working_hours = 0.0
                if user_record.check_in and user_record.check_out:
                    working_hours = (datetime.combine(date.today(), user_record.check_out) - 
                                     datetime.combine(date.today(), user_record.check_in)).seconds / 3600

                # ✅ Identify half-day and deficit hours
                if 4 <= working_hours < 6:
                    total_half_days += 1
                elif working_hours < 8:
                    total_deficit_hours += (8 - working_hours)

            # ✅ Update report data
            report_dict[user_id]["days_absent"] = total_absent_days
            report_dict[user_id]["half_days"] = total_half_days
            report_dict[user_id]["deficit_hours"] = round(total_deficit_hours, 2)

        # ✅ Convert report dictionary to list of schemas
        return [AttendanceReportSchema(**data) for data in report_dict.values()]
    
    
    async def get_attendance_summary(self, company_id: int) -> AttendanceSummarySchema:
        """
        Retrieves attendance summary for a company.
        :param company_id: ID of the company.
        :return: AttendanceSummarySchema object.
        """
        # ✅ Fetch all employees for the company
        all_users = await self.company_repository.get_employees_by_company(company_id)
        if not all_users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found.")

        total_employees = len(all_users)
        all_user_ids = {user.id for user in all_users}

        # ✅ Get attendance records for today
        today = date.today()
        attendance_records = await self.attendance_repository.get_attendance_by_date(today)

        # ✅ Filter records belonging to the company
        filtered_attendance_records = [record for record in attendance_records if record.user_id in all_user_ids]
        present_user_ids = {record.user_id for record in filtered_attendance_records}
        
        # ✅ Number of employees present today
        present_today = len(present_user_ids)


        # ✅ Identify absent users
        absent_user_ids = all_user_ids - present_user_ids  # Users without check-ins
        absentees_today = len(absent_user_ids)

        # ✅ Calculate late comers (check-in time available and is late)
        late_comings_today = sum(
            1 for record in filtered_attendance_records if record.check_in and record.check_in.hour > 10
        )  # Assuming 10 AM as cutoff time

        # ✅ Department-wise attendance
        department_wise_attendance: Dict[str, Dict[str, int]] = {}
        for user in all_users:
            dept = user.department if user.department else "Unknown"
            if dept not in department_wise_attendance:
                department_wise_attendance[dept] = {"present": 0, "absent": 0}

            if user.id in present_user_ids:
                department_wise_attendance[dept]["present"] += 1
            else:
                department_wise_attendance[dept]["absent"] += 1

        # ✅ Calculate overall attendance percentage
        present_count = total_employees - absentees_today
        overall_attendance = {
            "present": round((present_count / total_employees) * 100, 2),
            "absent": round((absentees_today / total_employees) * 100, 2),
        }

        return AttendanceSummarySchema(
            total_employees=total_employees,
            present_today=present_today,
            absentees_today=absentees_today,
            late_comings_today=late_comings_today,
            department_wise_attendance=department_wise_attendance,
            overall_attendance=overall_attendance
        )
        
    async def get_attendance_summary_by_user(self, user_id: int) -> DashboardSummarySchema:
        """
        Retrieves attendance summary for a specific user.
        :param user_id: ID of the user.
        :return: DashboardSummarySchema object.
        """
        # Fetch upcoming holidays
        upcoming_holidays = await self.holiday_repository.get_upcoming_holidays_for_user(23)
        upcoming_holiday = (
            HolidaySchema(name=upcoming_holidays[0].holiday_name, date=str(upcoming_holidays[0].holiday_date))
            if upcoming_holidays else None
        )

        # Fetch attendance records
        attendance_records = await self.attendance_repository.get_attendance_by_user(user_id)
        if not attendance_records:
            return DashboardSummarySchema(
                upcoming_holiday=upcoming_holiday,
                total_invested_time=0,
                total_overtime=0,
                total_present_days=0,
                total_absent_days=0,
                login_overtime_trends={}
            )

        # First & last attendance dates
        first_attendance = min(record.date for record in attendance_records)
        last_attendance = max(record.date for record in attendance_records)
        start_date, end_date = first_attendance, last_attendance

        # Get company working hours
        company = await getTenantInfo(user_id)
        company_working_hours = company.working_hours

        # Fetch holidays & week-offs
        company_holidays = await self.holiday_repository.get_holidays_by_company(23)
        holiday_dates = {holiday.holiday_date for holiday in company_holidays if start_date <= holiday.holiday_date <= end_date}
        company_week_off = await self.company_repository.get_company_week_off(company.id) or []

        # Convert week-offs into actual dates
        week_off_dates = set()
        for day_offset in range((end_date - start_date).days + 1):
            current_date = start_date + timedelta(days=day_offset)
            if current_date.strftime("%A") in company_week_off:
                week_off_dates.add(current_date)

        # Non-working days (holidays + week-offs)
        non_working_days = holiday_dates.union(week_off_dates)

        # Attended dates & working days
        attended_dates = {record.date for record in attendance_records if record.check_in and record.check_out}
        all_working_days = {start_date + timedelta(days=n) for n in range((end_date - start_date).days + 1)} - non_working_days

        # Calculate present & absent days
        total_present_days = len(attended_dates)
        total_absent_days = len(all_working_days - attended_dates)

        # Group attendance by month
        login_overtime_trends = {}
        total_invested_hours, total_overtime_hours = 0, 0

        for record in attendance_records:
            if record.date in non_working_days or not (record.check_in and record.check_out):
                continue  # Skip non-working days or incomplete records
            
            check_in_datetime = datetime.combine(record.date, record.check_in)
            check_out_datetime = datetime.combine(record.date, record.check_out)

        
            worked_hours = (check_out_datetime - check_in_datetime).total_seconds() / 3600
            month_key = record.date.strftime("%Y-%m")
            if month_key not in login_overtime_trends:
                login_overtime_trends[month_key] = {"login_hours": 0, "working_days": 0}

            login_overtime_trends[month_key]["login_hours"] += worked_hours
            login_overtime_trends[month_key]["working_days"] += 1

        # Compute final overtime trends
        final_trends = {}
        for month, data in login_overtime_trends.items():
            total_company_hours = company_working_hours * data["working_days"]
            overtime = max(0, data["login_hours"] - total_company_hours)
            total_invested_hours += data["login_hours"]
            total_overtime_hours += overtime

            final_trends[month] = LoginOvertimeTrendSchema(
                login_hours=round(data["login_hours"], 2),
                overtime=round(overtime, 2),
                company_hours=round(total_company_hours, 2)
            )

        return DashboardSummarySchema(
            upcoming_holiday=upcoming_holiday,
            total_invested_time=round(total_invested_hours, 2),
            total_overtime=round(total_overtime_hours, 2),
            total_present_days=total_present_days,
            total_absent_days=total_absent_days,
            login_overtime_trends=final_trends
        )
