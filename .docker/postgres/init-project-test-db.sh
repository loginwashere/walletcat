#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER wallet_test;
    CREATE DATABASE wallet_test;
    GRANT ALL PRIVILEGES ON DATABASE wallet_test TO wallet_test;
    GRANT ALL PRIVILEGES ON DATABASE wallet_test TO $POSTGRES_USER;
EOSQL