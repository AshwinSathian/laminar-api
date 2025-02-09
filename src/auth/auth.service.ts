import { UserStatus } from '@laminar-api/enums';
import { User, UserDocument } from '@laminar-api/schemas';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('User not found');

    if (user.status === UserStatus.pending) {
      throw new BadRequestException('User must set password before logging in');
    } else if (user.status === UserStatus.inactive) {
      throw new BadRequestException('User must access has been revoked');
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      return { id: user.id, email: user.email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    await this.userModel.findOneAndUpdate(
      { id: user.id },
      { $push: { refreshTokens: refreshToken } },
    );

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    const user = await this.userModel.findOne({ refreshTokens: refreshToken });
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    return {
      accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }

  async logout(refreshToken: string) {
    await this.userModel.findOneAndUpdate(
      { refreshTokens: refreshToken },
      { $pull: { refreshTokens: refreshToken } },
    );
    return { message: 'Logged out successfully' };
  }

  private generateRefreshToken(): string {
    return bcrypt.hashSync(Date.now().toString(), 10);
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
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
}
