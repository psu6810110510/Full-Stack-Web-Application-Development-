import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เปิดให้ Frontend คุยกับ Backend ได้ (รองรับทุก origin สำหรับ development)
  app.enableCors({
    origin: true, // อนุญาตทุก origin (สำหรับ development)
    credentials: true,
  });

  // สั่งให้ Server รอฟังที่ Port 3000
  await app.listen(3000);
  console.log(`🚀 Backend is running on: http://localhost:3000`);
}
bootstrap();