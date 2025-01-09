import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

// Extending the Request interface to include currentUser - this is a global declaration for Express Request object in TypeScript (not specific to NestJS)
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

// declare - used to define a new type in TypeScript (global declaration)
// namespace - used to group related types
//* NOTE: reopening an interface extends it with new properties

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //* syntax is similar to Express middleware
    console.log('CurrentUserMiddleware:', req.session);

    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
