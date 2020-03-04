# todo-app

## Description
![screenshot](Screenshot.PNG)

This is a bare-bones todo application which includes the following functionality:
- User accounts
  - Registering
  - Login
- Projects
  - Collections of todos/tasks
- Todos/tasks

## Technologies used for this project
### Backend
- KoaJS - Web framework for nodeJS
- JWT - Authentication method
- Supertest - Http endpoint testing library
- Mocha - Testing framework
- Istanbul - Unit-test coverage

### Frontend
- ReactJS
- Material-UI

## How to run 
1. Clone repo `git clone https://github.com/andersbjorklundjensen/todo-app.git`
2. Install dependencies `npm install` in both backend and frontend folders
3. Start API with `docker-compose --file docker-compose-start-api.yml up --build`, in the backend folder
4. Start React application with `npm start` in the frontend folder
