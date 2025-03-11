"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""
from sqlalchemy import UUID, or_, select
from db.database import get_db
# from services.resources.model import Resource
from services.users.model import TempMobileAuth, User
from typing import List
from fastapi_query.ext.sqlalchemy import (
    paginate_async as paginate
)
from fastapi_query.pagination import PaginationParams


class UserRepository:
    """Repository responsible for performing operations (CRUD, etc) on User table."""

    def __init__(self) -> None:
        # self.db: Session = get_db()
        pass
    async def create_user(self, user_detail):
        """
        This method is responsible for creating a new user_detail object.

        :return: the user_detail object
        """        
        async for session in get_db():
            async with session.begin():
                session.add(user_detail)
            await session.commit()
            await session.refresh(user_detail)
        return user_detail
    
    async def get_by_email(self, email: str) -> User | None:
        """
        This method is returns a User object.
        param: email

        :return: the User object
        """
        async for session in get_db():
            stmt = select(User).where(User.email == email)
            query = await session.execute(stmt)
            user = query.scalars().first()
            if user is not None:
                return user
        return None



    async def update(self, user: User) -> User:        
        async for session in get_db():
            async with session.begin():
                updated_user = await session.merge(user)
                # await session.merge(Tenant)
            await session.commit()
            await session.refresh(updated_user)
        return updated_user
    

    async def get_timezone_user_id(self, user_id):
        async for session in get_db():
            async with session.begin():
                stmt = select(User.time_zone, User.time_format,User.file_id).where(User.id == user_id)
                result = await session.execute(stmt)
                user_info = result.fetchone()
                if user_info:
                    return {
                        "time_zone": user_info[0],
                        "time_format": user_info[1],
                        "file_id"  :user_info[2]
                    }
                return None
            
    async def list(self,filter_params, pagination_params: PaginationParams, order_by) -> List[User]:
        async for session in get_db():
            async with session.begin():
                stmt = select(User)
                results = await paginate(
                    db=session,
                    model_class=User,
                    stmt=stmt,
                    pagination_params=pagination_params,
                    filter_params=filter_params,    
                    ordering_params=order_by
                )

        return results
    
    async def get_by_id(self,user_id: int) -> User:
        async for session in get_db():
            query = select(User).filter(User.id == user_id)
            result = await session.execute(query)
            return result.scalars().first()
    
    async def get_by_mobile_number(self,mobile_number:str) -> User:
        async for session in get_db():
            query = select(User).filter(User.phone_number == mobile_number)
            result = await session.execute(query)
            return result.scalars().first()


    async def get_data_from_mobile_auth(self, mobile_number=None, mail=None):
        """
        Retrieve data from TempMobileAuth based on mobile number or email.
        Both mobile_number and mail are optional.
        """
        async for session in get_db():
            query = select(TempMobileAuth)   
            if mobile_number and mail:
                query = query.filter(
                    or_(
                        TempMobileAuth.mobile_number == mobile_number,
                        TempMobileAuth.mail == mail
                    )
                )
            elif mobile_number:
                query = query.filter(TempMobileAuth.mobile_number == mobile_number)
            elif mail:
                query = query.filter(TempMobileAuth.mail == mail)

            # Execute the query and return the result
            result = await session.execute(query)
            return result.scalars().first()
    
    async def get_data_by_token(self,token):
        async for session in get_db():
            query = select(TempMobileAuth).filter(TempMobileAuth.token  == token)
            result = await session.execute(query)
            return result.scalars().first()
        
    async def create_temp_data(self, temp_mobile_auth_data: TempMobileAuth) -> TempMobileAuth:
        """
        This method is responsible for creating a new temp_mobile_auth_data object.

        :return: the temp_mobile_auth_data object
        """        
        async for session in get_db():
            async with session.begin():
                session.add(temp_mobile_auth_data)
            await session.commit()
            await session.refresh(temp_mobile_auth_data)
        return temp_mobile_auth_data
    
    async def update_temp_data(self, temp_mobile_auth_data: TempMobileAuth) -> TempMobileAuth:        
        async for session in get_db():
            async with session.begin():
                updated_temp_mobile_auth_data = await session.merge(temp_mobile_auth_data)
                # await session.merge(Tenant)
            await session.commit()
            await session.refresh(updated_temp_mobile_auth_data)
        return updated_temp_mobile_auth_data
    
    async def get_user_by_id(self, user_id: UUID) -> User:
        async for session in get_db():
            query = select(User).filter(User.id == user_id)
            result = await session.execute(query)
            return result.scalars().first()