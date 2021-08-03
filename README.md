# Fudy Roman Test API with NestJS

## Pre-requisites

* NodeJS >=14
* NestJS
* PostgreSQL 12
* Redis 6

## install and start in one command
`make app_install`

## OR

## 1. Install dependencies.
`npm i`

## 2. Run docker containers
`npm run docker:up`

## 3. Run development server 
`npm run start:dev` 

##INFO

### swagger URL
http://localhost:3000/docs

### enter to postgreSQL container
`make db_shell`

### enter to redis container
`make redis_shell`
