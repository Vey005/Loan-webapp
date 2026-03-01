# Secure Loan Application Web Platform

Production-oriented full-stack implementation of a secure loan application platform using:
- React (Vite, MUI, Formik, Yup)
- Django + Django REST Framework
- PostgreSQL (production) / SQLite (development)
- JWT admin authentication (Simple JWT)

## 1. Project Structure

- `backend/` Django REST API
- `frontend/` React SPA
- `deploy/` Nginx and deployment config

## 2. Backend Setup

```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend API base URL: `http://localhost:8000/api/`

## 3. Frontend Setup

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## 4. API Endpoints

### Public
- `POST /api/applications/`
- `POST /api/applications/status/`

### Admin
- `POST /api/admin/login/`
- `POST /api/admin/logout/`
- `GET /api/admin/dashboard/`
- `GET /api/admin/applications/`
- `GET /api/admin/applications/<uuid>/`
- `PATCH /api/admin/applications/<uuid>/approve/`
- `PATCH /api/admin/applications/<uuid>/reject/`
- `PATCH /api/admin/applications/<uuid>/flag/`
- `PATCH /api/admin/applications/<uuid>/notes/`
- `GET /api/admin/applications/<uuid>/files/<file_type>/`
- `GET /api/admin/audit-logs/`

## 5. Security Notes

- Admin routes are protected with JWT auth (`Authorization` header or secure cookie fallback).
- CSRF middleware is enabled.
- CORS is restricted by environment configuration.
- Submission and admin-login throttling are configured.
- File size/type validations are enforced server-side and client-side.
- Media files are not publicly exposed by URL; they are streamed through authenticated admin API routes.

## 6. Production Notes

- Set `DEBUG=False` and configure PostgreSQL in `backend/.env`.
- Use Gunicorn (`backend/gunicorn.conf.py`) behind Nginx (`deploy/nginx.conf`).
- Serve React build artifacts from Nginx.
- Terminate TLS at Nginx and force HTTPS.
