import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepository } from 'typeorm';
import { Genre } from './genres/genre.entity';
import { Movie } from './movies/movie.entity';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './users/entities/user.entity';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const genreRepo = dataSource.getRepository(Genre);
  const movieRepo = dataSource.getRepository(Movie);
  const userRepo = dataSource.getRepository(User);

  // สร้าง Genres
  const action = await genreRepo.save({ name: 'Action' });
  const comedy = await genreRepo.save({ name: 'Comedy' });
  const drama = await genreRepo.save({ name: 'Drama' });
  const sciFi = await genreRepo.save({ name: 'Sci-Fi' });
  const horror = await genreRepo.save({ name: 'Horror' });
  const romance = await genreRepo.save({ name: 'Romance' });
  const thriller = await genreRepo.save({ name: 'Thriller' });
  const animation = await genreRepo.save({ name: 'Animation' });

  // สร้างหนัง
  await movieRepo.save({
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    director: 'Christopher Nolan',
    releaseDate: new Date('2008-07-18'),
    duration: 152,
    genres: [action, drama, thriller],
  });

  await movieRepo.save({
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    director: 'Christopher Nolan',
    releaseDate: new Date('2010-07-16'),
    duration: 148,
    genres: [action, sciFi, thriller],
  });

  await movieRepo.save({
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    director: 'Bong Joon Ho',
    releaseDate: new Date('2019-05-30'),
    duration: 132,
    genres: [drama, thriller],
  });

  await movieRepo.save({
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    director: 'Christopher Nolan',
    releaseDate: new Date('2014-11-07'),
    duration: 169,
    genres: [sciFi, drama],
  });

  await movieRepo.save({
    title: 'Spirited Away',
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    director: 'Hayao Miyazaki',
    releaseDate: new Date('2001-07-20'),
    duration: 125,
    genres: [animation, drama],
  });

  await movieRepo.save({
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    director: 'Frank Darabont',
    releaseDate: new Date('1994-09-23'),
    duration: 142,
    genres: [drama],
  });

  await movieRepo.save({
    title: 'Get Out',
    description: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
    director: 'Jordan Peele',
    releaseDate: new Date('2017-02-24'),
    duration: 104,
    genres: [horror, thriller],
  });

  await movieRepo.save({
    title: 'La La Land',
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    director: 'Damien Chazelle',
    releaseDate: new Date('2016-12-09'),
    duration: 128,
    genres: [romance, drama, comedy],
  });

  // สร้าง User ตัวอย่าง
  const hashedPassword = await bcrypt.hash('password123', 10);
  await userRepo.save({
    username: 'admin',
    password: hashedPassword,
    email: 'admin@example.com',
    role: UserRole.ADMIN,
  });

  await userRepo.save({
    username: 'user1',
    password: hashedPassword,
    email: 'user1@example.com',
    role: UserRole.USER,
  });

  console.log('✅ Seed data created successfully!');
  await app.close();
}

bootstrap();
