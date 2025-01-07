import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true, //* don't set to true for 'PRODUCTION' (use MIGRATION)
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE, // global pipe
      useValue: new ValidationPipe({
        whitelist: true, // remove extra fields from request body which are not part of DTO
      }),
    },
  ],
})
export class AppModule {
  // applying middleware globally
  // MiddlewareConsumer is a class that exposes the apply method
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['my-cookie-key'],
        }),
      )
      .forRoutes('*');
  }
}
