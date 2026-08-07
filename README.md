# Cakes By Shiddat

Full-stack website and content-management system for Cakes By Shiddat.

## Technology

- Public website: React, TypeScript, Vite, Tailwind CSS, TanStack Query
- Admin panel: React, TypeScript, Vite, React Hook Form
- API: NestJS, Prisma, PostgreSQL, JWT authentication
- Media: Cloudinary

## Project structure

```text
.
├── src/                 Public website
├── public/              Public static assets, robots.txt, and sitemap
├── admin/
│   └── src/             CMS and order-management application
├── backend/
│   ├── src/             NestJS API modules
│   └── prisma/          Prisma schema, migrations, and seed data
├── .env.example         Public website environment template
├── package.json         Public website scripts and dependencies
└── README.md
```

The public website, admin panel, and backend are separate Node projects and each has its own lockfile.

## Requirements

- Node.js 22 or newer
- npm 10 or newer
- PostgreSQL
- Cloudinary account for CMS image uploads

## Installation

Install each application using its committed lockfile:

```bash
npm ci
cd admin && npm ci
cd ../backend && npm ci
```

Copy the environment templates. On Windows PowerShell, use `Copy-Item` instead of `cp`.

```bash
cp .env.example .env.local
cp admin/.env.example admin/.env.local
cp backend/.env.example backend/.env
```

Fill in local values before starting the applications. Never commit the resulting environment files.

## Database setup

From `backend/`:

```bash
npx prisma migrate deploy
npm run seed
```

Seeding requires `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Run it intentionally; it also provisions the initial CMS content when absent.

## Development

Run the applications in separate terminals:

```bash
# Public website, http://localhost:5173
npm run dev

# Admin panel (from admin/)
npm run dev

# API, http://localhost:3000/api (from backend/)
npm run start:dev
```

Swagger is available at `/api/docs` only when enabled by the backend environment.

## Environment variables

### Public website

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Public API base URL including `/api`. |
| `VITE_SITE_URL` | Yes | Canonical public website origin, without a trailing slash. |

### Admin panel

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | API base URL including `/api`. |

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. |
| `PORT` | No | API port; defaults to `3000`. |
| `NODE_ENV` | Production | Set to `production` when deployed. |
| `CORS_ORIGINS` | Yes | Comma-separated public and admin origins. |
| `ENABLE_SWAGGER` | No | Set to `true` only when API documentation should be exposed. |
| `JWT_SECRET` | Yes | High-entropy signing secret; at least 32 characters in production. |
| `JWT_EXPIRES_IN` | No | Access-token lifetime, such as `7d`. |
| `ADMIN_EMAIL` | For seed | Initial administrator email. |
| `ADMIN_PASSWORD` | For seed | Strong initial administrator password. |
| `CLOUDINARY_CLOUD_NAME` | For uploads | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | For uploads | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | For uploads | Cloudinary API secret. |
| `MEDIA_MAX_FILE_SIZE` | No | Maximum image size in bytes; defaults to 10 MiB. |

Only variables prefixed with `VITE_` are exposed to browser bundles. Never place secrets in frontend or admin environment files.

## Production builds

```bash
# Repository root
npm run build

# Admin
cd admin && npm run build

# Backend
cd backend && npm run build
```

## Deployment

For the complete Ubuntu, Docker Compose, Nginx, SSL, PM2, operations, and backup procedure, see [deployment.md](deployment.md).

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Configure all backend secrets in the hosting provider's secret manager.
3. Run `npx prisma migrate deploy` from `backend/` during release.
4. Run `npm run seed` once when an initial administrator and CMS content are required.
5. Build the backend and start it with `npm run start:prod`.
6. Build the public and admin Vite applications and deploy their `dist/` directories separately.
7. Configure SPA fallback routing to `index.html` for both React applications.
8. Set `VITE_API_URL` at build time to the HTTPS production API URL.
9. Set `CORS_ORIGINS` to the exact HTTPS public and admin origins.
10. Keep Swagger disabled unless it is intentionally required.

The hosting platform must provide HTTPS. Database backups, application logs, monitoring, and a shared rate-limit store are infrastructure responsibilities.

## Verification

Before release, run all three builds and validate the Prisma schema:

```bash
cd backend && npx prisma validate
```

Confirm that direct navigation works for every public and admin route after configuring SPA rewrites.
