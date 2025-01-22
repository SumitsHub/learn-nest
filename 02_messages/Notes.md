## Common NestJS terminologies

In NestJS, the following terminologies are commonly used:

### Module:

- A Module is a logical unit of code in NestJS. It helps organize the application structure into cohesive blocks.
- A module typically contains components like controllers, services, and providers that are related to a specific feature or domain in the application.
- Each module has a class decorated with @Module() that defines metadata, such as imports, controllers, and providers.

Example:

```ts
@Module({ imports: [], controllers: [AppController], providers: [AppService] })
```

### Service:

- A Service is a class that handles business logic and interacts with the data layer (such as databases or external APIs).
- Services are often used to encapsulate functionality that can be reused across different parts of the application.
- Services are typically injected into controllers to perform tasks like data retrieval, processing, or transformation.

Example: @Injectable() is used to define a service that can be injected into other components.

### Repository:

- A Repository is a design pattern used in NestJS for data access and persistence.
- It acts as an abstraction layer for working with a database, providing methods for querying and manipulating data.
- Repositories are often used with an ORM like TypeORM or Sequelize to interact with databases in a structured manner.

Example: A UserRepository might contain methods like findAll() or findOne() to interact with a User entity in the database.

### DTO (Data Transfer Object):

- A DTO is an object used to carry data between processes.
- In NestJS, DTOs are used to define the shape of data that is transferred through the application, typically between the client and the server or between different layers of the application.
- DTOs are often validated using class validators to ensure the correctness of data.

Example: A CreateUserDTO might define the structure of the data required to create a new user.

### Dependency Injection (DI):

- Dependency Injection is a design pattern used in NestJS to manage the dependencies of classes.
- Instead of creating instances of dependencies manually inside a class, dependencies are injected into the class by the NestJS framework.
- This makes it easier to manage and test components, as well as ensuring the decoupling of logic.

Example: A UserService might have a UserRepository injected into it, so the UserService can use it without needing to instantiate it manually.
