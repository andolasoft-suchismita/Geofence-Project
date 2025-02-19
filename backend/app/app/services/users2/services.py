from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
import os
from services.users.model import User
from services.users2.repository import UserRepository

# class UserService:
#     def __init__(self, auth_repository: UserRepository):
#         self.auth_repository = auth_repository
#         self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#         self.secret_key = os.getenv("JWT_SECRET_KEY")
#         self.algorithm = os.getenv("JWT_ALGORITHM")
#         self.access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 86400))

#     async def authenticate_user(self, email: str, password: str):
#         """Authenticate the user by validating the password"""
#         user = await self.auth_repository.get_user_by_email(email)
#         if not user:
#             raise ValueError("Invalid credentials: User not found.")
#         if not self.pwd_context.verify(password, user.password):
#             raise ValueError("Invalid credentials: Incorrect password.")
#         return user

#     async def create_access_token(self, user: User) -> str:
#         """Generate an access token for the authenticated user"""
#         to_encode = {"sub": str(user.id)}
#         expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
#         to_encode.update({"exp": expire})
#         encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
#         return encoded_jwt

#     async def login(self, email: str, password: str):
#         """Authenticate the user and return the access token"""
#         user = await self.authenticate_user(email, password)
#         token = await self.create_access_token(user)
#         return {"access_token": token, "token_type": "bearer"}



class UserService:
    def __init__(self, auth_repository: UserRepository):
        self.auth_repository = auth_repository
        self.pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
        self.secret_key = os.getenv("JWT_SECRET_KEY")
        self.algorithm = os.getenv("JWT_ALGORITHM")
        self.access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 86400))

    async def authenticate_user(self, email: str, password: str):
        """Authenticate the user by validating the password"""
        #### here make the paswd hashable
        # hashed_password = hash_password_sha256(password)

        user = await self.auth_repository.get_user_by_email(email)
        if not user:
            raise ValueError("Invalid credentials: User not found.")
        ####### check the paswd and gthe user paswd is correct
        
        # if hashed_password != user.hashed_password:
        #     raise ValueError("Invalid credentials: Incorrect password.")


        if not self.pwd_context.verify(password, user.hashed_password):
            raise ValueError("Invalid credentials: Incorrect password.")
        return user

    async def create_access_token(self, user: User) :
        """Generate an access token for the authenticated user"""
        to_encode = {"sub": str(user.id)}
        expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    async def login(self, email: str, password: str):
        """Authenticate the user and return the access token"""
        user = await self.authenticate_user(email, password)
        token = await self.create_access_token(user)
        # return user
        return {"access_token": token, "token_type": "bearer"}
