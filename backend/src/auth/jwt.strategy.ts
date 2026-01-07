import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // วิธีดึง Token จาก Header
      ignoreExpiration: false, // ห้ามใช้บัตรหมดอายุ
      // 👇 สำคัญ! ต้องตรงกับที่ตั้งไว้ใน .env หรือ AuthModule
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY_123', 
    });
  }

  async validate(payload: any) {
    // แกะข้อมูลออกมาจากบัตร เพื่อส่งต่อให้ Controller
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}