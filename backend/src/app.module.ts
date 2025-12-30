import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',     
      password: 'password123', 
      database: 'movie_review_db',
      entities: [User],       
      synchronize: true,      
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}