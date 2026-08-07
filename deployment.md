# Ubuntu deployment guide

This repository supports two deployment modes:

1. Docker Compose for PostgreSQL, API, public website, and admin panel.
2. Native Node.js with PM2 for the API. The Docker Compose path is recommended and is the primary configuration below.

Examples use these DNS names:

- `cakesbyshiddat.com`
- `www.cakesbyshiddat.com`
- `admin.cakesbyshiddat.com`
- `api.cakesbyshiddat.com`

Point all four DNS records to the Ubuntu server before requesting certificates. Replace the names in `deploy/nginx/cakesbyshiddat.conf` if the deployment uses different domains.

## 1. Prepare Ubuntu

```bash
sudo apt update
sudo apt install -y ca-certificates curl git nginx certbot python3-certbot-nginx

curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
sudo systemctl enable --now docker nginx
```

Sign out and back in after joining the Docker group. Clone the repository into a non-root deployment account:

```bash
sudo mkdir -p /srv/cakesbyshiddat
sudo chown "$USER":"$USER" /srv/cakesbyshiddat
git clone <repository-url> /srv/cakesbyshiddat/app
cd /srv/cakesbyshiddat/app
```

## 2. Configure environment variables

Docker Compose reads the repository-root `.env` file. Create it from the deployment template:

```bash
cp deployment/.env.example .env
chmod 600 .env
nano .env
```

Replace every placeholder. Generate strong secrets rather than reusing development values:

```bash
openssl rand -base64 48
```

Important values:

- `POSTGRES_PASSWORD`: unique database password.
- `JWT_SECRET`: random value of at least 32 characters.
- `CORS_ORIGINS`: exact HTTPS public and admin origins.
- `PUBLIC_API_URL`: browser-visible API URL ending in `/api`.
- `PUBLIC_SITE_URL`: canonical public site origin.
- Cloudinary variables: production media-library credentials.

Do not commit `.env`; it is ignored by Git.

## 3. Build and start with Docker Compose

```bash
docker compose config --quiet
docker compose build --pull
docker compose up -d postgres backend frontend admin
docker compose ps
```

Apply database migrations after PostgreSQL is healthy:

```bash
docker compose run --rm backend npx prisma migrate deploy
docker compose restart backend
```

The seed script uses TypeScript development tooling that is intentionally absent from the production image. For first-time provisioning, run it from a trusted build host or CI runner with the production `DATABASE_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`:

```bash
cd backend
npm ci
npm run seed
```

Run the seed intentionally and only when initial CMS content or an administrator is required.

## 4. Configure Nginx reverse proxy

The Compose services listen only on localhost:

- Public website: `127.0.0.1:8080`
- Admin panel: `127.0.0.1:8081`
- API: `127.0.0.1:3000`

Install the HTTP-only bootstrap configuration first:

```bash
sudo cp deploy/nginx/bootstrap.conf /etc/nginx/sites-available/cakesbyshiddat.conf
sudo ln -s /etc/nginx/sites-available/cakesbyshiddat.conf /etc/nginx/sites-enabled/cakesbyshiddat.conf
sudo rm -f /etc/nginx/sites-enabled/default
```

Before certificates exist, Certbot needs a working port-80 server. Create the ACME directory and validate the bootstrap configuration:

```bash
sudo mkdir -p /var/www/certbot
sudo nginx -t
sudo systemctl reload nginx
```

After obtaining the certificate in the next section, replace the bootstrap configuration with `deploy/nginx/cakesbyshiddat.conf`. The production proxy preserves the original host, client address, and HTTPS scheme. API uploads are limited to 12 MiB at Nginx; keep this slightly above `MEDIA_MAX_FILE_SIZE`.

## 5. Enable SSL with Let's Encrypt

Request one certificate containing all required names:

```bash
sudo certbot --nginx \
  -d cakesbyshiddat.com \
  -d www.cakesbyshiddat.com \
  -d admin.cakesbyshiddat.com \
  -d api.cakesbyshiddat.com
```

