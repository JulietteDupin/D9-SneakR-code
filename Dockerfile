FROM mysql:8.0

COPY ./Back/dump.sql /docker-entrypoint-initdb.d/dump.sql

EXPOSE 3306