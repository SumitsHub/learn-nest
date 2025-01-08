import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //* syntax is similar to Express middleware
    console.log('CurrentUserMiddleware:', req.session);

    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
