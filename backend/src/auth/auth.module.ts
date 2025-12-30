import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, // 1. ขอใช้ฟีเจอร์ของ Users
    JwtModule.registerAsync({ // 2. ตั้งค่า JWT โดยดึงค่าจาก .env
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // ดึงค่าจาก .env
        signOptions: { expiresIn: '1h' }, // ตั๋วหมดอายุใน 1 ชม.
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}