# launch API

npm install; npm start

# launch DB

# Manjaro
# mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql; sudo systemctl start mysqld; sudo systemctl enable mysqld; echo "source schema.sql" | sudo mysql -u root

# Autres
sudo service mysql start; echo "source schema.sql" | mysql -u root