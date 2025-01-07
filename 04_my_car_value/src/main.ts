import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session'); // cookie-session is a middleware to handle cookies in express

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
