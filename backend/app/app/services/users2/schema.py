from pydantic import BaseModel

class UserSchema(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool

    class Config:
        orm_mode = True