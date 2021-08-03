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

## 4. Add user's seed data
`npm run seed:run`  

##INFO

### swagger URL
http://localhost:3000/docs

### enter to postgreSQL container
`make db_shell`

### enter to redis container
`make redis_shell`

##Refs (Technical Design)
Added data flow and data_flow in /doc folder

##Refs (Postman Collection)
Added collection in /doc folder

##SignUp
see swagger or postman collection

##SignIn
see response like
`{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhYm96YTIiLCJpYXQiOjE2MjgwMjI5NjUsImV4cCI6MTYyODAyNjU2NX0.c7qzgs483VxEhQt-FIU8EECuj43wA7jZJqa5jvrBhCQ"
}`

and use as Bearer token (see screenshots in /doc folder)


