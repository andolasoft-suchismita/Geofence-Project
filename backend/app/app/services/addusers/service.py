from typing import List
from fastapi import Depends
from services.addusers.model import AddUser
from services.addusers.repository import AddUserRepository
from services.addusers.schema import AddUserBaseCreate


class AddUserService:
    adduserRepository: AddUserRepository
    
    def __init__(self, adduserRepository: AddUserRepository = Depends()) -> None:
        self.adduserRepository = adduserRepository
        
    async def create(self, adduser_body: AddUserBaseCreate) -> AddUser:
        adduser_instance = AddUser(**adduser_body.dict())
        return await self.adduserRepository.create(adduser_instance)