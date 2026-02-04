#!/bin/bash

# Setup VPS for Next.js App (Ubuntu/Debian)

# 1. Update & Upgrade
echo "Updating system..."
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js (via NVM or direct)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install Nginx
echo "Installing Nginx..."
sudo apt install nginx -y

# 4. Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

# 5. Clone Project Logic (User needs to do this)
echo "Please clone your repository to /var/www/ansari-matrimonials"

# 6. Setup Directory Permissions if needed
# sudo mkdir -p /var/www/ansari-matrimonials
# sudo chown -R $USER:$USER /var/www/ansari-matrimonials

echo "VPS Setup Complete. Next steps:"
echo "1. Clone app."
echo "2. Copy nginx.conf to /etc/nginx/sites-available/default"
echo "3. Run 'npm install' and 'npm run build'."
echo "4. Start with 'pm2 start npm --name ansari -- start'"
