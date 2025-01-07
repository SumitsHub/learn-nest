import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller() decorator is used to define a controller class in NestJS and takes a string argument that represents the base route for all routes defined in the controller
@Controller()
export class AppController {
  // inject the AppService into the AppController - dependency injection
  // NOTE: the 'private' keyword is a shorthand to create and initialize the appService property
  // NOTE: the 'readonly' keyword is used to make the property immutable
  // NOTE: AppService is mentioned in the providers array of the module file
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
