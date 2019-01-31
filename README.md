# Bookstore API
This is a RESTful API built for SCB.

## Architecture
This project uses Domain-Driven-Design approach. Thus, the application (API) is splitted into different layers including

- Interface Layer - Express / Express Router
- Application Layer - Thin layer that delegates works from interfaces and inner layers e.g. domain or infrastructure
- Domain Layer - Pure typed JavaScript constructor function
- Infrastructure Layer - Data Access Layer & External Services

## Prerequisites
You need to have local or remote MongoDB instance running to serve the API. The
default configuration of this API is located at config folder and the config/index.js
file is bootstrapped in the IoC container which will be described below

## How does this API works?
By running

```bash
yarn start
```

The API will start on the default port which is 3250.

Please note that most of the dependencies required in submodules are injected using Awilix as the main IoC container.

### Note on persistence
Order and User entities are persisted in MongoDB and the Mongoose model is responsible for accessing the persistent layer and this layer is handled by the repositories

However, the Book entities are managed using the remote service which is also managed by the repository.

Note: The unit testing module is not yet complete and the API documentation (Swagger w/ Open API) is under construction

### Utilities for Docker users
The docker-compose.yml containing the definition for MongoDB is provided in this repository and Docker users can efficiently use it to aviod deploying MongoDB manually on their machines.

Please note that the volume is also bound within the root directory with the directory named as "data"