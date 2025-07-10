# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from .env (EMAIL_ADDRESS, EMAIL_PASSWORD)
load_dotenv()

app = FastAPI()

# Allow all typical Vite dev ports (5173‒5179) during local development
vite_ports = [f"http://localhost:{p}" for p in range(5173, 5180)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=vite_ports,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----- Email endpoint -------------------------------------------------------


class MailRequest(BaseModel):
    email: str
    message: str


@app.post("/api/send-email")
async def send_email(req: MailRequest):
    """Receive contact-form data and forward it via Gmail SMTP."""
    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

    if not (EMAIL_ADDRESS and EMAIL_PASSWORD):
        raise HTTPException(status_code=500, detail="Email credentials not configured")

    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = EMAIL_ADDRESS
    msg["Reply-To"] = req.email
    msg["Subject"] = f"Contact form: {req.email}"
    msg.attach(MIMEText(req.message, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")

    return {"message": "Email sent successfully"}


@app.get("/")
def read_root():
    return {"message": "Hello from the backend!"}
