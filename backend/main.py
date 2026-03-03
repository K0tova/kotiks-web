# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from starlette.middleware.base import BaseHTTPMiddleware
from pydantic import BaseModel
import smtplib
import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

# Load environment variables from .env (EMAIL_ADDRESS, EMAIL_PASSWORD)
load_dotenv()

app = FastAPI()

# Allow all typical Vite dev ports (5173‒5179) during local development
vite_ports = [f"http://localhost:{p}" for p in range(5173, 5180)]

# Production frontend hosted on Vercel
production_origins = [
    "https://kotiks-web.vercel.app",
]

ALLOWED_ORIGINS = set(vite_ports + production_origins)


class AddCORSHeadersMiddleware(BaseHTTPMiddleware):
    """Ensure CORS headers are on every response (including errors)."""
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        origin = request.headers.get("origin")
        if origin and (origin in ALLOWED_ORIGINS or origin.endswith(".vercel.app")):
            response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response


# Add CORS-first so it runs last (wraps all responses)
app.add_middleware(AddCORSHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=vite_ports + production_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----- Email endpoint -------------------------------------------------------


class MailRequest(BaseModel):
    email: str
    message: str


@app.options("/api/send-email")
async def send_email_options():
    """Handle CORS preflight for the contact form."""
    return Response(status_code=200)


# SMTP timeout (seconds) – fail fast instead of hanging until worker timeout
SMTP_TIMEOUT = 20


@app.post("/api/send-email")
async def send_email(req: MailRequest):
    """Receive contact-form data and forward it via Gmail SMTP."""
    log.info("send_email called from %s", req.email)
    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

    if not (EMAIL_ADDRESS and EMAIL_PASSWORD):
        log.error("Email credentials not configured")
        raise HTTPException(status_code=500, detail="Email credentials not configured")

    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = EMAIL_ADDRESS
    msg["Reply-To"] = req.email
    msg["Subject"] = f"Contact form: {req.email}"
    msg.attach(MIMEText(req.message, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=SMTP_TIMEOUT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        log.info("Email sent successfully for %s", req.email)
    except Exception as e:
        log.exception("Failed to send email: %s", e)
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")

    return {"message": "Email sent successfully"}


@app.get("/")
def read_root():
    return {"message": "Hello from the backend!"}


@app.get("/api/health")
def health():
    """Lightweight health check for Render and debugging."""
    return {"status": "ok"}
