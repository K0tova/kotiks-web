# Kotiks Web

Personal website project – React (Vite) + FastAPI – containerised for **local development** with Docker Compose. The React frontend is deployed via **Vercel** on every push to `main`.

**Production URL:** https://kotiks-web.vercel.app/

## Quick start (development)

```bash
# first time only
cp .env.example .env     # fill EMAIL_ADDRESS, EMAIL_PASSWORD, etc.

# build & run with hot-reload
docker compose -f docker-compose.dev.yml up --build
```

* App URL (via Nginx):   http://localhost:5174
* FastAPI docs:          http://localhost:8000/docs

Code changes on the host automatically reload containers (UVicorn `--reload`, Vite).

### How the ports work (dev stack)

| Scope | Port | Component | Purpose |
|-------|------|-----------|---------|
| Host  | **5174** | nginx container | Single entry-point you open in the browser. |
| Docker network | 5175 | Vite dev server (`frontend` container) | Serves React app with hot-reload; **not published to host**. |
| Docker network / optional host mapping | 8000 | FastAPI (`backend` container) | API (published to host by default for convenience). |

Flow:
1. Browser hits `localhost:5174` → reaches nginx.
2. For UI assets `/` nginx proxies to `http://frontend:5175`.
3. For API calls `/api/...` nginx proxies to `http://backend:8000`.

Because port 5175 isn’t exposed, the browser can’t bypass nginx, ensuring all requests (UI & API) share the same origin and CORS is never an issue.

Stop everything with `Ctrl + C`.

### Accessing the app (dev)

| URL | What you get |
|-----|---------------|
| http://localhost:5174 | React UI served by Vite (hot-reload) via Nginx reverse-proxy |
| http://localhost:8000/docs | FastAPI interactive API docs (Swagger UI) |

## Deployment

### Frontend (Vercel)

The site is already live at the URL above.
• **Auto-deploy :** any push/merge to `main` triggers a new Vercel build.
• **Manual redeploy :** click **“Redeploy”** in the Vercel dashboard if you ever need to rebuild a specific commit.

### Backend

The FastAPI backend is still containerised. You can run it locally with the Compose stack (see Quick start) or deploy the `backend` service image to any platform that supports Docker containers (Fly.io, Render, Digital Ocean, etc.).

> **Render users**: The container expects `gunicorn` (now listed in `backend/pyproject.toml`). Make sure your Render service uses port **8000** and that you’ve set `EMAIL_ADDRESS` / `EMAIL_PASSWORD` secrets.

## Repo layout

```
backend/         FastAPI app & Dockerfile
frontend/        React source (Vite)
nginx/           Nginx configs & Dockerfile
Dockerfiles +   Compose definitions at repo root
```
