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
