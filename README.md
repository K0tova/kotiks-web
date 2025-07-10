# Kotiks Web

Personal website project – React (Vite) + FastAPI – now containerised with Docker Compose.

## Quick start (development)

```bash
# first time only
cp .env.example .env     # fill EMAIL_ADDRESS, EMAIL_PASSWORD, etc.

# build & run with hot-reload
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
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

## Production build & run locally

```bash
# build optimised images & start nginx reverse-proxy on 5174
docker compose up --build
# open http://localhost:5174
```

The bundled React site is served through Nginx on the **same 5174 port**; `/api` calls are forwarded to the backend running inside the Compose network.

This produces three images:

* `kotiks-web-backend` – Gunicorn + UvicornWorker (FastAPI)
* `kotiks-web-frontend-build` – intermediate build stage
* `kotiks-web-nginx` – serves the compiled React app and proxies `/api` to backend

## Deploying

See `docs/proper_setup.md` §7 for a full CI/CD example using GitHub Actions, image registry, and zero-downtime updates on a cloud VM.

## Repo layout

```
backend/         FastAPI app & Dockerfile
frontend/        React source (Vite)
nginx/           Nginx configs & Dockerfile
Dockerfiles +   Compose definitions at repo root
```
