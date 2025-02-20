from typing import List
from fastapi import Depends
from services.users.model import User
from services.addusers.repository import AddUserRepository
from services.addusers.schema import AddUserSchema
from typing import List, Optional
from services.addusers.schema import AddUserSchema, UpdateUserSchema
from uuid import UUID
from fastapi_query.pagination import PaginationParams


class AddUserService:
    """
    Service class responsible for handling business logic related to user operations.
    """

    def __init__(self, adduser_repository: AddUserRepository = Depends()) -> None:
        self.adduser_repository = adduser_repository

    async def create_adduser(self, adduser_data: AddUserSchema) -> User:
        """
        Creates a new user record.
        :param adduser_data: Data required to create a user.
        :return: The created User object.
        """
        adduser_instance = User(**adduser_data.dict())
        return await self.adduser_repository.create_user(adduser_instance)

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

    async def list_users(self, filter_params, pagination_params: PaginationParams, order_by) -> List[User]:
        """
        Retrieves a paginated list of users.
        :return: A list of User objects.
        """
        return await self.adduser_repository.list_users(filter_params, pagination_params, order_by)

    async def delete_user(self, user_id: UUID) -> bool:
        """
        Deletes a user by their UUID.
        :param user_id: UUID of the user.
        :return: True if deleted successfully, otherwise False.
        """
        return await self.adduser_repository.delete_user(user_id)
