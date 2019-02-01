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

You also need Redis to cache the books which are retrieved via external web services

## How does this API works?
By running

```bash
yarn start
```

The API will start on the default port which is 3250.

By running

```bash
yarn test
```

You will perform some unit tests priovided within the repository here

Please note that most of the dependencies required in submodules are injected using Awilix as the main IoC container.

### Basic Usage
Based on the requirement given by SCB, all of the opeations are performed through secured communication. In this case we use
JWT with asymetric keys (RS256). Thus, in order to

- Get the current user (via <BASE_URL>/api/v1/users [GET])
- Order the books (via <BASE_URL>/api/v1/users/orders [POST])
- Delete the current user (via <BASE_URL>/api/v1/users [DELETE])

You must parse the Authorization with Bearer token obtained from the path <BASE_URL>/api/v1/login [POST]

For the rest of the endpoints including

- Books endpoint (via <BASE_URL>/api/v1/books) [GET]
- Create new user (via <BASE_URL>/api/v1/users) [POST]

You can invoke the endpoint without the need to parse the token

### Note on persistence
Order and User entities are persisted in MongoDB and the Mongoose model is responsible for accessing the persistent layer and this layer is handled by the repositories

However, the Book entities are managed using the remote service which is also managed by the repository.

#### MongoDB Setup Guide
No matter you use your own local Mongod instance or the provided docker-compose file. The database setup is required.
You can use the shell script named "mongoInit.sh" to setup the database and related collections by simply running

```bash
root$twicetagram:~$ chmod +x ./mongoInit.sh
root$twicetagram:~$ ./mongoInit.sh
```

#### Custom MongoDB location for initialisation
The default target of MongoDB instance is localhost:37107 which expects Dockerised version of the database to be running. However
you are free to change the "mongo --port 37017" port option to your preferred port or you can even add "--host <URL>" to connect to
the remote database

In case if you want to create your own database and collection mannually do the following

- Start MongoDB
- Create a database named "bookstore-api
- Create two collections named "users" and "orders"

```bash
use bookstore-api
db.createCollection('users')
db.createCollection('orders')
```

### About the configuration
The file config/index.js describes basic configuration for the project. There are however two interestin variables that you should check out including

1. MongoDB URI - Default to mongodb://localhost:37017
2. Redis URI - Default to redis://localhost:6370

These are values used by libraries in the infrastructure layer during Awilix initialisation. The default value provided is the value of the hosts and ports used by the containers created by provided docker-compose.yml file.

If you need to change to use your local MongoDB and Redis or remote instances, just switch the values in this file

### Utilities for Docker users
The docker-compose.yml containing the definition for MongoDB is provided in this repository and Docker users can efficiently use it to aviod deploying MongoDB and Redis manually on their machines.

### MongoDB
Please note that the volume for MongoDB is also bound within the root directory with the directory named as "data"

#### Redis
For Redis, there is nothing fancy here. Just deploy it with docker-compose.yml file.

### API Documentation
Please check [this link](https://documenter.getpostman.com/view/3121519/RztmqoFq) for the documentation.