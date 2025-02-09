import { UserRole } from '@laminar-api/enums';
import { User } from '@laminar-api/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO implements User {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
