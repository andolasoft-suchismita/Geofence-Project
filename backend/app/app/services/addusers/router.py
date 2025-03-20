from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from services.users.model import User
from services.addusers.service import AddUserService
from services.addusers.schema import AddUserSchema, UpdateUserSchema, UserResponseSchema
from typing import List, Optional
from uuid import UUID
from fastapi_query.pagination import PaginationParams
from services.auth.manager import current_super_user

AddUserRouter = APIRouter(prefix="/users", tags=["User-Management"])

# Create a new User
@AddUserRouter.post("/", response_model=UserResponseSchema, status_code=201)
async def create_user(user: AddUserSchema, 
                      current_user :User= Depends(current_super_user),
                      service: AddUserService = Depends()):
    return await service.create_adduser(user,current_user)

# Get User by ID
@AddUserRouter.get("/{user_id}", response_model=UserResponseSchema)
async def get_user(user_id: UUID, current_iuser :User= Depends(current_super_user), service: AddUserService = Depends()):
    user = await service.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Update User
@AddUserRouter.put("/{user_id}", response_model=UserResponseSchema)
async def update_user(user_id: UUID, user_data: UpdateUserSchema,  current_iuser :User= Depends(current_super_user), service: AddUserService = Depends()):
    updated_user = await service.update_user(user_id, user_data)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found or update failed")
    return updated_user

# List Users with Pagination and Optional Filtering
# @AddUserRouter.get("/", response_model=List[UserResponseSchema])
# async def list_users(
#     pagination_params: PaginationParams = Depends(),
#     search: Optional[str] = None,  # Example filter: Search by name, email, etc.
#     service: AddUserService = Depends(),
# ):
#     filters = {"search": search} if search else {}
#     return await service.list_users(filters, pagination_params, None)

# Delete User
@AddUserRouter.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: UUID, current_iuser :User= Depends(current_super_user), service: AddUserService = Depends()):
    deleted = await service.delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}
