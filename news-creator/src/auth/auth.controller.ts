import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';
import { UserService } from './user.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth';
import { CreateUserDto, IUser } from './user.dto';
import { LocalAuthGuard } from './guards/local-auth-guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: IUser) {
    return await this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
