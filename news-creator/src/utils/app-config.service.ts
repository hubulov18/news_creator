import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get DATABASE_URL(): string {
    return this.configService.get<string>('DATABASE_URL')!;
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
