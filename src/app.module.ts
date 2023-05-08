import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@m16khb/filter';
import { LoggerMiddleware } from '@m16khb/middleware';
import { GetParametersCommand, SSMClient } from '@aws-sdk/client-ssm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const client = new SSMClient({
          region: 'ap-northeast-2',
        });
        const param = {
          Names: ['DB_LOCAL'],
          WithDecryption: true,
        };
        const command = new GetParametersCommand(param);
        const db = await client.send(command);
        const data = JSON.parse(db.Parameters[0].Value);
        return data as TypeOrmModuleOptions;
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: async () => {
        return new HttpExceptionFilter(Logger);
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const loggerMiddleware = new LoggerMiddleware(Logger);
    consumer.apply(loggerMiddleware.use.bind(loggerMiddleware)).forRoutes('*');
  }
}
