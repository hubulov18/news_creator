import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../utils/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import * as process from 'process';
import { IUser } from './user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.validate(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = {
      ...user,
    };

    return {
      email: user.email,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '3m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '3d',
      }),
    };
  }

  async refreshToken(user: IUser) {
    const payload = {
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '3m',
      }),
    };
  }
}
