from typing import List
from fastapi import Depends
from utility.get_tenant_name import getTenantInfo
from services.companyuser.repository import CompanyUserRepository
from services.companyuser.model import CompanyUser
from services.users.model import User
from services.addusers.repository import AddUserRepository
from services.addusers.schema import AddUserSchema
from typing import List, Optional
from services.addusers.schema import AddUserSchema, UpdateUserSchema
from uuid import UUID
from fastapi_query.pagination import PaginationParams
from passlib.context import CryptContext



class AddUserService:
    """
    Service class responsible for handling business logic related to user operations.
    """

    def __init__(self, adduser_repository: AddUserRepository = Depends()) -> None:
        self.adduser_repository = adduser_repository
        self.pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
        self.company_user_repository =  CompanyUserRepository()

    async def create_adduser(self, adduser_data: AddUserSchema,current_super_user:User) -> User:
        """
        Creates a new user record.
        :param adduser_data: Data required to create a user.
        :return: The created User object.
        """
        super_user_company = await getTenantInfo(current_super_user.id)
        # super_user_company = await self.company_user_repository.get_tenant_user_detail(str(current_super_user.id))
        db_hashed_password = self.pwd_context.hash(adduser_data.hashed_password)
        adduser_data.hashed_password = db_hashed_password
        
        adduser_instance = User(**adduser_data.dict())
        user_created = await self.adduser_repository.create_user(adduser_instance)
        
        company_user_instance = CompanyUser(
               company_id=super_user_company.id,
               user_id=str(user_created.id),
               user_type="user",
               status="active",
            )
        await self.company_user_repository.create(company_user_instance)

        return user_created

    async def get_user(self, user_id: UUID) -> Optional[User]:
        """
        Retrieves a user by their UUID.
        :param user_id: UUID of the user.
        :return: The User object if found, otherwise None.
        """
        return await self.adduser_repository.get_user(user_id)

    async def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Retrieves a user by their email address.
        :param email: Email of the user.
        :return: The User object if found, otherwise None.
        """
        return await self.adduser_repository.get_user_by_email(email)

    async def update_user(self, user_id: UUID, user_data: UpdateUserSchema) -> Optional[User]:
        """
        Updates an existing user.
        :param user_id: UUID of the user.
        :param user_data: Data required for the update.
        :return: The updated User object if found, otherwise None.
        """
        existing_user = await self.adduser_repository.get_user(user_id)
        if not existing_user:
            return None  # User not found

        for key, value in user_data.dict(exclude_unset=True).items():
            setattr(existing_user, key, value)

        return await self.adduser_repository.update_user(existing_user)

    # async def list_users(self, filter_params, pagination_params: PaginationParams, order_by) -> List[User]:
    #     """
    #     Retrieves a paginated list of users.
    #     :return: A list of User objects.
    #     """
    #     return await self.adduser_repository.list_users(filter_params, pagination_params, order_by)

    async def delete_user(self, user_id: UUID) -> bool:
        """
        Deletes a user by their UUID.
        :param user_id: UUID of the user.
        :return: True if deleted successfully, otherwise False.
        """
        return await self.adduser_repository.delete_user(user_id)
    
    async def list_users(self):
       return await self.adduser_repository.list_users()  # No pagination params
