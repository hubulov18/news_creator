import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}
