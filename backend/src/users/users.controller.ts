import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

}
