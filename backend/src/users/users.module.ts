import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // จดทะเบียน User Entity
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // *สำคัญมาก: ส่งออก Service นี้ไปให้ AuthModule ยืมใช้*
})
export class UsersModule {}