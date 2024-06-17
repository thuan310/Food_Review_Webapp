import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpMessage, HttpStatusCode } from 'src/common/enum/httpstatus.enum';
import { ResponseData } from 'src/common/global/responde.data';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UserBase } from 'src/users/dto/user-base.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { UserLoginDto } from 'src/users/dto/user-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}
    @Post('signup')
    @Public()
    async signup(@Body() createUserDto: CreateUserDto): Promise<ResponseData<UserBase>> {
        try{
            const result = await this.userService.create(createUserDto);
            if (result){
                return new ResponseData<UserBase>(result, HttpStatusCode.CREATED, HttpMessage.CREATED);
            }
            return new ResponseData<UserBase>(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }
        catch (err){
            throw new HttpException(err.message, err.status);
        }
    }

    @Post('signin')
    @Public()
    async signin(@Body() loginDto: LoginDto): Promise<ResponseData<UserLoginDto>> {
        try{
            const result = await this.authService.signin(loginDto);
            if (result){
                return new ResponseData<UserLoginDto>(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData<UserLoginDto>(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }
        catch (err){
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}
