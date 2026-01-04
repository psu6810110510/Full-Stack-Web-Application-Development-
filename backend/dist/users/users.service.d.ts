import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    register(userData: any): Promise<User>;
    findOneByUsername(username: string): Promise<User | null>;
}
