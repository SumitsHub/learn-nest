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
// imports: an array of modules that are imported by the module and can be used in the module (e.g., TypeOrmModule, UsersModule)
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
        database: configService.get<string>('DATABASE_NAME'), // use the ConfigService to access the DATABASE_NAME environment variable
        entities: [User, Report],
        synchronize: true, //* don't set to true for 'PRODUCTION' (use MIGRATION), this will create the tables in the database based on the entity classes and modify the schema if the entity classes change
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
        // 'ValidationPipe' is a built-in pipe that validates request payloads using class-validator and class-transformer libraries - it is used to validate the request body based on the DTO class
        whitelist: true, // remove extra fields from request body which are not part of DTO
      }),
    },
  ],
})
export class AppModule {
  // using DI to inject the ConfigService into the constructor
  constructor(private readonly configService: ConfigService) {}

  // applying middleware globally - earlier we were using it in main.ts
  // 'configure' method is used to apply middleware to routes - in this case, we are applying the cookie-session middleware to all routes
  // 'MiddlewareConsumer' is a class that exposes the apply method to apply middleware to routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*'); // apply the cookie-session middleware to all routes
  }
}
