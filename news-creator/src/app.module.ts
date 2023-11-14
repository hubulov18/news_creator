import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { UtilsModule } from './utils/utils.module';
import { envValidate } from './utils/env.validation';
import { AuthController } from './auth/auth.controller';
import { AppConfigService } from './utils/app-config.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { NewsService } from './news/news.service';
import { NewsController } from './news/news.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: envValidate }),
    AuthModule,
    NewsModule,
    UtilsModule,
  ],
  controllers: [AuthController, NewsController],
  providers: [AppConfigService, AuthService, JwtService, NewsService],
})
export class AppModule {}
