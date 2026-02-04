# aws-cicd (React + GitHub Actions + EC2)

Basic React app (Vite) you can deploy to an AWS EC2 instance using a GitHub Actions CI/CD workflow.

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site output is in `dist/`.

## EC2 one-time setup (Nginx)

1. Ensure your EC2 security group allows inbound HTTP (port 80) to your instance.
2. Install Nginx and configure it to serve the deployed folder.

Example Nginx server block (see `infra/nginx/react-app.conf`):

- Document root: `/var/www/react-app`
- SPA fallback: `try_files $uri $uri/ /index.html;`

Create the web root and make it writable by your SSH user (example for Ubuntu):

```bash
sudo mkdir -p /var/www/react-app
sudo chown -R ubuntu:www-data /var/www/react-app
sudo chmod -R 775 /var/www/react-app
```

## GitHub Actions secrets

Add these repository secrets in GitHub:

- `EC2_HOST`: EC2 public IPv4 or public DNS
- `EC2_USER`: SSH username (commonly `ubuntu` or `ec2-user`)
- `EC2_SSH_KEY`: private key content (the `.pem` file)
- `EC2_DEPLOY_PATH`: folder to deploy to (example: `/var/www/react-app`)
- `EC2_SSH_PORT` (optional): defaults to `22`

## Deploy

Push to the `main` branch. The workflow builds the app and deploys `dist/` to your EC2 instance via `rsync` over SSH:

- Workflow: `.github/workflows/ci-cd.yml`
- Site updates immediately (no Nginx reload needed for static files).

If deployment succeeds, open `http://<EC2_HOST>/` in your browser.
