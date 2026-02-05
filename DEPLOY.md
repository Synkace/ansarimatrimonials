# Deployment Guide for Ansari Matrimonials

This guide assumes you are deploying to a Linux VPS (Ubuntu/Debian) with Nginx and Node.js.

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running (or use MongoDB Atlas connection string)
- Nginx installed
- PM2 installed globally (`npm install -g pm2`)

## Step 1: Clone & Setup
1.  **Clone the repository** to your VPS:
    ```bash
    git clone https://github.com/Synkace/ansarimatrimonials.git
    cd ansarimatrimonials
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    - Copy the example env file:
      ```bash
      cp .env.example .env.local
      ```
    - Edit `.env.local` and add your real secrets:
      ```bash
      nano .env.local
      ```
    - **Crucial**: Set `NEXTAUTH_URL` to `https://ansarimatrimonials.com` (or http if no SSL yet).

## Step 2: Build
Build the Next.js application for production:
```bash
npm run build
```

## Step 3: Start with PM2
Use the included `ecosystem.config.js` to start the app:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 4: Configure Nginx
1.  Copy the `nginx.conf` content to your site configuration:
    ```bash
    sudo nano /etc/nginx/sites-available/ansarimatrimonials
    ```
    (Paste content from `nginx.conf` in the repo)

2.  Enable the site:
    ```bash
    sudo ln -s /etc/nginx/sites-available/ansarimatrimonials /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

## Step 5: SSL (Optional but Recommended)
Use Certbot to enable HTTPS:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ansarimatrimonials.com
```

## Updating the App
When you push changes to GitHub, run this on VPS:
```bash
pm2 stop ansari-matrimonials
git pull
npm install
npm run build
pm2 start ansari-matrimonials
```
