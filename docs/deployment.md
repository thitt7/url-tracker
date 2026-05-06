# 🚀 Full-Stack VPS Deployment Guide (Docker + .NET + Next.js + MySQL)

This guide walks through setting up and deploying a containerized full-stack application on a DigitalOcean VPS using:

* **Next.js** (frontend)
* **.NET API** (backend)
* **MySQL** (database)
* **Caddy** (reverse proxy + HTTPS)
* **Docker + Docker Compose**
* **GitHub Actions + Docker Hub** (CI/CD)

> Assumption: The codebase is already written. This guide focuses only on infrastructure and deployment.

---

# 🌊 1. DigitalOcean Setup (Web UI)

## 1.1 Create a Droplet

1. Go to DigitalOcean

2. Click **Create → Droplets**

3. Recommended configuration:

   * **Image**: Ubuntu (latest LTS)
   * **Plan**: Basic (at least 2GB RAM recommended)
   * **Authentication**:

     * ✅ Use **SSH key** (preferred)
     * OR password (less secure)
   * **Hostname**: e.g. `url-tracker-prod`

4. Click **Create Droplet**

---

## 1.2 Add SSH Key (if not already)

1. Go to **Settings → Security → SSH Keys**
2. Add your public key:

```bash
cat ~/.ssh/id_rsa.pub
```

---

## 1.3 Note Your Droplet IP

Example:

```txt
137.184.94.165
```

---

# 🔐 2. Connect to Your Server

From your local machine:

```bash
ssh root@137.184.94.165
```

---

# 🔥 3. Server Setup (Firewall + Networking)

## 3.1 Configure UFW Firewall

Run on the VPS:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw allow OpenSSH
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

sudo ufw enable
```

Verify:

```bash
sudo ufw status verbose
```

---

## 3.2 Verify Ports

```bash
sudo ss -tlnp | grep -E ':80|:443'
```

---

# 🐳 4. Install Docker & Docker Compose

## 4.1 Install dependencies

```bash
sudo apt update
sudo apt install ca-certificates curl
```

---

## 4.2 Add Docker GPG key

```bash
sudo install -m 0755 -d /etc/apt/keyrings

sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc
```

---

## 4.3 Add Docker repository

```bash
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

---

## 4.4 Install Docker

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## 4.5 Verify Installation

```bash
docker --version
docker compose version
sudo systemctl status docker
```

---

# 📁 5. Prepare Project on VPS

## 5.1 Create project directory

```bash
mkdir /url-tracker
```

---

## 5.2 Transfer required files from local machine

Run **on your local machine (NOT the server)**:

```bash
scp docker-compose.vps.yml .env.vps Caddyfile.vps root@137.184.94.165:/url-tracker/
```

---

## 5.3 Verify files on server

```bash
cd /url-tracker
ls
```

Expected:

```txt
docker-compose.vps.yml
.env.vps
Caddyfile.vps
```

---

# 🌐 6. DNS Configuration

## 6.1 Add Domain in DigitalOcean

1. Go to **Networking → Domains**
2. Add your domain (e.g. `url-tracker.com`)

---

## 6.2 Configure DNS Records

Add:

```txt
A     @      → YOUR_SERVER_IP
CNAME www    → yourdomain.com
```

Example:

```txt
A     url-tracker.com   → 137.184.94.165
CNAME www              → url-tracker.com
```

---

## 6.3 Wait for DNS propagation

Usually takes a few minutes.

---

# 🔐 7. GitHub Actions Setup (CI/CD)

Using GitHub

---

## 7.1 Add Repository Secrets

Go to:

```
Repo → Settings → Secrets and variables → Actions
```

Add:

### ENV_FILE

Paste entire `.env.vps` content

### ENV_FILE_STAGING (optional)

Paste staging version if applicable

---

## 7.2 What this enables

Your GitHub Actions workflow can:

* Build Docker images
* Push to Docker Hub
* Inject environment variables securely

---

# 🐳 8. Running the Application

## 8.1 Start containers

On the VPS:

```bash
cd /url-tracker

docker compose --env-file .env.vps -f docker-compose.vps.yml up -d
```

---

## 8.2 Stop containers

```bash
docker compose --env-file .env.vps -f docker-compose.vps.yml down
```

---

## 8.3 Pull latest images (deploy update)

```bash
docker compose --env-file .env.vps -f docker-compose.vps.yml pull
docker compose --env-file .env.vps -f docker-compose.vps.yml up -d
```

---

# 🔍 9. Verification & Debugging

## Check running containers

```bash
docker ps
```

---

## Test API locally

```bash
curl http://localhost:4000
```

---

## Check logs

```bash
docker logs <container_name>
```

---

## Check Docker status

```bash
systemctl status docker
```

---

# 🌍 10. How It Works (Architecture)

```
Browser → Domain → Caddy (80/443)
                → Next.js container
                → .NET API container
                → MySQL container
```

* Caddy handles HTTPS automatically
* Internal services communicate via Docker network
* Only ports 80/443 are exposed publicly

---

# ✅ Final Notes

* Always use `.env.vps` for environment configuration
* Never commit secrets to GitHub
* Use `docker compose pull` before redeploying
* Keep Caddyfile aligned with your domain

---

# 🧠 Quick Deploy Cheat Sheet

```bash
cd /url-tracker

docker compose --env-file .env.vps -f docker-compose.vps.yml down
docker compose --env-file .env.vps -f docker-compose.vps.yml pull
docker compose --env-file .env.vps -f docker-compose.vps.yml up -d
```

---

This setup gives you a **fully reproducible, production-ready container deployment pipeline** using a single VPS.
