import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  text!: string;

  @IsNumber()
  authorId!: number;
}

export class UpdateNewsDto {
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsNumber()
  @IsOptional()
  authorId: number;
}
