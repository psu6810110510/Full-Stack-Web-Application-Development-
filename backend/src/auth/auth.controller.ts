import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    // 1. ตรวจสอบ user
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
    // 2. ถ้าผ่าน ให้สร้าง Token
    return this.authService.login(user);
  }
}