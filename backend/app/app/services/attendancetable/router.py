from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from uuid import UUID
from datetime import date
from services.attendancetable.service import AttendanceService
from services.attendancetable.schema import (
    AttendanceSchema, AttendanceUpdateSchema, AttendanceResponseSchema
)

MyAttendanceRouter = APIRouter(prefix="/attendance", tags=["Attendance"])

### **Create Attendance**
@MyAttendanceRouter.post("/create", response_model=AttendanceResponseSchema, status_code=201)
async def create_attendance(
    attendance: AttendanceSchema, 
    service: AttendanceService = Depends()
):
    return await service.create_attendance(attendance)

### **Get Attendance by ID**
@MyAttendanceRouter.get("/{attendance_id}", response_model=AttendanceResponseSchema)
async def get_attendance_by_id(
    attendance_id: int, 
    service: AttendanceService = Depends()
):
    attendance_record = await service.get_attendance_by_id(attendance_id)
    if not attendance_record:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return attendance_record

### **Get Attendance for a User (Optional Date Filter)**
@MyAttendanceRouter.get("/user/{user_id}", response_model=List[AttendanceResponseSchema])
async def get_attendance_by_user(
    user_id: UUID, 
    date: Optional[date] = None, 
    service: AttendanceService = Depends()
):
    return await service.get_attendance_by_user(user_id, date)

###  **Update Attendance**
@MyAttendanceRouter.patch("/{attendance_id}", response_model=AttendanceResponseSchema)
async def update_attendance(
    attendance_id: int, 
    update_data: AttendanceUpdateSchema, 
    service: AttendanceService = Depends()
):
    updated_attendance = await service.update_attendance(attendance_id, update_data)
    if not updated_attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return updated_attendance

###  **Delete Attendance**
@MyAttendanceRouter.delete("/{attendance_id}", response_model=dict)
async def delete_attendance(
    attendance_id: int, 
    service: AttendanceService = Depends()
):
    deleted = await service.delete_attendance(attendance_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return {"message": "Attendance record deleted successfully"}
