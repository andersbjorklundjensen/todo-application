# KoaJS-ReactJS-starter-pack

placeholder for screenshots

## Description
Repo for kickstarting the creation of a web app.

### Routes
- Auth
  - `POST /auth/register` 
  - `POST /auth/login`
  - `POST /auth/logout`
- Item
  - `GET /item/all`
  - `GET /item/:id`
  - `POST /item/`
  - `PUT /item/:id`
  - `DELETE /item/:id`
  
### API Client
One file with one class per API.

- class Auth
  - `registerUser(username, password)` 
  - `loginUser(username, password`
  - `logoutUser()`
- class Item
  - `getAllItems()`
  - `getItem(id)`
  - `saveItem(name)`
  - `editItem(id, name)`
  - `deleteItem(id)`

## Technologies used for this project
### Backend
- KoaJS - Web framework for nodeJS
- JWT - Authentication method
- Supertest - Http endpoint testing library
- Mocha - Testing framework
- Istanbul - Unit-test coverage

### Frontend
- ReactJS - Library for building user interfaces
- Material-UI - UI library for ReactJS

### Utilities
- ESLint - Javascript linter

## Scripts
### Backend
- Docker compose for starting the api
  - `docker-compose --file docker-compose-start-api.yml up --build`
- Docker compose for continually running tests
  - `docker-compose --file docker-compose-run-tests.yml up --build`

### Frontend
- Starting react app
  - `npm start`

## Caution
- All `/item` routes needs validation to be added before use, they are only for educational purpose
