#!/bin/bash

# create test db
psql -c 'create database jimsegal_api_test;' -U postgres

# read schema from remote repo
echo "$(curl https://raw.githubusercontent.com/jsegal205/jimsegal-db/master/db/schema/db-base-schema.sql)" > schema.sql
psql -U postgres -d 'jimsegal_api_test' -a -f schema.sql

# read migrations from remote repo
echo "$(curl https://raw.githubusercontent.com/jsegal205/jimsegal-db/master/db/schema/db-migrations.sql)" > dbmigrations.sql
psql -U postgres -d 'jimsegal_api_test' -a -f dbmigrations.sql

# cleanup
rm schema.sql
rm dbmigrations.sql
