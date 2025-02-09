import { UserRole, UserStatus } from '@laminar-api/enums';
import { User, UserDocument } from '@laminar-api/schemas';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(name: string, email: string, role: UserRole = UserRole.user) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new BadRequestException('User already exists');

    const user = new this.userModel({
      id: uuidv4(),
      name,
      email,
      role,
      status: UserStatus.pending,
    });

    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findOne({ id }).exec();
  }

  async setPassword(id: string, password: string) {
    const user = await this.userModel.findOne({ id });
    if (!user) throw new BadRequestException('User not found');

    if (user.status !== UserStatus.pending) {
      throw new BadRequestException('Password already set');
    }

    user.password = await bcrypt.hash(password, 10);
    user.status = UserStatus.active;
    return user.save();
  }

  async update(
    id: string,
    updateData: Partial<{ name: string; role: UserRole }>,
  ) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ id }, { $set: updateData }, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  async delete(id: string) {
    return this.userModel.findOneAndDelete({ id }).exec();
  }
}
