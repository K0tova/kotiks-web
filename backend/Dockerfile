# syntax=docker/dockerfile:1

# ---- Builder stage ----
FROM python:3.12-slim AS builder
WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy pyproject and lockfile first (for cache)
COPY backend/pyproject.toml backend/poetry.lock ./

# Install dependencies (only main, no dev)
RUN poetry config virtualenvs.create false \
     && poetry install --no-interaction --no-ansi --no-root --only main

# Copy backend source code
COPY backend /app/backend


# ---- Final stage ----
FROM python:3.12-slim
WORKDIR /app

# Copy installed site-packages & backend code from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
# copy scripts (uvicorn, gunicorn, etc.)
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app/backend /app/backend

ENV PYTHONUNBUFFERED=1 \
     PORT=8000

EXPOSE 8000

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-w", "4", "-b", "0.0.0.0:8000", "backend.main:app"]
