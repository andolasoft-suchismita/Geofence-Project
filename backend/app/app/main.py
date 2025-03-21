"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from services.companyevent.router import CompanyEventRouter
from services.users.router import UserRouter
from services.users2.router import MyUserRouter
from services.company.router import MyCompanyRouter
from services.addusers.router import AddUserRouter
from services.companyholiday.router import CompanyHolidayRouter
from services.attendance.router import MyAttendanceRouter
from config.settings import settings
from services.auth.manager import (
    auth_backend,
    current_active_user,
    fastapi_users,
)
from services.auth.schema import UserCreate, UserRead, UserUpdate
from services.auth.registered_users.router import Registered_UsersRouter


from services.users.model import User

# Import database initialization from database.py
from db.database import init_db



def get_application():
    _app = FastAPI(
        # title=settings.PROJECT_NAME, docs_url="/v1", lifespan=os_lifespan
        title=settings.PROJECT_NAME, docs_url="/v1"
    )  ## Adding lifespan events

    _app.add_middleware(
        CORSMiddleware,
        # allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return _app


app = get_application()



def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Baseleaf Construction API",
        version="0.1.0",
        description="Baseleaf module for Construction Industry",
        routes=app.routes,
    )
  
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


# Router or Auth
app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/v1/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/v1/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/v1/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/v1/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/v1/users",
    tags=["users"],
)


# app.include_router(UserAuthRouter)

# Add Routers for Leads
registeredusers_app = FastAPI()
registeredusers_app.include_router(Registered_UsersRouter)

users_app = FastAPI()
users_app.include_router(UserRouter)
MyUserApp = FastAPI()
MyUserApp.include_router(MyUserRouter)

MyCompanyApp = FastAPI()
MyCompanyApp.include_router(MyCompanyRouter)

MyAddUserApp = FastAPI()
MyAddUserApp.include_router(AddUserRouter)

MyCompanyHolidayApp = FastAPI()
MyCompanyHolidayApp.include_router(CompanyHolidayRouter)

MyAttendanceApp = FastAPI()
MyAttendanceApp.include_router(MyAttendanceRouter)

MyCompanyEventApp = FastAPI()
MyCompanyEventApp.include_router(CompanyEventRouter)


app.mount("/registeredusersapi", registeredusers_app)
app.mount("/usersapi", users_app)
app.mount("/users2api", MyUserApp)
app.mount("/company", MyCompanyApp)
app.mount("/users", MyAddUserApp)
app.mount("/companyholidays", MyCompanyHolidayApp)
app.mount("/attendance", MyAttendanceApp)
app.mount("/companyevent", MyCompanyEventApp)


# Run `init_db()` on app startup
@app.on_event("startup")
async def startup_event():
    await init_db() 