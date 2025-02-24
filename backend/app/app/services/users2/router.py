from fastapi import APIRouter, Depends, Request
from services.users2.repository import UserRepository
from services.users2.schema import UserSchema
from services.users2.services import UserService

MyUserRouter = APIRouter(prefix="/users", tags=["User-Management"])

# # Login Endpoint
@MyUserRouter.post("/login_user",
                #    response_model=UserSchema,
                    description="Login the user")
async def login_user(
    email: str,
    password: str,
    user_service: UserService = Depends((lambda: UserService(auth_repository=UserRepository()))),
):
    """
    Handle user login, check credentials, and generate a JWT token.
    """
    # Validate user login credentials (email/username and password)
    return await user_service.login(email, password)
    
# Logout Endpoint
# @UserRouter.post("/logout", description="Logout the user")
# async def logout(request: Request, current_user: BaseUser = Depends(auth_backend.get_current_user)):
#     """
#     Handle user logout by invalidating the session/token.
#     """
#     # Invalidate the session or token, typically done client-side (frontend) by removing the token
#     # If your app uses token-based authentication, you'll rely on the frontend to remove the token
#     return {"message": "User logged out successfully"}

# @MyUserRouter.post("/login_user",
#                    response_model=None,  # Remove UserSchema, since JWT is returned
#                    description="Login the user")
# async def login(
#     email: str,
#     password: str,
#     user_service: UserService = Depends(),
# ):
#     """
#     Handle user login, check credentials, and generate a JWT token.
#     """
#     return await user_service.login(email, password)  # Returns a dict



