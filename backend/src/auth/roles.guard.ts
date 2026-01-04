import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. ดูว่า Route นี้ต้องการ Role อะไร (จาก @Roles)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. ถ้าไม่ได้แปะป้าย @Roles แปลว่าใครเข้าก็ได้ (หรือใช้แค่ Login ก็พอ)
    if (!requiredRoles) {
      return true;
    }

    // 3. ดึงข้อมูล User จาก Request (ต้องผ่าน JwtAuthGuard มาก่อนนะ)
    const { user } = context.switchToHttp().getRequest();
    console.log('--- DEBUG ROLES ---');
    console.log('User Role (ในบัตร):', user?.role);
    console.log('Required (ที่ต้องการ):', requiredRoles);
    console.log('Is Match?:', requiredRoles.some((role) => user?.role === role));
    console.log('-------------------');
    // 4. เช็คว่า User มี Role ตรงกับที่ต้องการไหม
    return requiredRoles.some((role) => user.role === role);
  }
}