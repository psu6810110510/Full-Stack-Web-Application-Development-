import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ฟังก์ชัน 1: ตรวจสอบว่า Username/Password ถูกไหม
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username); // *ต้องไปสร้าง function นี้ใน UsersService เพิ่ม
    
    if (user && (await bcrypt.compare(pass, user.password))) {
      // ถ้ารหัสถูก ให้ตัด password ทิ้งก่อนส่งข้อมูลกลับ (เพื่อความปลอดภัย)
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // ฟังก์ชัน 2: Login สำเร็จแล้วแจกตั๋ว (JWT)
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // สร้าง Token ยึกยือๆ
    };
  }
}