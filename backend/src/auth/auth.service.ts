import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { UserLoginDto } from 'src/users/dto/user-login.dto';

export interface IPayload {
    sub: number;
    username: string;
    role: string;
}
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}
    async signin(loginDto: LoginDto) : Promise<UserLoginDto> {
        const user = await this.userService.findOne(loginDto);
        const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
        if (passwordMatch){
            const payload: IPayload = { sub : user.id, username : user.username, role: user.role };
            const token = await this.jwtService.signAsync(payload);
            return { id: user.id, username: user.username, role: user.role, token: token } as UserLoginDto;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

}
