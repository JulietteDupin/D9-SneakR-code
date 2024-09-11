#!/bin/bash

# Start MySQL service
service mysql start

# Wait for MySQL to fully start
sleep 10

# Initialize the database with the dump file if it exists
if [ -f /docker-entrypoint-initdb.d/dump.sql ]; then
    echo "Initializing the MySQL database..."
    mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < /docker-entrypoint-initdb.d/dump.sql
fi

# Start the backend service in the background
echo "Starting the backend service..."
cd /app/backend
nohup npm start &

# Start the frontend service in the background
echo "Starting the frontend service..."
cd /app/frontend
nohup npm run dev &

# Prevent the container from exiting
tail -f /dev/null
