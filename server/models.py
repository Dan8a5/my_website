from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Contact(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    category: str
    image_url: str
    project_url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