Install the complete production configuration, then validate and reload:

```bash
sudo cp deploy/nginx/cakesbyshiddat.conf /etc/nginx/sites-available/cakesbyshiddat.conf
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
systemctl status certbot.timer
```

The configuration redirects HTTP to HTTPS and enables HSTS. Do not enable HSTS until every listed subdomain works over HTTPS.

## 6. Deploy updates

```bash
cd /srv/cakesbyshiddat/app
git pull --ff-only
docker compose build
docker compose run --rm backend npx prisma migrate deploy
docker compose up -d --remove-orphans
docker image prune -f
```

Useful operations:

```bash
docker compose ps
docker compose logs -f --tail=200 backend
docker compose restart backend
docker compose restart frontend admin
docker compose down
docker compose up -d
```

Avoid `docker compose down -v` in production because `-v` deletes the PostgreSQL volume.

## PM2 backend alternative

For a native backend deployment, install Node.js 22, PostgreSQL, and PM2. Create `backend/.env` from `backend/.env.example`, set `DATABASE_URL` to the native PostgreSQL instance, and protect the file with mode `600`.

```bash
cd /srv/cakesbyshiddat/app/backend
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
sudo npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup systemd
```

Run the command printed by `pm2 startup`, then verify:

```bash
pm2 status
pm2 logs cakesbyshiddat-api
```

Update and restart:

```bash
git pull --ff-only
npm ci
npx prisma migrate deploy
npm run build
pm2 reload ecosystem.config.js --env production
pm2 save
```

The PM2 configuration runs one API process because the built-in rate limiter is process-local. Use a shared rate-limit store before enabling cluster mode.

The public and admin applications can still run in their Docker containers, or their Vite `dist/` directories can be served directly by Nginx after changing the public/admin `proxy_pass` locations to static `root` plus `try_files` rules.

## Backup strategy

Keep encrypted database backups outside the server. A basic daily backup script can use:

```bash
mkdir -p /srv/cakesbyshiddat/backups
docker compose exec -T postgres pg_dump \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  -Fc > "/srv/cakesbyshiddat/backups/cakes-$(date +%F-%H%M).dump"
find /srv/cakesbyshiddat/backups -type f -name '*.dump' -mtime +14 -delete
```

When run from cron, load the protected deployment `.env` first or place the script in a root-owned file. Copy backups to encrypted object storage using a separate backup identity. Recommended retention:

- Daily backups for 14 days
- Weekly backups for 8 weeks
- Monthly backups for 12 months

Cloudinary assets are external to PostgreSQL. Enable Cloudinary backups/versioning or periodically export the asset inventory and ensure Cloudinary retention matches the database policy.

Test restoration regularly on a separate database:

```bash
docker compose exec -T postgres createdb -U "$POSTGRES_USER" cakes_restore_test
cat backup.dump | docker compose exec -T postgres pg_restore \
  -U "$POSTGRES_USER" -d cakes_restore_test --clean --if-exists
```

Never test a restore over the live production database.

## Firewall and monitoring

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Do not expose PostgreSQL or application ports publicly. Monitor:

- HTTPS availability for all subdomains
- Container or PM2 restart counts
- API `5xx` rates
- Disk space and database volume growth
- Certificate renewal
- Backup completion and restoration tests

## Release checklist

- DNS resolves to the Ubuntu host.
- `.env` is mode `600` and contains no placeholders.
- `docker compose config --quiet` succeeds.
- Database migration completes successfully.
- Public, admin, and API containers are healthy.
- Nginx configuration passes `nginx -t`.
- HTTPS works for every subdomain.
- `CORS_ORIGINS` contains the exact deployed browser origins.
- Swagger is disabled unless intentionally exposed.
- A database backup exists before each migration.
- Contact submission, login, CMS editing, and image upload pass smoke testing.
