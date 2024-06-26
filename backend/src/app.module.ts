import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PalModule } from './pal/Pal.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/acl/roles.guard';
import { AuthInjector } from './utils/middlewares/auth-injector.middleware';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
import { UserService } from './user/user.service';
import { AptitudeModule } from './aptitude/aptitude.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env", cache: true, isGlobal: true }), DatabaseModule, PalModule, AuthModule, UserModule, AptitudeModule, RegionModule],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthInjector).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
