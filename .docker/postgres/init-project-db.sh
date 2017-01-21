#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER wallet;
    CREATE DATABASE wallet;
    GRANT ALL PRIVILEGES ON DATABASE wallet TO wallet;
    GRANT ALL PRIVILEGES ON DATABASE wallet TO $POSTGRES_USER;
EOSQL