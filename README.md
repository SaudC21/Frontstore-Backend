# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

#### How to use

- initailize the project.
  `npm install`
  `npm start`

- Initialize PostgreSQL
  `psql -h localhost -U postgres`

- create database for dev env
  `CREATE DATABASE storefront`

- Database port is `5432`

- connect to database
  `\c storefront`

- show tables
  `\dt`

- disconnect from database
  `\q`

#### Migration script for dev-db

`npm run dev`

#### Migration script for test-db

`npm run test`

### Environment Variables

#### default env

`ENV=dev`

#### PostgreSQL dev db

`POSTGRES_HOST=127.0.0.1`
`POSTGRES_DB=storefront`
`POSTGRES_USER=postgres`
`POSTGRES_PASSWORD=tiger`
`PORT=5432`

#### testing db

`POSTGRES_TEST_DB=storefront_test`

#### password encryption

`SALT_ROUNDS=10`

`PEPPER=Hel21@duas!`

#### JWT

`JWT_TOKEN_SECRET=sec123ret`
