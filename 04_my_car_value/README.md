### Data Serialization in Nest

1. Exclude data from response using Nest way
   1. Use { Exclude } from 'class-transformer' for field in entity class
   2. Use { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common' for the controller
2. Use Custom Interceptor to handle route specific serialization

Serialization - How an Entity instance will get converted to JS Object

### Custom Interceptors

- Interceptor - Similar to middleware
- Interceptors can be applied to single handler, all the handlers in as controller, or globally

```js
class CustomInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {}
  // 'intercept' method is called automatically
  // 'context' - information on the incoming request
  // 'next' - Kind of reference to the request handler in our controller [Observable (rxjs)]
}
```

### Session management with Cookie

- Install packages

```bash
npm install cookie-session @types/cookie-session
```

### Setting session

- use @Session decorator from @nestjs/common to extract session value in controller
- set value as setting value to normal JS object
- this will send Set-Cookie header as part of response headers
- NOTE: if you are setting same value again then this won't set it again i.e. it won't send Set-Cookie header again

### CurrenUser Parameter Decorator

- Param decorator exist outside of the DI system, so we can't get an UserService instance directly
- Controller, Service, Repository are part of the DI

### Associations in Nest

- Types of associations:
  - One-to-one
  - Ont-to-many
  - Many-to-one
  - Many-to-many
- Decorators from 'typeorm' - used while defining the entity
  - @OneToMany
  - @ManyToOne

```ts
  @ManyToOne(() => User, (user) => user.reports) // adds a user_id column to the report table
  user: User;

  @OneToMany(() => Report, (report) => report.user) // () => Report - used callback as first argument because of circular dependency
  reports: Report[];
```

- Circular dependency: User entity has a relation to Report entity, and Report entity has a relation to User entity. To resolve this, we use a callback function in the @OneToMany() decorator to avoid a circular dependency.


### Middleware, Guards and Interceptors

Request -> Middleware (Cookie-Session) -> Guard (AdminGuard) -> Interceptor (CurrentUser) -> Request Handler -> Interceptor (CurrentUser) -> Response