from fastapi import Depends
from services.company.schema import CompanyBaseResponse
from services.users.repository import UserRepository
from services.users.schema import UserTenantsBaseRespone
from services.users.schema import UserTenantsBaseRespone
from utility.tenant_info import getTenantInfo

class UserService:
    userRepository: UserRepository
    def __init__(self, userRepository: UserRepository = Depends(UserRepository)) -> None:
        self.userRepository = userRepository

    async def list_tenant(self, user_id) -> UserTenantsBaseRespone:
        tenant_info = await getTenantInfo(str(user_id), all_list=True)
        tenants_response = []

        for tenant in tenant_info:
            tenant_response = CompanyBaseResponse(  # Use CompanyBaseResponse instead of UserTenantsBaseRespone
                id=tenant.id,
                name=tenant.name
            )
            tenants_response.append(tenant_response)

        return UserTenantsBaseRespone(
            user_id=user_id,
            tenants=tenants_response,
            items=len(tenants_response),  # Ensure 'items' is included
            meta=None
        )
