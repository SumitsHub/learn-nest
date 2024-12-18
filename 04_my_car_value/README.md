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