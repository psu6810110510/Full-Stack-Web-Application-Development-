import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // ฟังก์ชันสมัครสมาชิก (อันเดิมที่เราเคยทำ)
  async register(userData: any): Promise<User> {
    const { username, password, email } = userData;

    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username นี้ถูกใช้ไปแล้ว');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // --- ฟังก์ชันใหม่สำหรับ Login (เพิ่มตรงนี้ครับ) ---
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }
}