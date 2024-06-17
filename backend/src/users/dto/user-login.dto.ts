import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UserLoginDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    role: string;

    @IsString()
    @ApiProperty()
    token: string;
}