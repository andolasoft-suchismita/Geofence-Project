from sqlalchemy import Column, DateTime, Integer, String, TIMESTAMP, func, text
from sqlalchemy.dialects.mysql import BIGINT, TINYINT
from sqlalchemy.orm import Mapped, declarative_base, mapped_column
from sqlalchemy.orm.base import Mapped

Base = declarative_base()


class RegisteredUser(Base):
    __tablename__ = 'registered_users'

    id = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    email = mapped_column(String(255), nullable=False)
    created_at = mapped_column(DateTime, nullable=False, default=func.now())
    updated_at = mapped_column(DateTime, nullable=False, default=func.now())
    is_converted = mapped_column(TINYINT(1), server_default=text('0'))
