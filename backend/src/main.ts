import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เปิดให้ Frontend (Port 5173) คุยกับ Backend ได้
  app.enableCors(); 

  // สั่งให้ Server รอฟังที่ Port 3000
  await app.listen(3000);
}
bootstrap();