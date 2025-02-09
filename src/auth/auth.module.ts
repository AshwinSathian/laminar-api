import { User, UserSchema } from '@laminar-api/schemas';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret_key', // Ensure JWT secret is set
      signOptions: { expiresIn: '15m' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
