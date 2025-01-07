import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  // creating interceptor class by implementing NestInterceptor interface and providing the intercept method
  constructor(private readonly userService: UsersService) {}

  // intercept method takes ExecutionContext and CallHandler as arguments and returns an Observable
  // ExecutionContext is an object that provides access to the request, response, and other data related to the current execution context
  // CallHandler is an object that provides a handle() method to continue the execution chain and return an Observable
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest(); // get the request object from the context object
    // switchToHttp() - method to switch the context to an HTTP context
    //* NOTE: ExecutionContext supports multiple contexts like RPC, HTTP, GraphQL, etc.

    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return next.handle(); // continue the execution chain and return an Observable
  }
}
