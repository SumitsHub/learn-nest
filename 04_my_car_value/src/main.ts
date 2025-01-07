import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   cookieSession({
  //     keys: ['my-cookie-key'],
  //   }),
  // );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // remove extra fields from request body which are not part of DTO
  //   }),
  // );

  setupApp(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
