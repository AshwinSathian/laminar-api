import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetPasswordDTO {
  @ApiProperty()
  @IsString()
  password: string;
}
