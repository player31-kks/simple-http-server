#!/bin/bash

# Stop any existing running instances of the application
sudo pm2 delete all

# Start the application
sudo pm2 start ./dist/main.js --name "app"

# Save PM2 process list
sudo pm2 save
