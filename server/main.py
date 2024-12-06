from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from .models import Contact, Project, User
from .database import get_session
from .auth import create_access_token, oauth2_scheme
from typing import List
import os
from supabase import create_client

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# Projects endpoints
@app.get("/api/projects", response_model=List[Project])
def get_projects(category: str = None, session: Session = Depends(get_session)):
    query = select(Project)
    if category:
        query = query.where(Project.category == category)
    return session.exec(query).all()

@app.post("/api/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/projects")
def create_project(project: Project, token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    # Only authenticated users can create projects
    session.add(project)
    session.commit()
    session.refresh(project)
    return project
@app.post("/api/contact")
async def create_contact(contact: Contact, session: Session = Depends(get_session)):
    try:
        session.add(contact)
        session.commit()
        session.refresh(contact)
        
        # Also store in Supabase if needed
        supabase.table("contacts").insert({
            "name": contact.name,
            "email": contact.email,
            "message": contact.message
        }).execute()
        
        return {"status": "success", "data": contact}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get all contacts
@app.get("/api/contacts", response_model=List[Contact])
def get_contacts(session: Session = Depends(get_session)):
    contacts = session.exec(select(Contact)).all()
    return contacts

# Get contact by ID
@app.get("/api/contacts/{contact_id}")
def get_contact(contact_id: int, session: Session = Depends(get_session)):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

# Delete contact
@app.delete("/api/contacts/{contact_id}")
def delete_contact(contact_id: int, session: Session = Depends(get_session)):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    session.delete(contact)
    session.commit()
    return {"status": "success", "message": "Contact deleted"}

# Update contact
@app.put("/api/contacts/{contact_id}")
def update_contact(contact_id: int, contact_data: Contact, session: Session = Depends(get_session)):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    contact_data_dict = contact_data.dict(exclude_unset=True)
    for key, value in contact_data_dict.items():
        setattr(contact, key, value)
    
    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact