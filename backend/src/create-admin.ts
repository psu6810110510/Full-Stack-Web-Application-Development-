import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './users/user.entity';

async function createAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const userRepo = dataSource.getRepository(User);

  // ลบ admin เก่าถ้ามี
  await userRepo.delete({ username: 'admin' });

  // สร้าง admin ใหม่
  const hashedPassword = await bcrypt.hash('admin1234', 10);
  const admin = await userRepo.save({
    username: 'admin',
    password: hashedPassword,
    email: 'admin@movieflix.com',
    role: UserRole.ADMIN,
  });

  console.log('✅ สร้างแอคเคานต์ admin สำเร็จ!');
  console.log('Username:', admin.username);
  console.log('Password: admin1234');
  console.log('Role:', admin.role);

  await app.close();
}

createAdmin().catch(console.error);
