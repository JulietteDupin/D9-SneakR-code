FROM mysql:8.0

COPY ./Back/dump.sql /docker-entrypoint-initdb.d/dump.sql
COPY ./Back/reset.sql /docker-entrypoint-initdb.d/reset.sql

EXPOSE 3306