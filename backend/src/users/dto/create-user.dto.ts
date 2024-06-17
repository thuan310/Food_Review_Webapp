import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Role } from "src/common/enum/roles.enum";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: Role, default: Role.USER })
    @IsEnum(Role)
    role: Role;
}