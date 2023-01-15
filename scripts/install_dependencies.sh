#!/bin/bash

# Update package manager
sudo apt-get update

# Install Node.js and npm
NODE_VERSION=16.16.0
curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install pm2 -g

# Install application dependencies
cd /main
