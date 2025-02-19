from typing import List
from fastapi import Depends
from services.auth.registered_users.model import RegisteredUser
from services.auth.registered_users.repository import RegisteredUserRepository
from services.auth.registered_users.schema import RegisteredusersBaseCreate




class RegisteredUserService:
    registereduserRepository: RegisteredUserRepository

    def __init__(self, registereduserRepository: RegisteredUserRepository = Depends()) -> None:
        self.registereduserRepository = registereduserRepository

    async def create(self, registereduser_body: RegisteredusersBaseCreate) -> RegisteredUser:
        registereduser_instance = RegisteredUser(**registereduser_body.dict())
        return await self.registereduserRepository.create(registereduser_instance)
    

    


    
    async def list_registeredusers(self,filter_params, pagination_params, order_by) -> List[RegisteredUser]:
        return await self.registereduserRepository.list(filter_params, pagination_params, order_by)