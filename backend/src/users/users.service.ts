import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserBase } from './dto/user-base.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async create(createUserDto: CreateUserDto): Promise<UserBase> {
        try{
            const userInDb = await this.userRepository.findOneBy({
                username: createUserDto.username,
            });
            const salt = await bcrypt.genSalt();
            createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
            if (userInDb != null) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }
            const account = new User();
            account.username = createUserDto.username;
            account.email = createUserDto.email;
            account.password = createUserDto.password;
            account.role = createUserDto.role;
            await this.userRepository.save(account);
            delete account.password;
            
            const userBase = new UserBase();
            userBase.id = account.id;
            userBase.username = account.username;
            userBase.email = account.email;
            userBase.role = account.role;
            
            return userBase;
        }
        catch (error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(loginDto: LoginDto): Promise<User> {
        const user = await this.userRepository.findOneBy({
            username: loginDto.username,
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    userBase(user: User): UserBase {
        const userBase = new UserBase();
        userBase.id = user.id;
        userBase.username = user.username;
        userBase.email = user.email;
        userBase.role = user.role;
        return userBase;
    }
}
