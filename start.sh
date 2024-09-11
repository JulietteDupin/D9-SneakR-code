#!/bin/bash

# Start MySQL server
service mysql start

# Wait for MySQL to be fully started
sleep 20s

# Initialize the MySQL database
mysql -e "CREATE DATABASE IF NOT EXISTS SneakR;"
mysql SneakR < /docker-entrypoint-initdb.d/dump.sql

# Start the backend service
nohup node /app/backend/server.js &

# Start the frontend service
nohup npm --prefix /app/frontend run dev &

# Keep the container running
tail -f /dev/null
