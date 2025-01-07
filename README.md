### Install nest CLI globally

```bash
npm install -g @nestjs/cli
```

### Generate new project

```bash
nest new [app-name]
```

### Generate module using nest cli

```bash
nest generate module [module-name]

OR

nest g module [module-name]
```

### Generate service using nest cli

```bash
nest g service [service-name]
```

### Generate controller using nest cli

```bash
nest generate controller [controller-file-path/controller-class-name] [--flat]
```

- flat: don't create extra folder called 'controllers'
  ex:

```bash
nest generate controller messages/messages --flat
```

### Calling REST api using REST Client VSCode extension

- Install REST Client extension by "Huachao Mao"
- Create file named 'requests.http'
- Add endpoints to the file and test using 'Send request' button provided by the extension

### Parameter decorators

- @Param('id')
- @Query()
- @Body()
- @Headers()

### Setting up Automatic Validation

Step 1. Tell nest to use global validation
Step 2. Create a class that describes the different properties that the request body should have - Data Transfer Object[DTO]
Step 3. Add validation rules to the class
Step 4. Apply that class to the request handler

### Services and Repository

- Service - A class containing business logic
- Repository - A class containing storage-related logic
- Usually both will contain methods with same name

## Inversion of Control Principle

Classes should not create instances of its dependencies on its own

## DEPENDENCY INJECTION(DI)

Nest DI Container stores:

- List of classes and their dependencies
- List of instances created
  Use the '@Injectable' decorator on each class and them to the modules list of 'providers'
  Note: Useful while testing of the application, we can use fake db service for testing instead of original one

## 04_my_car_value

Topics covered under this app

### ORM with Nest

- Nest Supports TypeORM & Mongoose
- TypeORM - Supports SQL & NoSQL both - SQLite, Postgres, MySQL, MongoDB
- Mongoose - Supports only MongoDB

### Installing packages

```bash
npm install @nestjs/typeorm typeorm sqlite3
```

NOTE: In this app, initially we will use TypeORM with SQLite then will move to Postgres

### Creating an Entity

- Create an entity file, and create a class in it that lists all the properties that your entity will have
- Connect the entity to its parent module. This creates a repository
- Connect the entity to the root connection (in app module)
  NOTE: by convention we use 'User' as classname for 'User' entity, we can name 'UserEntity' as well like we do for service, controller

### View sqlite db in VSCode

- Install SQLite extension
- 'Ctr+Shift+P' to open command pallette
- Search for "sqlite: Open Database"
- Select the db file
- 'SQLITE EXPLORER' section will get added in left side

### Managing App Configurations

- Install '@nestjs/config' package

```bash
npm install @nestjs/config

```

- Remember: '@nestjs/common' & '@nestjs/core'

### Specifying the Runtime environment

- Install 'cross-env' package

```bash
npm install cross-env
```

- Setup variable (ex: setting up NODE_ENV)

```json
"start": "cross-env NODE_ENV=dev nest start",
```
- Now this variable can be accessed using 'process.env.NODE_ENV'