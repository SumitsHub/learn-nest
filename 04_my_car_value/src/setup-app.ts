// NOT NEST RECOMMENDED WAY TO SET UP APP MIDDLEWARES - DONE FOR LEARNING PURPOSES

import { INestApplication, ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

export const setupApp = (app: INestApplication<any>) => {
  app.use(
    cookieSession({
      keys: ['my-cookie-key'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra fields from request body which are not part of DTO
    }),
  );
};
