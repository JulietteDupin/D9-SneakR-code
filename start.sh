#!/bin/bash

# Start MySQL
service mysql start

# Wait for MySQL to start
sleep 10s

# Initialize MySQL database
mysql < /docker-entrypoint-initdb.d/dump.sql

# Start the backend service
nohup node /app/backend/index.js &

# Start the frontend service
nohup npm --prefix /app/frontend run dev &

# Keep the container running
tail -f /dev/null
