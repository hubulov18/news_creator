import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [ConfigService, PrismaService, AppConfigService],
  exports: [PrismaService, AppConfigService],
})
export class UtilsModule {}
