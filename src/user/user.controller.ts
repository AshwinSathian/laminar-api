import { UserRole } from '@laminar-api/enums';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { SetPasswordDTO } from './dto/set-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({ type: CreateUserDTO })
  async createUser(@Body() body: CreateUserDTO) {
    if (!Object.values(UserRole).includes(body.role)) {
      throw new BadRequestException('Invalid role specified');
    }
    return this.userService.create(body.name, body.email, body.role);
  }

  //   @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  //   @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBody({ type: UpdateUserDTO })
  async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDTO) {
    return this.userService.update(id, updateData);
  }

  //   @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('set-password/:id')
  @ApiBody({ type: SetPasswordDTO })
  async setPassword(@Param('id') id: string, @Body() body: SetPasswordDTO) {
    return this.userService.setPassword(id, body.password);
  }
}
