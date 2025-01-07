import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
// import { UserDto } from 'src/users/dtos/user.dto';

//* type to accept any class
// interface ClassConstructor {
//   new (...args: any): {};
// }
// using different syntax for the same thing
type ClassConstructor = new (...args: any) => {}; 
// new - constructor function, 
// ...args - rest parameter to accept any number of arguments, 
// {}: {} - return type of the constructor function is an object

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>, // CallHandler is a class that provides a handle() method to continue the execution chain and return an Observable
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by the request handler
    // console.log('I am running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        console.log('I am running before response is sent out', data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, //* IMP to exclude properties marked by @Exclude()
        });
      }),
    );
  }
}
