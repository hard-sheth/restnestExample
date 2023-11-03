import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { LoggerService } from './common/loggerfile';
import { SharedmoduleModule } from './common/logger.module';
import { LoggerMiddleware } from './shared/log.middleware';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [LoginModule,
    // JwtModule.register({
    //   secret:  process.env.JWT_SECRET||"Some Value",
    //   // signOptions: { expiresIn: process.env.JWT_EXPIRATION ||"10s"},
    //   global:true
    // }),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal:true
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      global:true
    }),
    DashboardModule,
    SharedModule,
    PostsModule,
    SharedmoduleModule,
    CacheModule.register()
  ],
  controllers: [AppController],
  providers: [AppService,LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
