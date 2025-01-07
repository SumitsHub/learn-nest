import { Injectable } from '@nestjs/common';

// The @Injectable() decorator is used to define a class as a provider that can be injected into other classes using dependency injection (DI)
// The @Injectable() decorator is a shorthand for the @Injectable() class decorator
// The @Injectable() decorator is a class decorator that marks a class as available to the Nest IoC container
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
