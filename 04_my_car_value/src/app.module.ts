import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

// AppModule is a class that represents the root module of the application and is decorated with the @Module decorator
// The @Module decorator takes a configuration object with the following properties:
// imports: an array of modules that are imported by the module
// controllers: an array of controllers that are part of the module
// providers: an array of providers that are available in the module and can be injected into other classes
// exports: an array of providers that are exported from the module and can be used in other modules

@Module({
  imports: [
    // ConfigModule.forRoot() is a method that allows us to load environment variables from a file
    ConfigModule.forRoot({
      isGlobal: true, // make the ConfigModule available globally
      envFilePath: `.env.${process.env.NODE_ENV}`, // load environment variables from a file based on the NODE_ENV
    }),
    // TypeOrmModule.forRoot() is a method that allows us to connect to a database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // inject the ConfigService into the factory function to access environment variables
      useFactory: (configService: ConfigService) => ({
        // use a factory function to return the database configuration
        type: 'sqlite',
        database: configService.get('DATABASE_NAME'), // use the ConfigService to access the DATABASE_NAME environment variable
        entities: [User, Report],
        synchronize: true, //* don't set to true for 'PRODUCTION' (use MIGRATION)
      }),
    }),
    UsersModule,
    ReportsModule,
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true, //* don't set to true for 'PRODUCTION' (use MIGRATION)
    // }),
  ],
  controllers: [AppController],
  // list of providers that are available in the module and can be injected into other classes
  providers: [
    AppService,
    {
      provide: APP_PIPE, // global pipe for validation - earlier we were using it in main.ts
      useValue: new ValidationPipe({
        whitelist: true, // remove extra fields from request body which are not part of DTO
      }),
    },
  ],
})
export class AppModule {
  // applying middleware globally - earlier we were using it in main.ts
  // 'MiddlewareConsumer' is a class that exposes the apply method to apply middleware to routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['my-cookie-key'],
        }),
      )
      .forRoutes('*'); // apply the cookie-session middleware to all routes
  }
}
