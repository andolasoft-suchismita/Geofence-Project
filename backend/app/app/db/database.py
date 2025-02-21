"""
Copyright (c) 2024 AndolaSoft Inc

All rights reserved. This code contains proprietary and confidential
information of AndolaSoft Ince and is not to be disclosed, reproduced,
or distributed without prior written permission from AndolaSoft.
"""

import time
from fastapi import Depends, HTTPException
from services.users.model import User, OAuthAccount
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from typing import AsyncGenerator
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import as_declarative, declared_attr,declarative_base
from sqlalchemy.orm import sessionmaker, session
from config.settings import settings
from fastapi_users.db import SQLAlchemyUserDatabase


engine = create_async_engine(settings.DATABASE_URI,
                            pool_size=settings.POOL_SIZE,
                            max_overflow=settings.MAX_OVERFLOW,
                            pool_timeout=settings.POOL_TIMEOUT,
                            pool_recycle=settings.POOL_RECYCLE,
                            )
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


Base=declarative_base()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()

async def get_user_db(session: AsyncSession = Depends(get_db)):
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)



# Function to create tables automatically
async def init_db():
    print("Initializing Database...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ All tables created successfully!")