import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../utils/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  public async validate(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: {
        email: true,
        password: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  public async createUser(user: CreateUserDto) {
    const email = await this.prisma.user.findFirst({
      where: { email: user.email },
      select: { email: true },
    });
    if (email)
      return new BadRequestException(
        'Пользователь с таким email уже зарегистрирован',
      );

    return this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: await bcrypt.hash(user.password, 12),
      },
    });
  }
}
