FROM postgres:9.6

RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./init-project-db.sh /docker-entrypoint-initdb.d/
COPY ./init-project-test-db.sh /docker-entrypoint-initdb.d/