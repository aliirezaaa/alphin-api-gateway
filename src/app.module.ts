import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CommentController } from './comment/comment.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController, CommentController],
  providers: [
    {
      provide: 'ALPHIN_MICROSERVICE',
      useFactory: (configService: ConfigService) => {
        const options = {
          transport: Transport.TCP,
          options: {
            host: configService.get('ALPHIN_MICROSERVICE_HOST'),
            port: Number(configService.get('ALPHIN_MICROSERVICE_PORT')),
          },
        };
        return ClientProxyFactory.create(options as ClientOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
