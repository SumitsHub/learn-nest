import { CanActivate, ExecutionContext } from '@nestjs/common';

// Guard to check if the user is logged in or not
// Guard in NestJS is a class annotated with @Injectable() that implements the CanActivate interface from @nestjs/common
// CanActivate interface has a single method canActivate() that takes ExecutionContext as an argument and returns a boolean or a Promise<boolean> or an Observable<boolean>
// Use cases of Guards:
// 1. Authentication - check if the user is authenticated
// 2. Authorization - check if the user has the required permissions
// 3. Logging - log the request and response

// Difference between Interceptors and Guards:
// 1. Interceptors are used to modify the request and response objects before they are handled by the route handler
// 2. Guards are used to control the access to a route handler based on certain conditions
// 3. Interceptors are executed before Guards in the request-response cycle of NestJS
// 4. Interceptors are used to modify the data, whereas Guards are used to control the flow of the request based on certain conditions
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
